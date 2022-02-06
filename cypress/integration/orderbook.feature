  Feature: Order Book

    Background:
      Given I open "/" page

  Scenario: Opening order book page
    When I open app on desktop
    Then I see the title
    And I see bids and asks columns
    And I see "buy" indicator direction goes to "left"
    And I see "sell" indicator direction goes to "right"

  Scenario: Opening order book on mobile
    When I open app on mobile
    Then I see the title
    And I see only asks column
    And I see "sell" indicator direction goes to "right"
    And I see "buy" indicator direction goes to "right"
