import test from 'ava';
import pubgClient from './index.js'

const pubg = new pubgClient('your apiKey')
const region = 'your region'
const playerNames = 'name, name, name...'
const playerName = playerNames.split(',')[0]

/*
 Avoid rate limit
 */
let player
let match
let sampleMatchId

test('pubg api server status check.', async t => {
  const {status} = await pubg.getStatus()
  t.is(status, 200)
})

test.serial('Get player object.', async t => {
  player = await pubg.getPlayer(region, playerName)
  t.is(player.type, 'player')
})

test('Get players object.', async t => {
  const players = await pubg.getPlayers(region, playerNames)
  t.true(players.every(player => player.type === 'player'))
})

test.serial('Get match object.', async t => {
  sampleMatchId = player.relationships.matches.data[0].id
  match = await pubg.getMatch(region, sampleMatchId)
  t.is(match.data.type, 'match')
})

test('Get match stats for a single player.', async t => {
  const stats = await pubg.getPlayerMatchStats(match.included, player.id)
  t.is(stats.type, 'participant')
})

test('Get matches stats for a single player.', async t => {
  const matchesStats = await pubg.getPlayerMatchesStats(region, player)
  t.is(matchesStats.length, player.relationships.matches.data.length)
})

test('Get all seasons.', async t => {
  const seasons = await pubg.getSeasons()
  t.true(seasons.every(season => season.type === 'season'))
})

test('Get current season.', async t => {
  const season = await pubg.getCurrentSeason()
  t.true(season.attributes.isCurrentSeason)
})

test('Get lifetime stats for a single player.', async t => {
  const lifeTime = await pubg.getLifeTime(region, player.id)
  t.is(lifeTime.type, 'playerSeason')
})

test('Get season information for a single player.', async t => {
  const currentSeason = await pubg.getCurrentSeason()
  const seasonStats = await pubg.getPlayerMatchSeason(player.id, currentSeason.id)
  t.is(seasonStats.type, 'playerSeason')
})

test('Get telemetry url.', async t => {
  const telemetryUrl = await pubg.getTelemetryUrl(match)
  const pattern = new RegExp('^https://telemetry-cdn.playbattlegrounds.com/')
  t.true(pattern.test(telemetryUrl))
})

test('Get Telemetry.', async t => {
  const telemetryUrl = await pubg.getTelemetryUrl(match)
  const telemetry = await pubg.getTelemetry(telemetryUrl)
  const telemetryMatchId = telemetry[0].MatchId.split('.')[telemetry[0].MatchId.split('.').length - 1]
  t.is(telemetryMatchId, sampleMatchId)
})