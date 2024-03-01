import testData from "../fixtures/testData.json"

const { expect } = require("@playwright/test")
const { generateRandomEmail } = require("../utility/stringUtil")

exports.UserRegisterPage = class UserRegisterPage {
    constructor(page) {
        this.page = page
        this.pageTitle = page.locator(".page-title")
        this.firstNameInputField = page.locator("#input-firstname")
        this.firstNameErrorMessage = page.locator("#account > div:nth-of-type(2) .text-danger")
        this.lastNameInputField = page.locator("#input-lastname")
        this.lastNameErrorMessage = page.locator("#account > div:nth-of-type(3) .text-danger")
        this.emailInputField = page.locator("#input-email")
        this.emailErrorMessage = page.locator("#account > div:nth-of-type(4) .text-danger")
        this.telephoneInputField = page.locator("#input-telephone")
        this.telephoneErrorMessage = page.locator("#account > div:nth-of-type(5) .text-danger")
        this.telephoneHelpMessage = page.locator("#input-telephone-help")
        this.passwordInputField = page.locator("#input-password")
        this.passwordErrorMessage = page.locator("fieldset:nth-of-type(2) > div:nth-of-type(1) .text-danger")
        this.confirmPasswordInputField = page.locator("#input-confirm")
        this.confirmPasswordErrorMessage = page.locator("fieldset:nth-of-type(2) > div:nth-of-type(2) .text-danger")
        this.newsletterYesOption = page.locator("[for='input-newsletter-yes']")
        this.newsletterNoOption = page.locator("[for='input-newsletter-no']")
        this.privacyPolicyCheckbox = page.locator(".custom-checkbox")
        this.privacyPolicyErrorMessage = page.locator(".alert-danger")
        this.continueButton = page.locator("[value='Continue']")
    }

    async assertPageTitle(pageTitle) {
        await expect(this.pageTitle).toContainText(pageTitle)
    }

    async clickFirstName() {
        await this.firstNameInputField.click()
    }

    async fillFirstName() {
        await this.firstNameInputField.fill(testData.userCorrect.firstName)
    }

    async assertFirstName(firstNameErrorMessage) {
        await expect(this.firstNameErrorMessage).toContainText(firstNameErrorMessage)
    }

    async clickLastName() {
        await this.lastNameInputField.click()
    }

    async fillLastName() {
        await this.lastNameInputField.fill(testData.userCorrect.lastName)
    }

    async assertLastName(lastNameErrorMessage) {
        await expect(this.lastNameErrorMessage).toContainText(lastNameErrorMessage)
    }

    async clickEmailAddress() {
        await this.emailInputField.click()
    }

    async fillEmailAddress() {
        await this.emailInputField.fill(testData.userCorrect.mailAddress)
    }

    async fillEmailAddressWrongFormat() {
        await this.emailInputField.fill(testData.userIncorrect.mailAddressFormat)
    }

    async fillGeneratedEmailAddress() {
        const generatedEmail = generateRandomEmail()
        await this.emailInputField.fill(generatedEmail)
    }

    async assertEmailAddress(emailErrorMessage) {
        await expect(this.emailErrorMessage).toContainText(emailErrorMessage)
    }

    async clickTelephone() {
        await this.telephoneInputField.click()
    }

    async fillTelephone() {
        await this.telephoneInputField.fill(testData.userCorrect.phoneNumber)
    }

    async assertTelephone(telephoneErrorMessage) {
        await expect(this.telephoneErrorMessage).toContainText(telephoneErrorMessage)
    }

    async clickPassword() {
        await this.passwordInputField.click()
    }

    async fillPassword() {
        await this.passwordInputField.fill(testData.userCorrect.password)
    }

    async fillShortPassword() {
        await this.passwordInputField.fill(testData.userIncorrect.password)
    }

    async assertPassword(passwordErrorMessage) {
        await expect(this.passwordErrorMessage).toContainText(passwordErrorMessage)
    }

    async clickConfirmPassword() {
        await this.confirmPasswordInputField.click()
    }

    async fillConfirmPassword() {
        await this.confirmPasswordInputField.fill(testData.userCorrect.password)
    }

    async assertConfirmPassword(confirmPasswordErrorMessage) {
        await expect(this.confirmPasswordErrorMessage).toContainText(confirmPasswordErrorMessage)
    }

    async clickYesNewsletter() {
        await this.newsletterYesOption.click()
    }

    async clickNoNewsletter() {
        await this.newsletterNoOption.click()
    }

    async clickPrivacyPolicyCheckbox() {
        await this.privacyPolicyCheckbox.click()
    }

    async assertPrivacyPolicyErrorMessage(privacyPolicyErrorMessage) {
        await expect(this.privacyPolicyErrorMessage).toContainText(privacyPolicyErrorMessage)
    }

    async clickContinueButton() {
        await this.continueButton.click()
    }

    async assertSuccessMessage(pageTitle) {
        await expect(this.pageTitle).toContainText(pageTitle)
    }
}