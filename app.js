const yargs = require('yargs');
const contacts = require('./contacts');

yargs
  .command({
    command: 'add',
    describe: 'Insert new contact',
    builder: {
      name: {
        describe: 'Full name',
        demandOption: true,
        type: 'string',
      },
      email: {
        describe: 'Email',
        demandOption: false,
        type: 'string',
      },
      phone: {
        describe: 'Phone number',
        demandOption: true,
        type: 'string',
      },
    },
    handler(argv) {
      contacts.saveContact(argv.name, argv.email, argv.phone);
    },
  })
  .demandCommand();

// show a list of all contact names and phone numbers
yargs.command({
  command: 'list',
  describe: 'Display all names and cell phone numbers',
  handler() {
    contacts.listContact();
  },
});

// show contacts details
yargs.command({
  command: 'detail',
  describe: 'Show contact details by name',
  builder: {
    name: {
      describe: 'Full name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.detailContact(argv.name);
  },
});

// delete contacts by name
yargs.command({
  command: 'delete',
  describe: 'Delete contact by name',
  builder: {
    name: {
      describe: 'Full name',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    contacts.deleteContact(argv.name);
  },
});

yargs.parse();
