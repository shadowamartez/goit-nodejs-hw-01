import {program} from "commander";

import * as contactsService from "./db/contacts.js";

const invokeAction = async({action, id, name, email, phone}) => {
    switch(action) {
        case "list":
            const allContacts = await contactsService.listContacts();
            return console.log(allContacts);
        case "get":
            const oneContact = await contactsService.getContactById(id);
            return console.log(oneContact);
        case "add":
            const newContact = await contactsService.addContact({name, email, phone});
            return console.log(newContact);
        case "remove":
            const deleteContact = await contactsService.removeContact(id);
            return console.log(deleteContact);
        default:
            console.log("Unknown action");
    }
}

program
    .option("-a, --action <type>")
    .option("-i, --id <type>")
    .option("-n, --name <type>")
    .option("-e, --email <type>")
    .option("-p, --phone <type>");

program.parse();

const options = program.opts();
invokeAction(options)

