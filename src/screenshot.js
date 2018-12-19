const puppeteer = require('puppeteer');

async function screenshot (url) {
  // File informations
  const fileName = `${url}.jpeg`
  const absolutePath = `./public/${fileName}`

  // Create browser instance and page
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu'
    ],
    defaultViewport: {
      width: 1000,
      height: 600
    }
  })
  const page = await browser.newPage()
  
  // Take a screenshot of the URL
  try {
    await page.goto(`https://${url}`, {
      waitUntil: 'load'
    })
  } catch (error) {
    throw new Error(error)
  }

  // Take the screenshot
  await page.screenshot({
    path: absolutePath,
    type: 'jpeg',
    quality: 80
  })

  await browser.close()
  return fileName
}

module.exports = screenshot
