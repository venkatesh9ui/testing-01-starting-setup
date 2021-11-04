const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

// You could think that you can also use like ES6 imports if you had respective exports in your file of course, something like this but this will not work, not only because I'm not using ES6 exports here,that is also a problem, but even if I would use them, this is not a syntax natively supported by jest, this Node.js like import syntax is supported by jest and therefore I also wrote my code to use Node.js exports because that made it easier to implement jest.
// Obviously you can also make it work with ES modules, like you use it in React or Angular apps but there you need a more complex build workflow, you need some additional packages and I did not want to spend a lot of times on the setup, I want to spend time on testing, therefore I use this syntax. So now I'm using or I'm importing generate text in this file.

//unit testing
test('should output name and age', () => {
  const text = generateText('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

// test('should output no name and no age', () => {
//   const text = generateText();
//   expect(text).toBe('undefined (undefined years old)');
// });

// integration testing
test('should generate a valid text output', () => {
  const text = checkAndGenerate('Max', 29);
  expect(text).toBe('Max (29 years old)');
});

//E2E testing
test('should create an element with text and correct', async () => {
  const browser = await puppeteer.launch({
    headless: true
    // slowMo: 80,
    // args: ['--window-size=1920,1080']
  });
  const page = await browser.newPage();
  await page.goto(
    'file:///C:/Users/milev/Downloads/JavaScript-TheCompleteGuide2021(Beginner+Advanced)/testing-01-starting-setup/index.html'
  );
  await page.click('input#name');
  await page.type('input#name', 'Anna');
  await page.click('input#age');
  await page.type('input#age', '28');
  await page.click('#btnAddUser');
  const finalText = await page.$eval('.user-item', el => el.textContent);
  expect(finalText).toBe('Anna (28 years old)');
}, 1000000);
