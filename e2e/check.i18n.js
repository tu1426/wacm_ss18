module.exports = {
    'Landing Page': function (browser) {
        browser
            .url('https://localhost:8443/login')
            .pause(9000)
            .waitForElementVisible('body', 5000)
            .assert.urlContains('login')
            .assert.containsText('body', 'Please log in!')
    },

    'A User can login': function (browser) {
        browser
            .setValue('input#usernameInput[type=text]', 'user')
            .setValue('input#passwordInput[type=password]', 'password')
            .click('button.btn.btn-primary')
            .pause(9000)
            .assert.urlContains('home')
            .assert.containsText("body", "Welcome, you are logged in!")
    },

    'Check german translation': function (browser) {
        browser
            .click('ul.nav.navbar-nav')
            .pause(9000)
            .assert.containsText('body', 'Gesundheitsdaten')
            .end();
    }











};