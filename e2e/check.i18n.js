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

    'Check english translation': function (client) {
        client
            .click('ul.nav.navbar-nav')
            .pause(3000)
            .verify.containsText('body', 'Healthbook')
            .end();
    }











};