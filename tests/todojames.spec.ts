import { test, expect } from '@playwright/test';

test.describe('Todojames Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://todolist.james.am/#/')
    })

    
test('has title h1', async ({ page }) => {
    // 4 skirtingi budai atlikti toki pati testa (issirenku viena kuri noriu):
    await expect(page).toHaveTitle('To Do List');
    await expect(page.locator('h1')).toHaveText('To Do List')
    // h1, h2, h3, h4, h5, h6, kurie turi teksta To Do List
    await expect(page.getByRole('heading', {name: 'To Do List'})).toBeVisible();
    await expect(page.getByText('To Do List')).toBeVisible();
  });




  test('Add new item', async ({ page }) => {
    await page.locator('input.new-todo').fill('1 uzduotis');
    await page.keyboard.press('Enter');
    await expect(page.getByText('1 uzduotis')).toBeVisible();


    // tikrinu ar yra vidurine uzduotis:
    await page.locator('input.new-todo').fill('3 uzduotis');
    await page.keyboard.press('Enter');    await page.locator('input.new-todo').fill('3 uzduotis');
    await page.keyboard.press('Enter');    await page.locator('input.new-todo').fill('3 uzduotis');
    await page.keyboard.press('Enter');
    await expect(page.getByText('3 uzduotis').nth(1)).toBeVisible();
  
});

test('Delete item', async ({ page }) => {

});

test('Update item', async ({ page }) => {

})

test('Count items', async ({ page }) => {

});

});
