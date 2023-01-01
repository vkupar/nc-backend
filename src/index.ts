import cluster from 'node:cluster'
import { cpus } from 'node:os'
import process from 'node:process'
import express from 'express'
import app from './app'
import config from './config'
import logger from './utils/logger'

const numCPUs = cpus().length

const gracefulExit = (error: Error) => {
  logger.error(error)
  logger.info('Application exited')
  process.exit(1)
}

process.on('uncaughtException', gracefulExit)
process.on('unhandledRejection', gracefulExit)

const expressApp = express()
const start = async () => {
  try {
    await app({ app: expressApp })
    expressApp.listen(config.port, () => {
      logger.info(`Application started on port ${config.port}`)
    })
  } catch (err) {
    gracefulExit(err as Error)
  }
}

if (cluster.isPrimary) {
  logger.info(`Primary process is forking clusters (child processes)`)

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', () => {
    logger.info(`Worker cluster died`)
  })
} else {
  start()
  logger.info(`Worker cluster started`)
}
