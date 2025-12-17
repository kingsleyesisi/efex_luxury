const { test, expect } = require('@playwright/test');

const pages = [
  'index.html',
  'boutique.html',
  'gallery.html',
  'services.html',
  'the-house.html',
  'journal.html',
  'about.html',
  'contact.html'
];

pages.forEach(page => {
  test(`take screenshot of ${page}`, async ({ page: playwrightPage }) => {
    await playwrightPage.goto(`file://${process.cwd()}/${page}`);
    await playwrightPage.screenshot({ path: `screenshots/${page.replace('.html', '.png')}`, fullPage: true });
  });
});