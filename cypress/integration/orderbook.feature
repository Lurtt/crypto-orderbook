    Feature: Order Book

  Scenario: Opening order book page
    When I open "/" page
    Then I see the title
    And I see bids and asks columns
