import 'dotenv/config'
import express from 'express'
import { userRouter } from './routes/userRoutes'
//import { specialityRouter } from './routes/specialityRoutes'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const app = express()

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(
  express.json({
    type: ['application/json', 'text/plain'],
  })
)
//app.use(userRouter)
//app.use(specialityRouter)
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
