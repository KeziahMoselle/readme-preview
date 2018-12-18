const fs = require('fs')
const puppeteer = require('puppeteer');

const baseFolder = './public/screenshots/'

async function screenshot (url) {
  // File informations
  const fileName = `${new Date().getTime()}.jpeg`
  const filePath = `${url}/${fileName}`
  const absolutePath = `${baseFolder}${filePath}`

  // Create browser instance and page
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1000,
      height: 600
    }
  })
  const page = await browser.newPage()
  
  // Take a screenshot of the URL
  await page.goto(`https://${url}`)

  // Create the directory
  fs.mkdirSync(`${baseFolder}${url}`, { recursive: true } ,(error) => {
    if (error) console.log(error)
  })

  // Take the screenshot
  await page.screenshot({
    path: absolutePath,
    type: 'jpeg'
  })

  await browser.close()
  return filePath
}

module.exports = screenshot
