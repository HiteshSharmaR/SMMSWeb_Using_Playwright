Feature: Create users with mapped data

  Scenario Outline: Create user with specific dataset
    Given user logs in with "<userId>" and "<password>"
    And user select "<ship>" from ship selection picklist
    When user fills form using "<dataKey>"
    Then record should be created successfully

    Examples: 
      | userId | password | dataKey | ship    |
      | fe     |     1234 | user1   | Freeway |