import testData from "../fixtures/testData.json"

const { expect } = require("@playwright/test")

exports.UserLoginPage = class UserLoginPage {
    constructor(page) {
        this.page = page
        this.breadCrumbs = page.locator(".breadcrumb")
        this.pageTitle = page.locator("#account-login")
        this.emailAddressInputField = page.locator("#input-email")
        this.loginErrorMessage = page.locator(".alert-danger")
        this.passwordInputField = page.locator("#input-password")
        this.forgottenPassword = page.locator("//a[.='Forgotten Password']")
        this.loginButton = page.locator("//input[@class='btn btn-primary']")
        this.accountContent = page.locator("#content")
        this.forgottenPasswordUrl = page.locator("/index.php?route=account/forgotten")
    }

    async assertBreadCrumbs(breadCrumbs) {
        await expect(this.breadCrumbs).toContainText(breadCrumbs)
    }

    async clickEmailAddressInputField() {
        await this.emailAddressInputField.click()
    }

    async fillEmailAddressInputField() {
        await this.emailAddressInputField.fill(testData.userCorrect.mailAddress)
    }

    async assertLoginErrorMessage(loginErrorMessage) {
        await expect(this.loginErrorMessage).toContainText(loginErrorMessage)
    }

    async clickPasswordInputField() {
        await this.passwordInputField.click()
    }

    async fillPasswordInputField() {
        await this.passwordInputField.fill(testData.userCorrect.password)
    }

    async fillWrongPasswordInputField() {
        await this.passwordInputField.fill(testData.userIncorrect.password)
    }

    async clickForgottenPassword() {
        await this.forgottenPassword.click()
    }

    async clickLoginButton() {
        await this.loginButton.click()
    }

    async assertForgottenPasswordUrl(forgottenPasswordUrl) {
        await expect(this.forgottenPasswordUrl).toHaveURL(forgottenPasswordUrl)
    }

    async assertMyAccountContent(accountContent) {
        await expect(this.accountContent).toContainText(accountContent)
    }
}