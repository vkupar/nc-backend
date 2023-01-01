import express from 'express'
import loaders from './loaders'
import middlewares from './middlewares'
import errorMiddleware from './middlewares/error.middleware'
import authMiddleware from './middlewares/auth.middleware'
import routes from './routes'

export default async ({ app }: { app: express.Application }) => {
  await loaders()
  await middlewares({ app })

  // Routes
  app.use('/v1', authMiddleware, routes)

  // Error handling
  errorMiddleware({ app })
}
