const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const port = process.env.PORT || 5000
const connectDB = require('./config/db')
const posts = require('./routes/posts')
const methodOverride = require('method-override')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.engine('handlebars', handlebars())
app.set('view engine', 'handlebars');
app.use(methodOverride('_method'))
connectDB()

app.get("/", (req, res) => {
  res.render('index')
});
app.get("/about", (req, res) => {
  res.render('about')
});
app.use("/", posts)

app.listen(port, () => console.log(`Server khoi dong tai port ${port}`))
