import test from "@playwright/test";
import {validLoginData, invalidLoginData} from "../test-data/loginData";


/*
test()
expect()
page.goto()
locator()
fill()
click()
getByRole()
getByText()
getByPlaceholder()

test()
│
├── Actions
│   ├── goto()
│   ├── fill()
│   ├── fill()
│   └── click()
│
└── Assertion
    └── expect()



    # types of assertions
    toHaveURL()
    toHaveTitle()
    toBeVisible()
    toBeHidden()
    toHaveText()
    toContainText()
    toHaveValue()
    toBeEnabled()
    toBeDisabled()
    toBeChecked()
    toHaveCount()
*/

/*
Locators from PRIORITY 1 to 7

1. getByRole() --> First choice for btn, links, checkboxes, radio buttons, etc. (accessible name) 
2. getByLabel() --> good for form fields when the application has proper labels
3. getByPlaceholder() --> when placegolder text is unique and descriptive
4. getByText() --> when the text is unique and descriptive, but can be affected by localization
5. getByTestId() --> This identifier is intended to be stable for automated testing. 
6. CSS / locator() --> when the above locators are not available, but can be affected by UI changes
7. XPath  ← usually last resort --> when the above locators are not available, but can be affected by UI changes
*/

for (const user of validLoginData) {
    test(`user can login successfully with correct credentials: ${user.username}`, async({page}) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill(user.username);
        await page.getByPlaceholder('Password').fill(user.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await test.expect(page).toHaveURL('/inventory.html');
    });
}


for (const user of invalidLoginData) {
    test(`user cannot login with invalid credentials: ${user.username} - ${user.password},`, async({page}) => {
        await page.goto('/');
        await page.getByPlaceholder('Username').fill(user.username);
        await page.getByPlaceholder('Password').fill(user.password);
        await page.getByRole('button', { name: 'Login' }).click();
        await test.expect(page).toHaveURL('/');
    });
}