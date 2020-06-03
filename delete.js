#!/usr/bin/env node
const SalesforceDX = require('sfdx-bulk-helper');
const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const path = require('path')

const optionDefinitions = [
    {name: 'help', description: 'print this help'},
    {name: 'username', alias: 'u', type: String, defaultOption: true, description: 'Username to use when running SalesforceDX (required)'},
    {name: 'verbose', alias: 'v', type: Boolean, description: 'Be more verbose (optional)', defaultValue: false},
    {name: 'delete-accounts', type: Boolean, description: 'DELETE all imported Accounts in org', defaultValue: false}
]
const options = commandLineArgs(optionDefinitions, {'argv': process.argv})
if (options.help || !options.username) {
    console.log(commandLineUsage([{'header': 'Bulk Runner', content: 'Script used to automate data import and deletion using SalesforceDX.'}, {'header': 'Options', 'optionList': optionDefinitions}]))
    process.exit(1)
}

// create sfdx instance
const sfdx = new SalesforceDX(options.username, options.verbose)

// make sure org is connected and dispatch command if connected
sfdx.ensureOrgConnected().then(() => {
    console.log(`SFDX - Org for ${options.username} is connected...`)
    if (options['delete-accounts'] === true) {
        sfdx.bulkQueryAndDelete('Account', 'Imported__c != null').then(() => {
            console.log("Performed delete...")
            process.exit(0)
        }).catch(err => {
            console.log('Unable to perform delete of Accounts')
            process.exit(2)
        })
    }
    console.log("No operation to perform...")
    process.exit(0)

}).catch(err => {
    if (!err) {
        console.log(`SFDX - Org for ${options.username} is not connected - aborting...`)
    } else {
        console.log(err)
    }
    process.exit(2)
})