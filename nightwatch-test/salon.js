module.exports = {
    /*'Does not show the task list if there are no tasks'(client) {
    client	
      .url('http://facebook.com/')
      .pause(10000)
    client.end();
    },*/
    'Login Page Initial Render': function( browser ) {
      browser
      .url('http://facebook.com/')
      .waitForElementVisible( 'body', 1000 )
      .verify.visible('#loginUsername')
      .verify.visible('#loginPassword')
      .verify.value( 'button[type=submit]','Login')
      browser
          .keys(browser.Keys.TAB)
          .keys(browser.Keys.NULL);
       
        //Password has focus?
        browser
        .assert.elementPresent('#loginPassword')
        .pause(3000);
        
        browser
          .keys(browser.Keys.TAB)
          .keys(browser.Keys.NULL);
  
        // Then I can tab through all options:Password (d) Tab
        browser
          .keys(browser.Keys.TAB)
          .keys(browser.Keys.NULL);
  
        browser
          .setValue('#loginUsername', 'rohit');
        // Then I can tab through all options:Login (d) Tab
        browser
          .keys(browser.Keys.TAB)
          .keys(browser.Keys.NULL);
        browser
          .setValue('#loginPassword', '12341234');
        //Login has focus?
  
        // browser
        //.assert.elementPresent('button[type="submit"]:focus');
        browser
          .click('button[type="submit"]');
    }  
}