const puppeteer = require('puppeteer');

let scrape = async () => {
    const value = Date.now().toString()
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto('http://localhost:3000')
    await page.type('[data-test-id=formInput]', value)
    await page.click('[data-test-id=addButton]')
    await page.waitForTimeout(500)
    const textInDiv = await page.evaluate(() => {
        return document.querySelector('[data-test-class=task]:last-child [data-test-class=taskText]').innerText
    })

    if (textInDiv === value) {
        await browser.close()
    } else {
        console.log('Таск не найден')
    }
}

scrape()