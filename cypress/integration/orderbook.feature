  Feature: Order Book

  Background:
    Given I open "/" page
    And I see "Order Book BTC-USD" in the title

  Scenario: Opening order book page
    When I open app on desktop
    Then I see the title
    And I see buys and sells columns
    And I see "buy" indicator direction goes to "left"
    And I see "sell" indicator direction goes to "right"

  Scenario: Opening order book on mobile
    When I open app on mobile
    Then I see the title
    And I see only sells column
    And I see "sell" indicator direction goes to "right"
    And I see "buy" indicator direction goes to "right"

  Scenario: Toggle markets
    When I change the market
    Then I see "Order Book ETH-USD" in the title

  Scenario: Pausing the application
    Given I switch to new tab
    Then I see the reconnect notification
    And I press recconect button
    Then I do not see the notification
