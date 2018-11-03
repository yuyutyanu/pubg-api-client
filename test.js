import test from 'ava';
import pubgClient from './index.js'

const pubg = new pubgClient('your api-key')
const region = 'your region'
const playerNames = 'name, name, name...'
const playerName = playerNames.split(',')[0]

test('pubg api server status check', async t => {
  const {status} = await pubg.getStatus()
  t.is(status, 200)
})

test('get player object', async t => {
  const player = await pubg.getPlayer(region, playerName)
  t.is(player.type, 'player')
})

test('get players object', async t => {
  const players = await pubg.getPlayers(region, playerNames)
  t.is(players.length, playerNames.split(',').length)
})

test('get match object', async t => {
  const player = await pubg.getPlayer(region, playerName)
  const sampleMatchId = player.relationships.matches.data[0].id
  const match = await pubg.getMatch(region, sampleMatchId)
  t.is(match.data.type, 'match')
})

test('get match stats of player', async t => {
  const player = await pubg.getPlayer(region, playerName)
  const sampleMatchId = player.relationships.matches.data[0].id
  const match = await pubg.getMatch(region, sampleMatchId)
  const stats = await pubg.getPlayerMatchStats(match.included, player.id)
  t.is(stats.type, 'participant')
})

test('get matches stats of player', async t => {
  const player = await pubg.getPlayer(region, playerName)
  const matchesStats = await pubg.getPlayerMatchesStats(region, player)
  t.is(matchesStats.length, player.relationships.matches.data.length)
})