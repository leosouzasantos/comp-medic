import express from 'express'

const app = express()

app.get('/', (request, response) => {
  return response.send('aplication is working!')
})

app.listen(8080, () => {
  console.log('Server is running on PORT 8080')
})
