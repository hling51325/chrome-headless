const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch(
        {
            headless: false,
            userDataDir: './userData',
            args: [
                // '--no-sandbox',
                '--start-maximized'
            ]
        }
    );
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.goto('http://localhost:8080');
    // console.log((await page.cookies()))

    // await page.screenshot({ path: 'example.png' });

    // await browser.close();
    await page.setRequestInterception(true);
    page.on('request', req => {
        if (req.url() === 'http://localhost:3000/api/time') {
            req.respond({
                status: 200,
                body: '99999999999999'
            });
            return 
        }
        req.continue();
    })

    page.on('response', async res => {
    })
})();