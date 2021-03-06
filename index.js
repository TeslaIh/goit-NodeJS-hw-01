const { program } = require("commander");
const contactsActions = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contacts = await contactsActions.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contact = await contactsActions.getContactById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await contactsActions.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      const removeContact = await contactsActions.removeContact(id);
      if (!removeContact) {
        throw new Error(`Contact ${id} is not found`);
      }
      console.log("Contact has just been deleted:");
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv).then().catch();