// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.emails = [],
  this.emailId = 0
}

Contact.prototype.assignEmailId = function() {
  this.emailId += 1;
  return this.emailId;
}

Contact.prototype.addEmailAddress = function(newEmail){
  newEmail.emailId = this.assignEmailId();
  this.emails.push(newEmail);
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

Contact.prototype.findEmail = function(id) {
  for (var i=0; i< this.emails.length; i++) {
    if (this.emails[i]) {
      if (this.emails[i].emailId == id) {
        return this.emails[i];
      }
    }
  };
  return false;
}

Contact.prototype.deleteEmail = function(id) {
  for (var i=0; i< this.emails.length; i++) {
    if (this.emails[i]) {
      if (this.emails[i].emailId == id) {
        delete this.emails[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for Emails ---------
function Email(emailType, emailAddress) {
  this.emailType = emailType;
  this.emailAddress = emailAddress;

}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function displayEmails(contact){
  var emailList = $("ul#emails");
  var htmlForEmails = "";
  contact.emails.forEach(function(email){
    htmlForEmails += "<li>" + email.emailType + ": " + email.emailAddress + "</li>";
  });
  emailList.html(htmlForEmails);
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  displayEmails(contact);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='addEmailButton' id='Email" + contact.id + "'>Add Email</button><br><br><input type='text' class='form-control' id='newEmailType'><input type='text' class='form-control' id='new-email'><br>");
  buttons.append("<button class='deleteButton' id=" + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
  $("#buttons").on("click", ".addEmailButton", function() {
    var id = parseInt(this.id.substring(5,this.id.length));
    var newEmailAddress = $("#new-email").val().trim();
    var newEmailType = $("#newEmailType").val().trim();

    if (newEmailAddress !== "" && newEmailType !== ""){
      var newEmail = new Email(newEmailType, newEmailAddress);
      addressBook.findContact(id).addEmailAddress(newEmail);
      showContact(id);
    };
  });
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmailAddress = $("input#new-email-address").val();
    var inputtedEmailType = $("input#new-email-type").val();
    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email-address").val("");
    $("input#new-email-type").val("");
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber);
    var newEmail = new Email(inputtedEmailType, inputtedEmailAddress);
    newContact.addEmailAddress(newEmail);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
