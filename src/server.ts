import 'dotenv/config'
import express from 'express'
import { userRouter } from './routes/userRoutes'
import { specialityRouter } from './routes/specialityRoutes'

const app = express()

app.use(express.json())
app.use(userRouter)
app.use(specialityRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
