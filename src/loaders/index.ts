import db from './db.loader'
import firebase from './firebase.loader'

export default async () => {
  await db()
  firebase()
}
