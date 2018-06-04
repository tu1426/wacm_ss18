module.exports = {
  'check if index available'(client) {
    client
      .url('https://localhost:8443')
      .waitForElementVisible('body', 3000)
      .expect.element('h1').to.be.present;
      .assert.title('WACM_Group13')
    client.end();
  },
  'check if register available'(client) {
    client
      .url('https://localhost:8443/register')
      .waitForElementVisible('body', 3000)
      .expect.element('div').to.be.present;
    client.end();
  },
};
