Feature: Create a ticket
	Scenario: Successfully create a ticket
	And The user is on the "Створення звернення" page
	When The user selects the faculty "ЕлІТ"
	And Selects the category "Інше"
	And Enter the name "Проблема з розкладом"
	And Enter the description "Розклад не враховує останні зміни."
	And Clicks the "Надіслати звернення" button
	Then The user sees the message "Ваш запит успішно створено"