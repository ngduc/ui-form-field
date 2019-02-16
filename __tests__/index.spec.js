// const faker = require('faker');
// const person = {
//   name: faker.name.firstName() + ' ' + faker.name.lastName(),
//   email: faker.internet.email(),
//   phone: faker.phone.phoneNumber(),
//   message: faker.random.words()
// };

async function prop(element, property) {
  return await (await element.getProperty(property)).jsonValue();
}

beforeAll(async () => {
  page = await browser.newPage();
  await page.goto('http://localhost:3003/');
  await page.waitForSelector('.form-group');
});

describe('uiform', () => {
  test('should render all fields', async () => {
    const fields = await page.$$('.form-group');
    expect(fields).toHaveLength(7);
  });

  test('should have fields with 100% width', async () => {
    const emailStyles = await page.evaluate(() => {
      const el = document.querySelector('[name="email"]');
      return JSON.parse(JSON.stringify(getComputedStyle(el)));
    });
    const dobStyles = await page.evaluate(() => {
      const el = document.querySelector('[name="birthday"]');
      return JSON.parse(JSON.stringify(getComputedStyle(el)));
    });
    // await page.waitFor(4000);
    expect(emailStyles.width).toContain('800px'); // 100% of view width
    expect(dobStyles.width).toContain('800px'); // 100% of view width
  });

  test('should show error on blur', async () => {
    const birthday = await page.$('[name="birthday"]');
    birthday.focus(); // this trigger email field "blur" => should show: email required error
    const email = await page.$('[name="email"]');
    email.focus();
    const emailError = await page.$$('.invalid-feedback'); // bootstrap error class
    expect(emailError).toHaveLength(1);
  });

  // test('should show all errors on submit', async () => {
  //   const submit = await page.$('[type="submit"]');
  //   submit.click();
  //   const errors = await page.$$('.form-input-hint'); // spectre error class
  //   expect(errors).toHaveLength(2);
  // });
});
