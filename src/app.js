const express = require('express')
const dotEnv = require('dotenv')
const path = require('path')
const { routes } = require('./routes/routes')
const session = require('express-session')

dotEnv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))

//setting view 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//session
app.use(session({ secret: 'secret' }))

app.use(routes)

app.listen(port, () => console.log(`Server running on port ${port}`))