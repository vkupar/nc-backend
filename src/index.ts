import * as http from 'http'
import cluster from 'node:cluster'
import { cpus } from 'node:os'
import process from 'node:process'
import express from 'express'
import mongoose from 'mongoose'
import config from './config'
import logger from './utils/logger'
import middlewares from './middlewares'
import errorMiddleware from './middlewares/error.middleware'
import routes from './routes'
import loaders from './loaders'
import authMiddleware from './middlewares/auth.middleware'

const app = express()
let server: http.Server

const gracefulShutdown = (error: Error) => {
  logger.error(error)
  if (server) {
    server.close(() => {
      logger.info('Application closed')
      mongoose.connection.close(false, () => {
        logger.info('Database connection closed')
        process.exit(0)
      })
    })
  } else {
    logger.info('Application closed')
    process.exit(0)
  }
}

async function start() {
  try {
    // Initialize loaders
    await loaders()

    // Load middlewares
    middlewares({ app })

    // Load routes
    app.use('/v1', authMiddleware, routes)

    // Load error handling middleware
    errorMiddleware({ app })

    // Server starts listening to the specified port
    server = app.listen(config.port, () => {
      logger.info(`Application started on port ${config.port}`)
    })
  } catch (err) {
    gracefulShutdown(err as Error)
  }
}

if (cluster.isPrimary) {
  logger.info(`Primary process is forking clusters (child processes)`)

  const numCPUs = cpus().length
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

process.on('uncaughtException', gracefulShutdown)
process.on('unhandledRejection', gracefulShutdown)
process.on('SIGTERM', gracefulShutdown)
