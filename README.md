# pubgClient
Promise based pubg api client

## Regions
https://documentation.playbattlegrounds.com/en/making-requests.html#regions

## Usage
```javascript
  const pubg = new pubgClient('apiKey')
  
  /* return all promise */
    
   getStatus () 
   
   getPlayer (region, playerName)
  
   getPlayers (region, playerNames)
      
   getMatch (region, matchId) 
  
   getPlayerMatchStats (included, playerId) 
  
   getPlayerMatchesStats (region, player) 
  
   getSeasons () 
  
   getCurrentSeason ()
   
   getLifeTime (region, playerId) 
  
   getPlayerMatchSeason (playerId, seasonId)
  
   getTelemetryUrl (match) 
  
   getTelemetry (telemetryUrl) 
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