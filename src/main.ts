import 'reflect-metadata'
import express, { json } from 'express'
import routes from './routes'

const port = 4001

const app = express()

app.use(json())
app.use('/user', routes)

// app.get('/', (req, res) => {
//   res.json({ message: 'User api' })
// })

app.listen(port, () => console.log(`rodando na porta ${port}`))
