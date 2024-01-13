const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const { contactsPath } = require("./db");
nanoid;
const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};
const getContactById = async (id) => {
  const data = await listContacts();
  const res = data.find((el) => el.id === id);
  return res || null;
};
const addContact = async (data) => {
  const contacts = await listContacts();
  const newContact = {
    ...data,
    id: nanoid(20),
  };
  contacts.push(newContact);
  console.log(contacts);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
 
  return newContact;
};

const updateById = async (id, data) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === id);
  if (index === -1) {
    return null;
  }
  contacts[index] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  console.log(contacts);
  return contacts;
};

const removeContact = async (id) => {
  const contacts = await listContacts();
  // const res = contacts.filter((el) => el.id !== id);
    // await fs.writeFile(contactsPath, JSON.stringify(res, null, 2));
  const index = contacts.findIndex((el) => el.id === id);
  if (index === -1) {
    return null;
  }
  const [res] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return res;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateById,
};
