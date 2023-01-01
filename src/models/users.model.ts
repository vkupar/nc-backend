import { model, Schema, Document, Types } from 'mongoose'

export interface User {
  _id: Types.ObjectId
  phoneNumber: string
  name: string
  email: string
}

const usersSchema: Schema = new Schema({
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})

const usersModel = model<User & Document>('Users', usersSchema)

export default usersModel
