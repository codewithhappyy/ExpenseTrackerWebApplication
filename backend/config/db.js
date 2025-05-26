import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config();
mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('Connected to MongoDB..'))
.catch(err => console.error('Could not connect to mongoDB...', err))

export default mongoose;