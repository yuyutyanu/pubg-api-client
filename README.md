# pubgClient
Promise based pubg api client

## Regions
https://documentation.playbattlegrounds.com/en/making-requests.html#regions

## Usage
```javascript
  const pubg = new pubgClient('apiKey')
  
  /* return all promise */
  
  pubg.getPlayers(region, playerNames)
  
  pubg.getPlayer(region, playerName)
  
  pubg.getPlayerId(region, playerName)
  
  pubg.getMatch(region, matchId)
  
  pubg.getPlayerMatches(region, playerName)
  
  pubg.getPlayerMatchStats(match, playerId)
  
  pubg.getPlayerMatchesStats(player)
  
  pubg.getSeasons()
  
  pubg.getCurrentSeason()
  
  pubg.getLifeTime(region, playerId)
  
  pubg.getPlayerMatchSeason(playerId, seasonId)
  
  pubg.getTelemetryUrl(region, matchId)
  
  pubg.getTelemetry(telemetryUrl)
  
  pubg.getStatus()
```


## test

coming soon..