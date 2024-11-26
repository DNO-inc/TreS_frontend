import { Given, Then, When } from '@cucumber/cucumber'

// Step 1: User is logged in and on the "full ticket" page
Given(
  'User is logged in and is on the application full ticket page',
  async function () {
    await browser.url('/general_tickets')
    await $('#cabinet-auth').click()
    await $('#email').setValue('user@example.com')
    await $('#password').setValue('password123')
    await $('#login-button').click()
    await browser.url('/tickets/full')
    await browser.pause(1000)
  }
)

// Step 2: Click the "Add File" button
When('User clicks on the "Add File" button', async function () {
  await $('#add-file-button').click()
})

// Step 3: Select the file "example.jpg" to upload
When('Selects the file {string} to upload', async function (fileName) {
  const fileInput = await $('#file-input')
  const filePath = path.join(__dirname, `./files/${fileName}`)
  await fileInput.setValue(filePath)
  await browser.pause(1000)
})

// Step 4: Check that the file appears in the list of uploaded files
Then(
  'The file named {string} appears in the list of uploaded files',
  async function (fileName) {
    const uploadedFilesList = await $('#uploaded-files-list')
    const fileNames = await uploadedFilesList.$$eval('li', items =>
      items.map(item => item.textContent)
    )

    if (!fileNames.includes(fileName)) {
      throw new Error(`File ${fileName} not found in the uploaded files list`)
    }
  }
)

// Step 5: Click on the file name to open it
When('User clicks on the file name {string}', async function (fileName) {
  const fileListItem = await $(`//li[text()="${fileName}"]`)
  await fileListItem.click()
})

// Step 6: Verify that the file opens in a new window for viewing
Then('The file opens in a new window for viewing', async function () {
  const windowHandles = await browser.getWindowHandles()
  if (windowHandles.length <= 1) {
    throw new Error('New window was not opened')
  }
  await browser.switchToWindow(windowHandles[1])
  await browser.pause(1000)
})
