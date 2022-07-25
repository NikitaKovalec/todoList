const puppeteer = require('puppeteer');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto('http://localhost:3000')
    await page.click('#root > input')
    await page.type('#root > input', Date.now().toString())
    const resultInput = await page.evaluate(() => {
        return document.querySelector('#root > input').value
    })
    await page.click('#root > button')
    await page.waitForTimeout(500)
    const resultDiv = await page.evaluate(() => {
        return document.querySelector('#root > div > div:nth-child(2)').innerText
    })

    if (resultDiv === resultInput) {
        await browser.close()
    } else {
        console.log('Таск не найден')
    }
}

scrape()