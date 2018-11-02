const axios = require('axios')


class pubgClient {
  constructor(apiKey) {
    this.http = axios.create({
        method: 'get',
        baseURL: 'https://api.pubg.com/',
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Accept": "application/vnd.api+json",
          "Accept-Encoding": "gzip"
        }
      })
  }

  trimPlayerNames(playerNames){
    if (playerNames.split(',').length > 1) {
      playerNames = playerNames.split(',')
      playerNames = playerNames.map(playerName => {return playerName.trim()})
      playerNames = playerNames.join(',')
    } else {
      playerNames = playerNames.trim()
    }
    return playerNames
  }

  async getPlayers(region, playerNames){
    return await this.http.get(`shards/${region}/players?filter[playerNames]=${this.trimPlayerNames(playerNames)}`).then(({data}) => data.data)
  }

  async getPlayer(region, playerName){
    return await this.http.get(`shards/${region}/players?filter[playerNames]=${playerName}`).then(({data}) => data.data[0])
  }

  async getPlayerId(region, playerName){
    return await this.http.get(`shards/${region}/players?filter[playerNames]=${playerName}`).then(({data}) => data.data[0].id)
  }

  async getMatch(region, matchId){
    return await this.http.get(`shards/${region}/matches/${matchId}`).then(({data}) => data)
  }

  async getPlayerMatches(region, playerName){
    const player = await this.getPlayer(region, playerName)
    return player.relationships.matches.data
  }

  async getPlayerMatchStats(match, playerId){
    return match.included.find(({attributes}) => {
      if (!attributes.stats || !attributes.stats.playerId) return false
      return attributes.stats.playerId === playerId
    })
  }

  async getPlayerMatchesStats(player){
    const matches = player.relationships.matches.data
    const results = matches.map(async (match) => {
      return await this.getMatch(REGION, match.id).then(match => {
        return {createdAt: match.data.attributes.createdAt, matchData: this.getPlayerMatchStats(match, player.id)}
      })
    })
    return await Promise.all(results)
  }

  async getSeasons(){
    return await this.http.get('shards/steam/seasons').then(({data}) => data.data)
  }

  async getCurrentSeason(){
    return await this.getSeasons().then(seasons => { return seasons.find(season => season.attributes.isCurrentSeason)})
  }

  async getLifeTime(region, playerId){
    return await this.http.get(`shards/${region}/players/${playerId}/seasons/lifetime`).then(({data}) => data.data)
  }

  async getPlayerMatchSeason(playerId, seasonId){
    return await this.http.get(`shards/steam/players/${playerId}/seasons/${seasonId}`).then(({data}) => data.data)
  }

  async getTelemetryUrl(region, matchId){
    const {data, included} = await this.getMatch(region, matchId)
    const assetId = data.relationships.assets.data[0].id
    const asset = included.find(obj => {
      return obj.id === assetId
    })
    return asset.attributes.URL
  }

  async getTelemetry(telemetryUrl){
    return await axios.get(telemetryUrl)
  }

  async getStatus(){
    return await this.http.get('status').then(({data}) => data)
  }
}

module.exports = pubgClient




