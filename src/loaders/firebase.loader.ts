import { initializeApp, cert } from 'firebase-admin/app'
import config from '../config'
import logger from '../utils/logger'

export default () => {
  logger.info('Initializing firebase')
  initializeApp({
    credential: cert({
      projectId: config.firebaseProjectId,
      privateKey: config.firebasePrivateKey,
      clientEmail: config.firebaseClientEmail,
    }),
  })
  logger.info('Initialized firebase')
}
