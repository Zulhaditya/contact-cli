const fs = require('fs');
const chalk = require('chalk');
const validator = require('validator');

// create folder if not exists
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// create contact.json if not exists
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

const saveContact = (name, email, phone) => {
  const contact = { name, email, phone };

  const contacts = loadContact();

  // check duplicate
  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.log(
      chalk.red.inverse('Contacts are already registered, use another name!')
    );
    return false;
  }

  // check email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.red.inverse('Invalid email!'));
      return false;
    }
  }

  // check phone numbers
  if (!validator.isMobilePhone(phone)) {
    console.log(chalk.red.inverse('Invalid phone numbers!'));
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
  console.log(chalk.green.inverse('Contact saved!'));
};

// function list contacts
const listContact = () => {
  const contacts = loadContact();
  console.log(chalk.blue.inverse('Contact list'));

  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.name} - ${contact.phone}`);
  });
};

// function contact details
const detailContact = (name) => {
  const contacts = loadContact();

  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.log(chalk.red.inverse(`${name} is not found!`));
    return false;
  }

  console.log(chalk.blue.inverse(contact.name));
  console.log(contact.phone);
  if (contact.email) {
    console.log(contact.email);
  }
};

// function delete contact
const deleteContact = (name) => {
  const contacts = loadContact();

  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.log(chalk.red.inverse(`${name} is not found!`));
    return false;
  }

  fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts));
  console.log(
    chalk.green.inverse(`Contact data ${name} successfully deleted!`)
  );
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
