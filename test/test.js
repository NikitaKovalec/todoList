const puppeteer = require('puppeteer');

let scrape = async () => {
    const value = Date.now().toString()
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.click('#root > input')
    await page.type('#root > input', value)
    await page.click('#root > button')
    await page.waitForTimeout(500)
    const resultDiv = await page.evaluate(() => {
        return document.querySelector('#root > div:last-child > div').innerText
    })

    if (resultDiv === value) {
        await browser.close()
    } else {
        console.log('Таск не найден')
    }
}

scrape()