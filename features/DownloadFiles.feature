Feature: Upload and View Files
	Scenario: Successfully Uploaded File
	Given User is logged in and is on the application full ticket page
	When User clicks on the "Add File" button
	And Selects the file "example.jpg" to upload
	Then The file named "example.jpg" appears in the list of uploaded files

	Scenario: Viewing the uploaded file
	Given The file "example.jpg" is available in the list of uploaded files
	When User clicks on the file name "example.jpg"
	Then The file opens in a new window for viewing