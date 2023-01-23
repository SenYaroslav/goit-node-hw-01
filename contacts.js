const fsp = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function updateContactsList(contacts) {
  await fsp.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const contacts = await fsp.readFile(contactsPath);
  const res = JSON.parse(contacts);
  return res;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(
    (contact) => contact.id === contactId.toString()
  );
  if (!contact) {
    throw new Error("The contact is not found");
  }
  return console.table(contact);
}

async function removeContact(contactId) {
  const contacts = await listContacts();

  const index = contacts.findIndex(
    (contact) => contact.id === contactId.toString()
  );
  if (index === -1) {
    throw new Error("The contact is not found");
  }
  const deletedContact = contacts[index];
  contacts.splice(index, 1);

  await updateContactsList(contacts);

  return console.table(deletedContact);
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();

  const newContact = {
    id: nanoid(3),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await updateContactsList(contacts);

  return console.table(newContact);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
