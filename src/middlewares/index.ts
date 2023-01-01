import express from 'express'
import compression from 'compression'
import helmet from 'helmet'
import hpp from 'hpp'
import cors from 'cors'

export default ({ app }: { app: express.Application }) => {
  // Enable Cross-Origin Resource Sharing
  app.options('*', cors())
  app.use(cors())

  // Protect against HTTP Parameter Pollution attacks
  app.use(hpp())

  // Set security HTTP headers
  app.use(helmet())

  // Gzip compression
  app.use(compression())

  // Parse JSON request body
  app.use(express.json())

  // Parse url-encoded request body
  app.use(express.urlencoded({ extended: true }))
}
