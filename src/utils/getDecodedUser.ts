import { DecodedIdToken, getAuth } from 'firebase-admin/auth'

export default async (token: string): Promise<DecodedIdToken> => {
  const decodedUser = await getAuth().verifyIdToken(token)
  return decodedUser
}
