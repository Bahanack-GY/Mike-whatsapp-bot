const { Client, logger } = require('./lib/client')
const { DATABASE, VERSION } = require('./config')
const { stopInstance } = require('./lib/pm2')

const start = async () => {
  logger.info(`levanter ${VERSION}`)
  try {
    await DATABASE.authenticate({ retry: { max: 3 } })
  } catch (error) {
    const databaseUrl = process.env.DATABASE_URL || "postgresql://whatsapp_5vpm_user:fo2kTBtaUzYQWzqvD6wyaHshFPsJ2A5o@dpg-crmagelumphs739bcre0-a/whatsapp_5vpm"
    logger.error({ msg: 'Unable to connect to the database', error: error.message, databaseUrl })
    return stopInstance()
  }
  try {
    logger.info('Database syncing...')
    await DATABASE.sync()
    const bot = new Client()
    await bot.init()
    await bot.connect()
  } catch (error) {
    logger.error(error)
  }
}
start()
