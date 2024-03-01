const { test } = require("@playwright/test")
const { UserRegisterPage } = require("../pageObjects/userRegister.page")

const PAGE_TITLE = "Register Account"
const SUCCESS_MESSAGE = "Your Account Has Been Created!"
const EMPTY_FIELD_MESSAGE = "must be between"
const EMAIL_ERROR_MESSAGE = "E-Mail Address does not appear to be valid!"
const DUPLICATED_ACCOUNT_ERROR_MESSAGE = "Warning: E-Mail Address is already registered!"
const CONFIRM_PASSWORD_ERROR_MESSAGE = "Password confirmation does not match password!"
const PRIVACY_POLICY_ERROR_MESSAGE = "Warning: You must agree to the Privacy Policy!"

test.beforeEach(async ({ page }) => {
    await page.goto("/index.php?route=account/register")
    await page.waitForLoadState('domcontentloaded')
})

test("Register - empty fields", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.clickFirstName()
    await userRegisterPage.clickLastName()
    await userRegisterPage.clickEmailAddress()
    await userRegisterPage.clickTelephone()
    await userRegisterPage.clickPassword()
    await userRegisterPage.clickConfirmPassword()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertFirstName(EMPTY_FIELD_MESSAGE)
    await userRegisterPage.assertLastName(EMPTY_FIELD_MESSAGE)
    await userRegisterPage.assertEmailAddress(EMAIL_ERROR_MESSAGE)
    await userRegisterPage.assertTelephone(EMPTY_FIELD_MESSAGE)
    await userRegisterPage.assertPassword(EMPTY_FIELD_MESSAGE)
})

test("Register - wrong email address format", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.fillEmailAddressWrongFormat()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertEmailAddress(EMAIL_ERROR_MESSAGE)
})

test("Register - too short password", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.fillFirstName()
    await userRegisterPage.fillLastName()
    await userRegisterPage.fillEmailAddress()
    await userRegisterPage.fillTelephone()
    await userRegisterPage.fillShortPassword()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertPassword(EMPTY_FIELD_MESSAGE)
})

test("Register - confirm password does not match", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.fillFirstName()
    await userRegisterPage.fillLastName()
    await userRegisterPage.fillEmailAddress()
    await userRegisterPage.fillTelephone()
    await userRegisterPage.fillShortPassword()
    await userRegisterPage.fillConfirmPassword()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertConfirmPassword(CONFIRM_PASSWORD_ERROR_MESSAGE)
})

test("Register - no agree privacy policy", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.fillFirstName()
    await userRegisterPage.fillLastName()
    await userRegisterPage.fillEmailAddress()
    await userRegisterPage.fillTelephone()
    await userRegisterPage.fillPassword()
    await userRegisterPage.fillConfirmPassword()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertPrivacyPolicyErrorMessage(PRIVACY_POLICY_ERROR_MESSAGE)
})

test("Register - duplicated account", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.fillFirstName()
    await userRegisterPage.fillLastName()
    await userRegisterPage.fillEmailAddress()
    await userRegisterPage.fillTelephone()
    await userRegisterPage.fillPassword()
    await userRegisterPage.fillConfirmPassword()
    await userRegisterPage.clickPrivacyPolicyCheckbox()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertPrivacyPolicyErrorMessage(DUPLICATED_ACCOUNT_ERROR_MESSAGE)
})

test("Register - correct data and success", async ({ page }) => {
    const userRegisterPage = new UserRegisterPage(page)
    await userRegisterPage.assertPageTitle(PAGE_TITLE)
    await userRegisterPage.fillFirstName()
    await userRegisterPage.fillLastName()
    await userRegisterPage.fillGeneratedEmailAddress()
    await userRegisterPage.fillTelephone()
    await userRegisterPage.fillPassword()
    await userRegisterPage.fillConfirmPassword()
    await userRegisterPage.clickPrivacyPolicyCheckbox()
    await userRegisterPage.clickContinueButton()
    await userRegisterPage.assertSuccessMessage(SUCCESS_MESSAGE)
})