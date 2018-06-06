module.exports = {
    'Landing Page': function (client) {
        client
            .url('https://localhost:8443/login')
            .pause(3000)
            .waitForElementVisible('body', 5000)
            .verify.urlContains('login')
            .verify.title('WACM_Group13')
            .verify.elementPresent('BUTTON')
            .verify.containsText('body', 'Please log in!')
    },

    'A User can login': function (client) {
        client
            .setValue('input#usernameInput[type=text]', 'user')
            .setValue('input#passwordInput[type=password]', 'password')
            .click('button.btn.btn-primary')
            .pause(3000)
            .verify.urlContains('home')
            .verify.containsText("body", "Welcome, you are logged in!")
    },

    'A User who is logged in cannot access the Login page again': function (client) {
        client
            .url('https://localhost:8443/login')
            .pause(3000)
            .verify.urlContains('home')
    },

    'A user can refresh the page and redirect to the same page': function (client) {
        client
            .refresh()
            .pause(3000)
            .verify.urlContains('home')
    },

    'A User can logout': function (client) {
        client
            .click('ul.nav.navbar-nav.navbar-right')
            .pause(3000)
            .click('ul.dropdown-menu')
            .pause(3000)
            .verify.urlContains('login')
            .verify.containsText('body', 'Please log in!')
            .end();
    }

};