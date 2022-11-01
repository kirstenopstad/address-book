// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address = {};
}

// Add new address to Contact 
Contact.prototype.addAddress = function(newAddress) {
  address.addressId = this.assignId();
  this.address[addressId] = newAddress;
}

// contact.id = this.assignId();
// this.contacts[contact.id] = contact;

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
};

// Business Logic for Address ---------
// Create new address
function Address(addressLabel, address) {
  this.addressLabel = addressLabel;
  this.address = address;
  this.addressId = 0;
}

Address.prototype.assignId = function() {
  this.addressId += 1;
  return addressId;
}

//function Address (workAddress, homeAddress){
  //this.workAddress = workAddress;
  //.homeAddress = homeAddress;
//}

// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    li.append(contact.fullName());
    li.setAttribute("id", contact.id);
    ul.append(li);
  });
  contactsDiv.append(ul);
}

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.querySelector(".first-name").innerText = contact.firstName;
  document.querySelector(".last-name").innerText = contact.lastName;
  document.querySelector(".phone-number").innerText = contact.phoneNumber;
  document.querySelector(".email").innerText = contact.email;
  document.querySelector(".address1").innerText = contact.address.addressLabel + contact.address.address;
  document.querySelector(".address2").innerText = contact.address.addressLabel + contact.address.address;
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
}

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
  const inputtedEmail = document.querySelector("input#new-email").value;
  // Multiple Addresses input gathering
  const inputtedAddressType1 = document.querySelector("input#new-address-type1").value;
  const inputtedAddress1 = document.querySelector("input#new-address1").value;
  const inputtedAddressType2 = document.querySelector("input#new-address-type2").value;
  const inputtedAddress2 = document.querySelector("input#new-address2").value;
  let newAddress1 = new Address(inputtedAddressType1, inputtedAddress1);
  let newAddress2 = new Address(inputtedAddressType2, inputtedAddress2);
  // Make new contact
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail);
  // Add addresses to contact
  newContact.addAddress(newAddress1);
  newContact.addAddress(newAddress2);
  // Add contact to address book
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
  document.querySelector("input#new-email").value = null;
  document.querySelector("input#new-address-type1").value = null;
  document.querySelector("input#new-address1").value = null;
  document.querySelector("input#new-address-type2").value = null;
  document.querySelector("input#new-address2").value = null;
}

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});