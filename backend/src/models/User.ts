import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  userId: string;
  receiverName: string;
  gender: 'male' | 'female';
  genre: string;
  lyrics: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  userId: { type: String, unique: true, required: true },
  receiverName: { type: String, default: '' },
  gender: { type: String, enum: ['male', 'female'], default: 'male' },
  genre: { type: String, default: '' },
  lyrics: { type: String, default: '' },
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);