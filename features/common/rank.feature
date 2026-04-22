Feature: Create users with mapped data

  # Scenario Outline: Create user with specific dataset
  #   Given user logs in with "<userId>" and "<password>"
  #   And user select "<ship>" from ship selection picklist
  #   And user select "<module>" from mega menu and select "<submodule>"
  #   When user fills rank form data using "<dataKey>"

  #   Examples: 
  #     | userId | password | dataKey | ship           | module | submodule |
  #     | fe     |     1234 | rank1   | Freeway        | COMMON | New Rank  |
 

   Scenario Outline: Delete user with specific dataset
    Given user logs in with "<userId>" and "<password>"
    And user select "<ship>" from ship selection picklist
    And user select "<module>" from mega menu and select "<submodule>"
    When user delete rank form data using "<dataKey>"

    Examples: 
      | userId | password | dataKey | ship           | module | submodule |
      | fe     |     1234 | rank1   | Freeway        | COMMON | Rank Explorer |
 