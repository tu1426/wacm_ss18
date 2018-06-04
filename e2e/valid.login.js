module.exports = {
    'Landing Page': function (client) {
        client
            .url('https://localhost:8443/login')
            .pause(5000)
            .waitForElementVisible('body', 5000)
            .assert.urlContains('login')
            .assert.title('WACM_Group13')
            .assert.elementPresent('BUTTON')
            .assert.containsText('body', 'Please log in!')
    },

    'A User can login': function (client) {
        client
            .setValue('input#usernameInput[type=text]', 'user')
            .setValue('input#passwordInput[type=password]', 'password')
            .click('button.btn.btn-primary')
            .pause(5000)
            .assert.urlContains('home')
            .assert.containsText("body", "Welcome, you are logged in!")
    },

    'A User who is logged in cannot access the Login page again': function (client) {
        client
            .url('https://localhost:8443/login')
            .pause(5000)
            .assert.urlContains('home')
    },

    'A user can refresh the page and redirect to the same page': function (client) {
        client
            .refresh()
            .pause(5000)
            .assert.urlContains('home')
    },

    'A User can logout': function (client) {
        client
            .click('ul.nav.navbar-nav.navbar-right')
            .pause(5000)
            .click('ul.dropdown-menu')
            .pause(5000)
            .assert.urlContains('login')
            .assert.containsText('body', 'Please log in!')
            .end();
    }

};