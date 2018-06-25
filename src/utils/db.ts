import * as admin from 'firebase-admin'
import * as config from 'config'

const FIREBASE = config.get('FIREBASE')

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE)
})

const db = admin.firestore()

export { admin, db }
