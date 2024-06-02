const express = require('express')
const dotEnv = require('dotenv')
const path = require('path')
const { routes } = require('./routes/routes')
const session = require('express-session')
const fileUpload = require('express-fileupload');

dotEnv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(express.static('public'))

//setting view 
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({ extended: true, }))
app.use(express.json())
app.use(fileUpload());

//session
app.use(session({ secret: 'secret' }))

app.use(routes)
app.get('/file/:filename', (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, '../public/uploads/', filename);
    res.sendFile(imagePath);
});

app.get('/profile', (req, res) => {
    res.statusCode = 200;
    return res.json({
        "nama": "rico",
        "email": "rico@mail.com",
        "alamat": "pamayahan"
    })
})

app.listen(port, () => console.log(`Server running on port ${port}`))