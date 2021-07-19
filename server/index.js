import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, resp) => {
	resp.send('SUCCESS')
})

app.listen(PORT, () => {
	console.log(`Server is listen on ${ PORT }`)
})