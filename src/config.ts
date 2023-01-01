import { config } from 'dotenv'
import Joi from 'joi'

config()

const schema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().required().default(3001),
    DATABASE_URI: Joi.string()
      .required()
      .description('Database connection URI'),
    FIREBASE_PROJECT_ID: Joi.string()
      .required()
      .description('Firebase project id'),
    FIREBASE_PRIVATE_KEY: Joi.string()
      .required()
      .description('Firebase project private key'),
    FIREBASE_CLIENT_EMAIL: Joi.string()
      .required()
      .description('Firebase project client email'),
  })
  .unknown()

const { value: variables, error } = schema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env)

if (error) {
  throw new Error(`Configuration validation error: ${error.message}`)
}

export default {
  env: variables.NODE_ENV,
  port: variables.PORT,
  databaseUri: variables.DATABASE_URI,
  firebaseProjectId: variables.FIREBASE_PROJECT_ID,
  firebasePrivateKey: variables.FIREBASE_PRIVATE_KEY,
  firebaseClientEmail: variables.FIREBASE_CLIENT_EMAIL,
}
