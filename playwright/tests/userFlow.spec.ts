import { expect, test } from '@playwright/test';

test('signup', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('email').click();

  await page.getByPlaceholder('email').press('Tab');
  await page.getByPlaceholder('username').fill('usernameTest');
  await page.getByPlaceholder('username').press('Tab');
  await page.getByPlaceholder('password').first().fill('testpassword');
  await page.getByPlaceholder('password').first().press('Tab');
  await page.getByPlaceholder('confirm password').fill('testpassword');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Sign up' }).click();
  expect(
    page.getByText('Error: Username and password are required'),
  ).toBeTruthy();
  await page.getByPlaceholder('email').fill('test@gmail.com');
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByRole('link', { name: 'profile' }).isVisible();
});

test('login and logout', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('email').fill('test@gmail.com');
  await page.getByPlaceholder('email').press('Tab');
  await page.getByPlaceholder('password').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'profile' }).isVisible();
  await page.getByRole('link', { name: 'logout' }).click();
  await page.getByRole('link', { name: 'Login' }).isVisible();
});

test('delete user', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('email').fill('test@gmail.com');
  await page.getByPlaceholder('email').press('Tab');
  await page.getByPlaceholder('password').fill('testpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('http://localhost:3000/', {
    timeout: 5000,
  });
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
  await page.getByRole('button', { name: 'Yes' }).click({ timeout: 5000 });
  await page.getByRole('link', { name: 'Sign up' }).click();
});
