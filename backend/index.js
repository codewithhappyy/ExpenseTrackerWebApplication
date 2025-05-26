import express from 'express';
import cors from 'cors'
import usersRoutes from './routes/UsersRoutes.js'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use('/users', usersRoutes);
// app.use('/category', categoryRoutes);
// app.use('/expense', expenseRoutes);
// app.use('/purchase', purchaseRoutes);
// app.use('/premium', premiumRoutes);
const PORT = parseInt(process.env.PORT) || 5040;

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})