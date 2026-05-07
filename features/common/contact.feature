Feature: Create contact with mapped data
    Scenario Outline: Create contact with specific dataset
        Given user logs in with "<userId>" and "<password>"
        And user select "<ship>" from ship selection picklist
        And user select "<module>" from mega menu and select "<submodule>"
        When user creates contact record using "<dataKey>"

        Examples:
            | userId | password | dataKey    | ship           | module | submodule  |
            | fe     | 1234     | AssetType1 | Master Library | COMMON | New Contact |
