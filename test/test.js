const puppeteer = require('puppeteer');
const browser = puppeteer.launch({headless: false})

afterEach(async () => {
    await (await browser).close()
})

test('adding a task', async () => {
    const value = Date.now().toString()
    const page = await (await browser).newPage()

    await page.goto('http://localhost:3000')
    await page.type('[data-test-id=formInput]', value)
    await page.click('[data-test-id=addButton]')
    await page.waitForTimeout(500)
    const textInDiv = await page.evaluate(() => {
        return document.querySelector('[data-test-class=task]:last-child [data-test-class=taskText]').innerText
    })

    expect(textInDiv).toEqual(value)
})

