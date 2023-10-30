import express from 'express'
import { userRouter } from './routes/userRoutes'

const app = express()

app.use(express.json())
app.use(userRouter)

app.listen(8080, () => {
  console.log('Server is running on PORT 8080')
})
