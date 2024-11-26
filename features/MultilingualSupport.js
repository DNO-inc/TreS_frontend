import { Given, Then, When } from '@cucumber/cucumber'

// Step 1: User is on the application homepage
Given('User is on the application homepage', async function () {
  await browser.url('/')
  await browser.pause(1000)
})

// Step 2: User selects Ukrainian from the language selector
When('User selects Ukrainian from the language selector', async function () {
  const languageSelector = await $('#language-selector')
  await languageSelector.selectByVisibleText('ua')
  await browser.pause(1000)
})

// Step 3: User selects English from the language selector
When('User selects English from the language selector', async function () {
  const languageSelector = await $('#language-selector')
  await languageSelector.selectByVisibleText('en')
  await browser.pause(1000)
})

// Step 4: All interface elements should be displayed in Ukrainian
Then(
  'All interface elements should be displayed in Ukrainian',
  async function () {
    const heading = await $('#heading')
    const notifications = await $('#notifications')
    const myTickets = await $('#my-tickets')
    const createTicket = await $('#create-ticket')

    const headingText = await heading.getText()
    const notificationsText = await notifications.getText()
    const myTicketsText = await myTickets.getText()
    const createTicketText = await createTicket.getText()

    if (headingText !== 'Поточні звернення') {
      throw new Error(`Expected "Поточні звернення", but got "${headingText}"`)
    }
    if (notificationsText !== 'Сповіщення') {
      throw new Error(`Expected "Сповіщення", but got "${notificationsText}"`)
    }
    if (myTicketsText !== 'Мої звернення') {
      throw new Error(`Expected "Мої звернення", but got "${headingText}"`)
    }
    if (createTicketText !== 'Створити звернення') {
      throw new Error(
        `Expected "Створити звернення", but got "${notificationsText}"`
      )
    }
  }
)

// Step 5: All interface elements should be displayed in English
Then(
  'All interface elements should be displayed in English',
  async function () {
    const heading = await $('#heading')
    const notifications = await $('#notifications')
    const myTickets = await $('#my-tickets')
    const createTicket = await $('#create-ticket')

    const headingText = await heading.getText()
    const notificationsText = await notifications.getText()
    const myTicketsText = await myTickets.getText()
    const createTicketText = await createTicket.getText()

    if (headingText !== 'General Tickets') {
      throw new Error(`Expected "General Tickets", but got "${headingText}"`)
    }
    if (notificationsText !== 'Notifications') {
      throw new Error(`Expected "Notifications", but got "${buttonText}"`)
    }
    if (myTicketsText !== 'My tickets') {
      throw new Error(`Expected "Мої звернення", but got "${headingText}"`)
    }
    if (createTicketText !== 'Create ticket') {
      throw new Error(
        `Expected "Створити звернення", but got "${notificationsText}"`
      )
    }
  }
)
