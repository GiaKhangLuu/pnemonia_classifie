import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'

const app = express()

app.use(cors())

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname + '/../client')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, resp) => {
	resp.sendFile(path.join((__dirname + '/../client/src/main.html')))
	//console.log(__dirname)
	//resp.send(__dirname)
	//resp.sendFile('/src/main.html')
})

var server = app.listen(PORT, () => {
	console.log(`Server is listen on PORT ${ PORT }`)
})