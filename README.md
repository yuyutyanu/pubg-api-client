# pubgClient
Promise based pubg api client

## Regions
https://documentation.playbattlegrounds.com/en/making-requests.html#regions

## Usage
```javascript
  const pubg = new pubgClient('apiKey')
    
  const serverStatus = await getStatus() 
   
  const player = await getPlayer(region, playerName)
  
  const players = await getPlayers(region, playerNames)
      
  const match = await getMatch(region, matchId) 
  
  const matchStats = await getPlayerMatchStats(included, playerId) 
  
  const matchesStats = await getPlayerMatchesStats(region, player) 
  
  const seasons = await getSeasons() 
  
  const currentSeason = await getCurrentSeason()
   
  const lifeTime = await getLifeTime(region, playerId) 
  
  const seasonStats = await getPlayerMatchSeason(playerId, seasonId)
  
  const telemetryUrl = await getTelemetryUrl(match) 
  
  const telemetry = await getTelemetry(telemetryUrl) 
```


## test
 
### setup 

From line 4 to line 6 in test.js 

```javascript

const pubg = new pubgClient('your apiKey')
const region = 'your region'
const playerNames = 'name, name, name...'

```
### run

```
npm test

```