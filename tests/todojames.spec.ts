// paleidinejam atidarius playwright aplinka testus su komanda terminale: npx playwright test --ui  
// paleidinejam testus terminale:  npx playwright test

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
  
    // cypress: cy.get ('.klase').contains('blabla'), o playwright:
    page.locator('ul.todo-list li', {hasText: '1uzduotis'})
});

test('Create new to do', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
    await expect(todoItem).toBeVisible();
});



test('Delete item', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
    const todoItem = page.locator('ul.todo-list li:has-text("1 uzduotis")');
    await todoItem.hover();
    await todoItem.locator('button.destroy').click();
    await expect(todoItem).toHaveCount(0);
  });

  test('update item', async ({ page }) => {
    await page.fill('input.new-todo', '1 uzduotis');
    await page.press('input.new-todo', 'Enter');
   
    const todoItem = page.locator('ul.todo-list li', { hasText: '1 uzduotis' });
    await todoItem.dblclick();

    const editInput = page.locator('input.edit');
    await editInput.fill('istrynem ir vel prirasem');
    await editInput.press('Enter');

    const editedItem = page.locator('ul.todo-list li', { hasText: 'istrynem ir vel prirasem' });
    await expect(editedItem).toBeVisible();
});


test('Count items', async ({ page }) => {
    await page.fill('input.new-todo', '8 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '8 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '8 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '8 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '8 uzduotis');
    await page.press('input.new-todo', 'Enter');
    await page.fill('input.new-todo', '8 uzduotis');
    await page.press('input.new-todo', 'Enter');

    const fullList = page.locator('ul.todo-list li');
    await expect(fullList).toHaveCount(6);
});

});
