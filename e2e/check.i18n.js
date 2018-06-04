module.exports = {
    'Landing Page': function (browser) {
        browser
            .url('https://localhost:8443/login')
            .pause(3000)
            .waitForElementVisible('body', 5000)
            .assert.urlContains('login')
            .assert.title('WACM_Group13')
            .assert.elementPresent('BUTTON')
            .assert.containsText('body', 'Please log in!')
    },

    'A User can login': function (browser) {
        browser
            .setValue('input#usernameInput[type=text]', 'user')
            .setValue('input#passwordInput[type=password]', 'password')
            .click('button.btn.btn-primary')
            .pause(3000)
            .assert.urlContains('home')
            .assert.containsText("body", "Welcome, you are logged in!")
    },

    'Check english translation': function (browser) {
        browser
            .click('ul.nav.navbar-nav')
            .pause(5000)
            .assert.containsText('body', 'Health data')
            .end();
    }











};