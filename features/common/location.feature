Feature: Create location with mapped data

# currently not working
  Scenario Outline: Create location with specific dataset
    Given user logs in with "<userId>" and "<password>"
    And user select "<ship>" from ship selection picklist
    And user select "<module>" from mega menu and select "<submodule>"
    When user fills location form data using "<dataKey>"

    Examples: 
      | userId | password | dataKey   | ship    | module | submodule |
      | fe     |     1234 | location1 | Freeway | COMMON | Location  |
