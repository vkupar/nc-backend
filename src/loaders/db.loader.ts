import mongoose from 'mongoose'
import config from '../config'
import logger from '../utils/logger'

export default async () => {
  mongoose.set('strictQuery', false)

  logger.info('Connecting to the database')
  await mongoose.connect(config.databaseUri)
  logger.info('Connected to the database')

  mongoose.connection.on('error', (error) => {
    logger.error(error)
  })

  mongoose.connection.on('disconnected', () => {
    logger.info('Database disconnected')
  })
}
