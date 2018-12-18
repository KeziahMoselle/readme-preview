require('dotenv').config()
const express = require('express')
const app = express()

const screenshot = require('./screenshot')

app.use(express.static('public'))

app.get('/', (req, res) => res.send('/index'))

app.get('/:url', async (req, res) => {
  try {
    const fileName  = await screenshot(req.params.url)
    res.redirect(301, fileName)
  } catch (error) {
    res.redirect(301, 'website-not-found.jpg')
  }
})

app.listen(process.env.PORT, (error) => {
  if (error) throw new Error(error)
  console.log(`Server started listening on port ${process.env.PORT}...`)
})