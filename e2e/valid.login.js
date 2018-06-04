module.exports = {
    'Landing Page': function (browser) {
        browser
            .url('https://localhost:8443/login')
            .pause(3000)
            .waitForElementVisible('body', 5000)
            .assert.urlContains('login')
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

    'A User who is logged in cannot access the Login page again': function (browser) {
        browser
            .url('https://localhost:8443/login')
            .pause(3000)
            .assert.urlContains('home')
    },

    'A user can refresh the page and redirect to the same page': function (browser) {
        browser
            .refresh()
            .pause(3000)
            .assert.urlContains('home')
    },

    'A User can logout': function (browser) {
        browser
            .click('ul.nav.navbar-nav.navbar-right')
            .pause(3000)
            .click('ul.dropdown-menu')
            .pause(3000)
            .assert.urlContains('login')
            .assert.containsText('body', 'Please log in!')
            .end();
    }

};