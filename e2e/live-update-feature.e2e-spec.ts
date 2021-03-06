import { browser, element, by, ExpectedConditions as EC } from 'protractor';
const PixelDiff = require('pixel-diff');
const browserLogs = require('protractor-browser-logs');

describe('Live update feature', () => {
  let logs: any;

  beforeEach(() => {
    logs = browserLogs(browser);
  });

  afterEach(() => {
    return logs.verify();
  });

  it('should move the map', async () => {
    browser.ignoreSynchronization = true;
    await browser.get('/live-update-feature');
    const elm = element(by.tagName('canvas'));
    await browser.wait(EC.presenceOf(elm), 2000);
    await browser.sleep(6000);
    const imageA = await browser.takeScreenshot();
    await browser.sleep(700);
    const imageB = await browser.takeScreenshot();
    const diff = new PixelDiff({
      imageA: new Buffer(imageA, 'base64'),
      imageB: new Buffer(imageB, 'base64')
    });
    const result = diff.runSync();
    expect(result.differences).toBeGreaterThan(0);
  });
});
