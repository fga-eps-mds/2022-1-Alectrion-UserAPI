import 'reflect-metadata'
import express, { json } from 'express'
import routes from './routes'
import { dataSource } from './db/config'
import cors from 'cors'

dataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err)
  })

const host = process.env.HOST || 'localhost'
const port = Number(process.env.PORT) || 4001
const app = express()

app.use(cors())

app.use(json())
app.use('/user', routes)

app.listen(port, host, () => console.log(`rodando na porta ${port}`))
