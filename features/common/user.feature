Feature: Create users with mapped data

  Scenario Outline: Create user with specific dataset
    Given user logs in with "<userId>" and "<password>"
    And user select "<ship>" from ship selection picklist
    And user select "<module>" from mega menu and select "<submodule>"
    When user fills form using "<dataKey>"
    Then record should be created successfully

    Examples: 
      | userId | password | dataKey | ship    | module | submodule |
      | fe     |     1234 | user1   | Freeway | COMMON | New User  |

  Scenario Outline: Delete existing user
    Given user logs in with "<userId>" and "<password>"
    And user select "<ship>" from ship selection picklist
    And user select "<module>" from mega menu and select "<submodule>"
    When user search and delete record "<dataKey>"

    Examples: 
      | userId | password | ship    | module | submodule     | dataKey |
      | fe     |     1234 | Freeway | COMMON | User Explorer | user1   |
