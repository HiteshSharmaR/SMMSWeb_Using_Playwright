Feature: Create project with mapped data

  # Scenario Outline: Create project with specific dataset
  #   Given user logs in with "<userId>" and "<password>"
  #   And user select "<ship>" from ship selection picklist
  #   And user select "<module>" from mega menu and select "<submodule>"
  #   When user fills project form data using "<dataKey>"

  #   Examples: 
  #     | userId | password | dataKey  | ship    | module | submodule |
  #     | fe     |     1234 | project1 | Freeway | COMMON | Project   |


    Scenario Outline: Create project with specific dataset
    Given user logs in with "<userId>" and "<password>"
    And user select "<ship>" from ship selection picklist
    And user select "<module>" from mega menu and select "<submodule>"
    When user delete project record "<dataKey>"

    Examples: 
      | userId | password | dataKey  | ship    | module | submodule |
      | fe     |     1234 | project1 | Freeway | COMMON | Project   |

