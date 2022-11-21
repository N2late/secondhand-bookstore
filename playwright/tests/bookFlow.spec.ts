import { expect, test } from '@playwright/test';

test('Add, Edit and Delete a book', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('email').click();
  await page.getByPlaceholder('email').fill('tiago@gmail.com');
  await page.getByPlaceholder('email').press('Tab');
  await page.getByPlaceholder('password').fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  /* Test Add a book */
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Sell' })
    .click();
  await expect(page).toHaveURL('http://localhost:3000/books/add', {
    timeout: 5000,
  });

  await page.setInputFiles('input[type="file"]', 'public/books/book1.jpg');

  /* Waiting for the response from the cloudinary API. */
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('cloudinary') && res.status() === 200,
    ),
  ]);
  await page.getByRole('img', { name: 'preview' }).isVisible();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Test book');
  await page.getByLabel('Author').click();
  await page.getByLabel('Author').fill('test author');
  await page.locator('.css-6j8wv5-Input').first().click();
  await page.locator('#react-select-3-option-0').click();
  await page.locator('.select__input-container').click();
  await page.locator('#react-select-5-option-4').click();
  await page
    .locator(
      '[id="book\\ condition"] > .css-1s2u09g-control > .css-319lph-ValueContainer > .css-6j8wv5-Input',
    )
    .click();
  await page.locator('#react-select-7-option-1').click();
  await page.getByPlaceholder('€').click();
  await page.getByPlaceholder('€').fill('10');
  await page.getByLabel('Shipping costs included').check();
  expect(page.getByText('Shipping costs included')).toBeTruthy();
  await page.getByLabel('Synopsis').click();
  await page.getByLabel('Synopsis').fill('Some text about the book.');
  await page.getByRole('button', { name: 'Add book' }).click({ timeout: 5000 });
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('cloudinary') && res.status() === 200,
    ),
  ]);
  await page.getByRole('button', { name: 'Edit book details' }).isVisible();

  /* Test Search feature */
  await page.getByRole('navigation').getByRole('link', { name: 'Buy' }).click();
  await expect(page).toHaveURL('http://localhost:3000/books/buy', {
    timeout: 5000,
  });
  await page.getByPlaceholder('Search for an author or a book title').click();
  await page
    .getByPlaceholder('Search for an author or a book title')
    .fill('Test');
  await page.getByRole('button', { name: 'Search' }).click();
  await page
    .getByRole('link', { name: 'Test book book cover' })
    .first()
    .click();
  /* Test Edit feature */
  await page.getByRole('button', { name: 'Edit book details' }).click();
  await page.getByRole('heading', { name: 'Edit your book details' }).click();
  await page.locator('.css-6j8wv5-Input').first().click();
  await page.locator('#react-select-9-option-1').click();
  await page.getByRole('button', { name: 'Save changes' }).click();
  await page.getByText('French').isVisible();
  /* Test Delete feature */
  await page.getByRole('button', { name: 'Delete book' }).click();
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Yes' }).click();
  await page
    .getByRole('heading', { name: 'The platform to buy and sell used books' })
    .click();
});
