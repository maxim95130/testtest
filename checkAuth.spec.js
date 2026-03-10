import { test, expect } from '@playwright/test';
// import { faker } from '@faker-js/faker';

test('Проверка успешной регистрации', async ({ page }) => {

  const testData = {
    username: 'TestUser', // + faker.number.int( {min: 10, max: 100} ),
    email: 'TestUser4343',
    password: 'TestUser4343',
  }
  
  await page.goto('https://runit.hexlet.ru/signup');

  const userName = page.locator( '#username' );
  const email = page.locator( '#email' );
  const password = page.locator( '#password' );
  const signupButton = page.getByRole( 'button', {name: 'Регистрация'});

  await userName.fill( testData.username );
  await email.fill( testData.email );
  await password.fill( testData.password );

  await signupButton.click();

  await expect( page.locator( 'body' )).toContainText( testData.username );
});