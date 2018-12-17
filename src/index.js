const puppeteer = require('puppeteer');

(async () => {
  const url = undefined

  // Create browser instance and page
  const browser = await puppeteer.launch({
    defaultViewport: {
      width: 1000,
      height: 600
    }
  })
  const page = await browser.newPage()
  
  // Take a screenshot of the URL
  await page.goto(url)
  await page.screenshot({
    path: `./src/screenshots/${new Date().getTime()}.jpeg`,
    type: 'jpeg'
  })

  await browser.close()
})()