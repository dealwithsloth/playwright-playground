const { test } = require("@playwright/test")
const { UserLoginPage } = require("../pageObjects/userLogin.page")

const LOGIN_PAGE_BREADCRUMBS = "Login"
const FORGOTTEN_PASSWORD_BREADCRUMBS = "Forgotten Password"
const LOGIN_ERROR_MESSAGE = "Warning:"
const WRONG_CREDENTIALS_MESSAGE = "Warning: No match for E-Mail Address and/or Password."
const MY_ACCOUNT_CONTENT = "My Account"

test.beforeEach(async ({ page }) => {
    await page.goto("/index.php?route=account/login")
    await page.waitForLoadState('domcontentloaded')
})

test("Login - empty fields", async ({ page }) => {
    const userLoginPage = new UserLoginPage(page)
    await userLoginPage.assertBreadCrumbs(LOGIN_PAGE_BREADCRUMBS)
    await userLoginPage.clickEmailAddressInputField()
    await userLoginPage.clickPasswordInputField()
    await userLoginPage.clickLoginButton()
    await userLoginPage.assertLoginErrorMessage(LOGIN_ERROR_MESSAGE)
})

test("Login - wrong credentials", async ({ page }) => {
    const userLoginPage = new UserLoginPage(page)
    await userLoginPage.assertBreadCrumbs(LOGIN_PAGE_BREADCRUMBS)
    await userLoginPage.fillEmailAddressInputField()
    await userLoginPage.fillWrongPasswordInputField()
    await userLoginPage.clickLoginButton()
    await userLoginPage.assertLoginErrorMessage(WRONG_CREDENTIALS_MESSAGE)
})

test("Login - forgotten password", async ({ page }) => {
    const userLoginPage = new UserLoginPage(page)
    await userLoginPage.assertBreadCrumbs(LOGIN_PAGE_BREADCRUMBS)
    await userLoginPage.fillEmailAddressInputField()
    await userLoginPage.clickForgottenPassword()
    await userLoginPage.assertForgottenPasswordUrl()
    await userLoginPage.assertBreadCrumbs(FORGOTTEN_PASSWORD_BREADCRUMBS)
})

test("Login - correct login", async ({ page }) => {
    const userLoginPage = new UserLoginPage(page)
    await userLoginPage.assertBreadCrumbs(LOGIN_PAGE_BREADCRUMBS)
    await userLoginPage.fillEmailAddressInputField()
    await userLoginPage.fillPasswordInputField()
    await userLoginPage.clickLoginButton()
    await userLoginPage.assertMyAccountContent(MY_ACCOUNT_CONTENT)
})