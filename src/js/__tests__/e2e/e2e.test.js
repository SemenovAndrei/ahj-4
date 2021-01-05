import puppetteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(300000); // default puppeteer timeout

describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:8888';

  beforeAll(async () => {
    server = fork(`${__dirname}../../../../js/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppetteer.launch({
      // headless: false, // show gui
      // slowMo: 250,
      // devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('should add do something', async () => {
    await page.goto(baseUrl);
  });

  test('invalid number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.form-main');
    const input = await form.$('.field');
    await input.type('4026');
    const submit = await form.$('.btn-submit');
    submit.click();
    await page.waitForSelector('.mark-invalid');
  });

  test('valid number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('.form-main');
    const input = await form.$('.field');
    await input.type('4111111111111111');
    const submit = await form.$('.btn-submit');
    submit.click();
    await page.waitForSelector('.mark-valid');
  });
});
