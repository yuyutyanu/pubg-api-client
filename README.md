# pubgClient
Promise based pubg api client

## Regions
https://documentation.playbattlegrounds.com/en/making-requests.html#regions

## install

```
npm install --save pubg-api-client
```

## Usage
```javascript
  const pubgApiClient = require('pubg-api-client')
  
  const pubg = new pubgApiClient('your apiKey')
    
  const serverStatus = await pubg.getStatus() 
   
  const player = await pubg.getPlayer(region, playerName)
  
  const players = await pubg.getPlayers(region, playerNames)
      
  const match = await pubg.getMatch(region, matchId) 
  
  const matchStats = await pubg.getPlayerMatchStats(included, playerId) 
  
  const matchesStats = await pubg.getPlayerMatchesStats(region, player) 
  
  const seasons = await pubg.getSeasons() 
  
  const currentSeason = await pubg.getCurrentSeason()
   
  const lifeTime = await pubg.getLifeTime(region, playerId) 
  
  const seasonStats = await pubg.getPlayerMatchSeason(playerId, seasonId)
  
  const telemetryUrl = await pubg.getTelemetryUrl(match) 
  
  const telemetry = await pubg.getTelemetry(telemetryUrl) 
```