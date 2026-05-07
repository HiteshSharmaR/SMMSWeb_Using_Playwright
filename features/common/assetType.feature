Feature: Create Asset type with mapped data
    # Scenario Outline: Create asset type with specific dataset
    #     Given user logs in with "<userId>" and "<password>"
    #     And user select "<ship>" from ship selection picklist
    #     And user select "<module>" from mega menu and select "<submodule>"
    #     When user creates asset type data using "<dataKey>"

    #     Examples:
    #         | userId | password | dataKey    | ship           | module | submodule  |
    #         | fe     | 1234     | AssetType1 | Master Library | COMMON | Asset Type |


    Scenario Outline: Delete asset type with specific dataset
        Given user logs in with "<userId>" and "<password>"
        And user select "<ship>" from ship selection picklist
        And user select "<module>" from mega menu and select "<submodule>"
        When user delete asset type data using "<dataKey>"

        Examples:
            | userId | password | dataKey    | ship           | module | submodule  |
            | fe     | 1234     | AssetType1 | Master Library | COMMON | Asset Type |