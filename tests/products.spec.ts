import test, { expect } from "@playwright/test";

// logging in before each test
test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
});


test('products page is displayed', async ({page}) => {
    // going to products page
    await expect(page).toHaveURL('/inventory.html');

    /* while using getbyRole() locator, we can use the accessible name of the element to locate it.
    example: button, link, checkbox, radio button, etc. and we can use the name of the element as the accessible name.
    accessible name is the name of the element that is used by screen readers to read the element.
    */
    await expect(page.getByTestId('title')).toHaveText('Products');
    
});

test('user can add products to cart', async({page}) =>{

    // Verifying header
    await expect(page.getByTestId('title')).toHaveText('Products');


    const products = page.locator('.inventory_item');
    
    await products.first().getByRole('button',{name: 'Add to cart'}).click();
    // await page.getByRole('button',{name: 'Add to cart'}).first().click();
    
    //using css selector/ locator()
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

});


test('user can remove products from cart', async({page}) =>{
    
    const products = page.locator('.inventory_item');
    const product = products.first();

    // add product to cart
    await product.getByRole('button',{name: 'Add to cart'}).click();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    // remove product from cart
    await product.getByRole('button',{name: 'Remove'}).click();
    await expect(page.locator('.shopping_cart_badge')).not.toBeVisible();

});


test('user can view product details', async({page}) =>{
    const products = page.locator('.inventory_item');
    const count = await products.count();

    // check description of all product
    for (let i = 0; i < count; i++){
        const product = products.nth(i)

        await expect(product.getByTestId('inventory-item-desc')).toHaveText(/\S+/);
    }
});


// test('user can sort products by name', async({page}) =>{});

// test('user can sort products by price', async({page}) =>{});