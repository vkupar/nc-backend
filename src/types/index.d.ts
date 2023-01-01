export {}

declare global {
  namespace Express {
    interface Request {
      user: {
        _id?: string
        phoneNumber: string
        name?: string
        email?: string
      }
    }
  }
}
