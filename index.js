const contactsRepo = require("./contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const result = await contactsRepo.listContacts();
      console.table(result);
      break;

    case "get":
      contactsRepo.getContactById(id);
      break;
``
    case "add":
      contactsRepo.addContact(name, email, phone);
      break;

    case "remove":
      contactsRepo.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
