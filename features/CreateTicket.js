import { Given, Then, When } from '@cucumber/cucumber'

// Step 1: User is authorized
Given('User is authorized', async function () {
  await browser.url('/general_tickets')
  await $('#cabinet-auth').click()
  await $('#email').setValue('user@example.com')
  await $('#password').setValue('password123')
  await $('#login-button').click()
  await browser.pause(1000)
})

// Step 2: Navigate to the "Створення звернення" page
Given('The user is on the {string} page', async function (pageName) {
  if (pageName === 'Ticket creation') {
    await browser.url('/tickets/create')
  }
})

// Step 3: Select faculty
When('The user selects the faculty {string}', async function (faculty) {
  await $('#faculty-select').selectByVisibleText(faculty)
})

// Step 4: Select category
When('Selects the category {string}', async function (category) {
  await $('#category-select').selectByVisibleText(category)
})

// Step 5: Enter the name
When('Enter the name {string}', async function (name) {
  await $('#request-name').setValue(name)
})

// Step 6: Enter the description
When('Enter the description {string}', async function (description) {
  await $('#request-description').setValue(description)
})

// Step 7: Click the "Надіслати звернення" button
When('Clicks the {string} button', async function (buttonName) {
  if (buttonName === 'Send ticket') {
    await $('#send-button').click()
  }
})

// Step 8: The user sees the message
Then('The user sees the message {string}', async function (expectedMessage) {
  const actualMessage = await $('#success-message').getText()

  if (actualMessage !== expectedMessage) {
    throw new Error(
      `Expected message: "${expectedMessage}", but got: "${actualMessage}"`
    )
  }
})
