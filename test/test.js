const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.click('#root > input')
    await page.type('#root > input', Date.now().toString())
    await page.click('#root > button')
    await page.waitForTimeout(500)
    // await browser.close()
}

scrape()