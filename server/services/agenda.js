 require('dotenv').config()
const Agenda = require('agenda')
const agendaConfig = {
  db: {address: process.env.MONGO_URL},
  defaultConcurrency: process.env.AGENDA_DEFAULT_CONCURRENCY,
  defaultLockLimit: process.env.AGENDA_DEFAULT_CONCURRENCY
}

console.log('Starting agenda with config:', agendaConfig)
const agenda = new Agenda(agendaConfig)

module.exports = agenda
