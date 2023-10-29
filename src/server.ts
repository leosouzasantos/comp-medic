import express from 'express'
import { userRouter } from './routes/userRoutes'

const app = express()

app.use(express.json())
app.use(userRouter)

app.get('/', (request, response) => {
  return response.send('aplication is working!')
})

app.listen(8080, () => {
  console.log('Server is running on PORT 8080')
})
