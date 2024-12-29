const puppeteer = require("puppeteer");
const EXTENSION_PATH = "../";

let browser, newPage;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${EXTENSION_PATH}`,
      `--load-extension=${EXTENSION_PATH}`,
      `--hide-crash-restore-bubble`,
    ],
  });
  newPage = await browser.newPage();
  await newPage.bringToFront();
});

afterEach(async () => {
  await browser.close();
  browser = undefined;
});
async function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
test("trigger extension command", async () => {
  let pages = await browser.pages();
  let noOfPages = Object.keys(pages).length;
  await newPage.keyboard.down("Shift");
  await newPage.keyboard.down("Control");
  await newPage.keyboard.press("P");
  await newPage.keyboard.up("Control");
  await newPage.keyboard.up("Shift");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  pages = await browser.pages();
  expect(Object.keys(pages).length).toBe(noOfPages + 1);
});
