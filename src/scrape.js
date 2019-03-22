const puppeteer = require('puppeteer');
const selectors = require('./selectors').selectors;

let BROWSER_ARGS = [
    '--no-sandbox',
    '--disable-gpu',
    '--disable-popup-blocking',
    '--disable-setuid-sandbox'
];
if (process.env.ENVIRONMENT !== 'LOCAL') {
    BROWSER_ARGS.push('--single-process');
}

const QS_RANKING_URL = 'https://www.topuniversities.com/university-rankings/world-university-rankings/2019';

const NAV_OPTIONS = {
    timeout: 0,
    waitUntil: "networkidle2"
}
let browser;

module.exports.getBest100Universities = async function () {

    let readyPage = await setup();

    // show 100 universities
    await showOneHundredUniversities(readyPage);

    //await closeQS();
}

async function setup() {
    console.info(">>> Setup");
    try {
        let mainPage = await openQS();

        return mainPage;
    } catch (error) {
        console.info("! Setup failed");
        await browser.close();
        throw error;
    }
}

async function openQS() {
    // Start browser
    console.info(">>> Opening QS");
    browser = await puppeteer.launch({
        headless: false,
        args: BROWSER_ARGS,
    });

    // Open new page
    const page = await browser.newPage();
    
    // Open QS URL
    await page.goto(QS_RANKING_URL, NAV_OPTIONS);

    return page;
}

async function showOneHundredUniversities(page) {

    for (let i = 3; i < 6; i++) {
        let selector = selectors.pages.replace('?', i);
        
        // get universities
        const universities  = await getUniversities(page);
        console.log(universities);

        await page.click(selector);
        await page.waitFor(20000);
    }

}

async function getUniversities(page) {
    let universities = await page.evaluate((sel) => {
        let arr = document.querySelectorAll(sel);
        return arr;
    }, selectors.universities);

    return universities;
}

async function closeQS() {
    console.info(">>> Closing QS");
    await browser.close();
}

