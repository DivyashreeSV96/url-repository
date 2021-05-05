const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shorten', async (req, res) => {
  res.writeHead(200,{ "Content-Type": "application/json"})
  await ShortUrl.create({ url: req.body.url})

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) 
  return res.writeHead(200,{ "Content-Type": "application/json"})

  shortUrl.redirectCount++
  shortUrl.save()

  res.redirect(shortUrl.url)
})

app.listen(process.env.PORT || 8080);