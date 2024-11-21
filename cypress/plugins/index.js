// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

module.exports = (on, config) => {

    on('task', {
        log(message) {
            console.log(message)
            return null
        }
    })

    on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome') {
            launchOptions.args.push('--lang=en')
        }
        return launchOptions;
    });

    const configDotenv = require('dotenv').config();
    const env = { ...config.env, ...configDotenv.parsed };
    const result = { ...config, env };
    return result;
}