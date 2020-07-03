const path = require('path')
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());

const publicDirectoryPath = path.join(__dirname, '/public')
const viewsPath = path.join(__dirname, '/templates')


app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Pratheek'
    })
})


app.use("/weather", require("./weather"));
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})