require("dotenv").config();
const fs = require("fs");
const path = require("path");
const zipcodes = require("./norwegian_zipcodes");
const Haikunator = require('haikunator');

// how many accounts to generate
const ACCOUNT_COUNT = 1000000;
const COUNTRY = "Norge";

// configure random number generator
const haikunator = new Haikunator({
    defaults: {
        tokenLength: 8
    }
})

// add propercase to prototype
String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

// compute path and delete existing file if there
const filename = path.join(__dirname, process.env.FILENAME || "accounts.csv");
if (fs.existsSync(filename)) fs.unlinkSync(filename);

// use a set to ensure unique account names
let names = new Set();
let rows = [];
let count = 0;
rows.push(`External_ID__c,Imported__c,Name,BillingPostalCode,BillingCountry,BillingCity,BillingState`);
while (count++ < (process.env.ACCOUNT_COUNT || ACCOUNT_COUNT)) {
    // get a unique name
    let name;
    while (!name || names.has(name)) {
        name = haikunator.haikunate({tokenLength: 4, delimiter: " "});
    }
    names.add(name);

    // generate an id for External ID
    let id = `00000000${count}`;
    id = `IMP-${id.substr(id.length - 8)}`;

    // get a random zipcode
    const zip = zipcodes[Math.floor(zipcodes.length * Math.random())];

    // add row
    rows.push(`${id},1,${name.toProperCase()},${zip.zip},${COUNTRY},${zip.city},${zip.muni}`);
}

// write to file
fs.writeFileSync(filename, rows.join("\r\n"));
