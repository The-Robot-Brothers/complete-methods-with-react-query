import cors from 'cors'
import express from 'express'
import { router } from './routes'

const app = express()

app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', '*')
  response.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
  app.use(cors())
  next()
})
app.use(express.json())
app.use(router)

app.listen(3333, () => console.log("🚀 server is flying!"))
