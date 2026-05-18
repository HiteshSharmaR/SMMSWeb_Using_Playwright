Feature: Create contact with mapped data
    Scenario Outline: Create contact with specific dataset
        Given user logs in with "<userId>" and "<password>"
        And user select "<ship>" from ship selection picklist
        And user select "<module>" from mega menu and select "<submodule>"
        When user creates contact record using "<dataKey>"

        Examples:
            | userId | password | dataKey  | ship           | module | submodule   |
            | fe     | 1234     | Contact1 | Master Library | COMMON | New Contact |

    Scenario Outline: Delete contact record with mapped data
        Given user logs in with "<userId>" and "<password>"
        And user select "<ship>" from ship selection picklist
        And user select "<module>" from mega menu and select "<submodule>"
        When user deletes contact record using "<dataKey>"

        Examples:
            | userId | password | dataKey  | ship                  | module | submodule        |
            | fe     | 1234     | Contact1 | Master Library        | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Beachway              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Boka Northern Ocean   | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Causeway              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Coastway              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Crestway              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Freeway               | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Gateway               | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Internal Testing Ship | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Kamara                | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Komodo                | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Manta                 | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Medway                | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Ndeavor               | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Ndurance              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Nicobar               | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Oranje                | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Princess              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Prins der Nederlanden | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Shoalway              | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Sovereign             | COMMON | Contact Explorer |
            | fe     | 1234     | Contact1 | Strandway             | COMMON | Contact Explorer |
