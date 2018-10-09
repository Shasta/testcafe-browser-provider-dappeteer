import puppeteer from 'puppeteer';
import dappeteer from 'dappeteer';

export default {
    // Multiple browsers support
    isMultiBrowser: true,

    browser: null,
    
    metamask: null,

    openedPages: {},

    // Required - must be implemented
    // Browser control
    async openBrowser (id, pageUrl, browserName) {

        if (!this.browser) {
            let puppeteerArgs = [];

            if (browserName === 'no_sandbox') {
                puppeteerArgs = [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                ];
            }
            this.browser = await dappeteer.launch(puppeteer, {
                timeout: 10000,
                headless: false,
                args: puppeteerArgs
            });

            this.metamask = await dappeteer.getMetamask(this.browser);
        }

        const page = await this.browser.newPage();

        await page.goto(pageUrl);
        this.openedPages[id] = page;
    },

    async closeBrowser (id) {
        delete this.openedPages[id];
        await this.browser.close();
    },

    async isValidBrowserName () {
        return true;
    },

    // Extra methods
    async resizeWindow (id, width, height) {
        await this.openedPages[id].setViewport({ width, height });
    },

    async takeScreenshot (id, screenshotPath) {
        await this.openedPages[id].screenshot({ path: screenshotPath });
    },

    // Testcafe method to get Dappeter Metamask instance
    async getMetamask(t /* testcafe instance */) {
        return t.testRun.browserManipulationQueue.browserProvider.plugin.metamask;
    }
};
