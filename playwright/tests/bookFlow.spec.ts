import { expect, test } from '@playwright/test';

test('Add, Edit and Delete a book', async ({ page }) => {
  /* add user */
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('email').click();
  await page.getByPlaceholder('email').fill('testmail2@gmail.com');
  await page.getByPlaceholder('email').press('Tab');
  await page.getByPlaceholder('username').fill('usernameTesting2');
  await page.getByPlaceholder('username').press('Tab');
  await page.getByPlaceholder('password').first().fill('testpassword');
  await page.getByPlaceholder('password').first().press('Tab');
  await page.getByPlaceholder('confirm password').fill('testpassword');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Sign up' }).click();
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('api') && res.status() === 200,
    ),
  ]);
  await page.getByRole('link', { name: 'profile' }).isVisible();

  /* Test Add a book */
  await page
    .getByRole('navigation')
    .getByRole('link', { name: 'Sell' })
    .click({ timeout: 5000 });
  await expect(page).toHaveURL('http://localhost:3000/books/add', {
    timeout: 5000,
  });

  /* Uploading a file to the cloudinary API. */
  await page.setInputFiles('input[type="file"]', 'public/books/book1.jpg');

  /* Waiting for the response from the cloudinary API. */
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('cloudinary') && res.status() === 200,
    ),
  ]);
  await page.getByRole('img', { name: 'preview' }).isVisible();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Book 5');
  await page.getByLabel('Author').click();
  await page.getByLabel('Author').fill('test author');
  await page.locator('#language svg').click();
  await page.locator('#react-select-2-option-0').click();
  await page.locator('#genre svg').click();
  await page.locator('#react-select-3-option-0').click();
  await page.locator('[id="book\\ condition"] svg').click();
  await page.locator('#react-select-4-option-1').click();
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
    .fill('Book 5');
  await page.getByRole('button', { name: 'Search' }).click();
  await page.getByRole('link', { name: 'Book 5 book cover' }).first().click();
  /* Test Edit feature */
  await page.getByRole('button', { name: 'Edit book details' }).click();
  await page.getByRole('heading', { name: 'Edit your book details' }).click();
  await page.locator('#language svg').isVisible();
  await page.getByLabel('Title').click();
  await page.getByLabel('Title').fill('Book 2');
  await page.getByRole('button', { name: 'Save changes' }).click();
  await Promise.all([
    page.waitForResponse(
      (res) => res.url().includes('api') && res.status() === 200,
    ),
  ]);

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

  /* delete user  */
  await page.getByRole('link', { name: 'profile' }).click({ timeout: 5000 });
  await expect(page).toHaveURL('http://localhost:3000/profile', {
    timeout: 5000,
  });
  await page.getByRole('button', { name: 'trashDelete Profile' }).click();
  await page.getByRole('button', { name: 'Yes' }).isVisible();
  await page.getByRole('button', { name: 'Yes' }).click({ timeout: 5000 });
  page.once('dialog', (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('link', { name: 'Sign up' }).click();
});
