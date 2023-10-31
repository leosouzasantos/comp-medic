import 'dotenv/config'
import express from 'express'
import { userRouter } from './routes/userRoutes'

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
