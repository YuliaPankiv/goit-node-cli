const { program } = require("commander");
const contacts = require("./contacts.js");
const readline = require("readline");
require("colors");

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.on("line", (text) => {
//   console.log(text);
// });

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();
const options = program.opts();
// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      return console.table(await contacts.listContacts());
      break;

    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.log(newContact);
      break;

    case "update":
      const updateContact = await contacts.updateById(id, {
        name,
        email,
        phone,
      });

      return console.log(updateContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      return console.log(removeContact);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(options);

// const arr = hideBin(process.argv);
// const { argv } = yargs(arr)
// console.log(process.argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "add",  name:'JuliaP', email:'pankiulia@gmail.com',phone:'0983757392' });
// invokeAction({ action: "update", id: "drsAJ4SHPYqZeG-83QTVW", name:'Julia', email:'pankiulia@gmail.com',phone:'0983757392' });
// invokeAction({ action: "remove", id: "_MnEyRcHL22dk-PvwLNg"});
