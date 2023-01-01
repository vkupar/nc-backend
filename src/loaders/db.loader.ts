import mongoose from 'mongoose'
import config from '../config'
import logger from '../utils/logger'

export default async () => {
  mongoose.set('strictQuery', false)

  logger.info('Connecting to the database')
  await mongoose.connect(config.databaseUri)
  logger.info('Connected to the database')

  mongoose.connection.on('error', (err) => {
    logger.error(err)
  })

  mongoose.connection.on('disconnected', () => {
    logger.info('The database disconnected')
  })
}
