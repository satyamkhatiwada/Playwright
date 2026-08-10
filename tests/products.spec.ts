import test, { expect } from "@playwright/test";

test('products page is displayed', async ({page}) => {

    // login before navigating to products page
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // going to products page
    await expect(page).toHaveURL('/inventory.html');

    /* while using getbyRole() locator, we can use the accessible name of the element to locate it.
    example: button, link, checkbox, radio button, etc. and we can use the name of the element as the accessible name.
    accessible name is the name of the element that is used by screen readers to read the element.
    */
    await expect(page.getByRole('heading',{name: 'Products'})).toBeVisible();
    
});

test('user can add products to cart', async({page}) =>{
    // login before navigating to products page
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // navigate to products page
    await expect(page).toHaveURL('/inventory.html');
    await expect(page.getByRole('heading',{name: 'Products'})).toBeVisible();


    const products = page.locator('.inventory_item');
    
    await products.first().getByRole('button',{name: 'Add to cart'}).click();
    // await page.getByRole('button',{name: 'Add to cart'}).first().click();
    
    //using css selector/ locator()
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});


test('user can remove products from cart', async({page}) =>{
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    // navigate to products page
    await expect(page).toHaveURL('/inventory.html');

    const products = page.locator('.inventory_item');
    const product = products.first();

    // add product to cart
    await product.getByRole('button',{name: 'Add to cart'}).click();
    await expect(product.locator('.shopping_cart_badge')).toHaveText('1');

    // remove product from cart
    await product.getByRole('button',{name: 'Remove'}).click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

});
// test('user can view product details', async({page}) =>{});
// test('user can sort products by name', async({page}) =>{});