import { db } from '../utils/db'

async function find (id?: string) {
  const doc = await db.collection('setting').doc(id).get()
  return (doc.exists && doc.data()) || {}
}

async function update (id: string, doc: any) {
  const batch: any = db.batch()
  const ref = db.collection('setting').doc(id)
  const { exists } = await ref.get()
  const action = !exists ? 'set' : 'update'
  batch[action](ref, doc)
  batch.commit()
}

export default {
  find,
  update
}
