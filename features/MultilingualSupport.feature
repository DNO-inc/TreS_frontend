Feature: Multilingual support in the application

  Scenario: User switches language to Ukrainian
    Given User is on the application homepage
    When User selects Ukrainian from the language selector
    Then All interface elements should be displayed in Ukrainian

  Scenario: User switches language to English
    Given User is on the application homepage
    When User selects English from the language selector
    Then All interface elements should be displayed in English
