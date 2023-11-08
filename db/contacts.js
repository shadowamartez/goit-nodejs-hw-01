import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

export const contactsPath = path.resolve("db", "contacts.json");

const updateContacts = contacts => fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export const listContacts = async () => {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
// ...твій код. Повертає масив контактів.
}

export const getContactById = async (id) => {
  const contacts = await listContacts();
  const result = contacts.find(item => item.id === id);
  return result || null;;
// ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
}

export const removeContact = async (id) => {
  const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === id);
    if (index === -1) {
      return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
}

export const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
  const newContact = {
      id: nanoid(),
      name,
      email,
      phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
// ...твій код. Повертає об'єкт доданого контакту. 
}