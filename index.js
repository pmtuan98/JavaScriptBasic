
var readLineSync = require('readline-sync');
var fs = require('fs');

// Funtion Menu() to display menu of contact with options
function Menu(){
console.log('======= SIMPLE CONTACT ======');
console.log('1.Show all contacts');
console.log('2.Add new contact');
console.log('3.Edit contact');
console.log('4.Delete contact');
console.log('5.Search contact');
console.log('6.Exit');
console.log('Enter your choice: ');
var option = readLineSync.question('> ');
	switch(option){
		case '1':
			showAllContact();
			Menu();
			break;
		case '2':
			addNewContact();
			Menu();
			break;
		case '3':
			editContact();
			Menu();
			break;
		case '4':
			deleteContact();
			Menu();
			break;
		case '5':
			searchContact();
			Menu();
			break;
		case '6':
			break;	
		default :
			console.log('Wrong option');
			Menu();
			break;
	}
}

var contacts = [];
function loadData(){
	var dataContact = fs.readFileSync('./data.json');
	contacts = JSON.parse(dataContact);
}


function showAllContact(){
	console.log('********* LIST OF CONTACT ********');
	for(var contact of contacts){

		console.log(contact.No, contact.Name, contact.Phone);
	}
}

function addNewContact(){
	var number = readLineSync.question('No: ');
	var name = readLineSync.question('Name: ');
	var phone = readLineSync.question('Phone: ');
	var contact = {
		No : parseInt(number),
		Name : name,
		Phone : parseInt(phone) 
	}
	contacts.push(contact);
	console.log('**** Added successfully! ****');
	var data  = JSON.stringify(contacts);
	fs.writeFileSync('./data.json', data, {encoding: 'utf8'});
}

function editContact(){
	showAllContact();
	var option = readLineSync.question('Choose contact number: ');
	var newContact = contacts[option-1];
	console.log(newContact);
	newNumber = readLineSync.question('No: ');
	newName = readLineSync.question('Name: ');
	newPhone = readLineSync.question('Phone: ');
	var contact = {
		No : parseInt(newNumber),
		Name : newName,
		Phone : parseInt(newPhone) 
	}
	contacts.splice(contacts.indexOf(newContact),1,contact);
	console.log('**** Edited successfully! ****');
	var data  = JSON.stringify(contacts);
	fs.writeFileSync('./data.json', data, {encoding: 'utf8'});

}
function deleteContact(){
	showAllContact();
	console.log('Choose contact number you want to delete: ')
	var number = readLineSync.question('> ');
	var newContacts = contacts.splice(number-1,1);
	console.log('**** Deleted successfully! ****');
	var data = JSON.stringify(newContacts);
	fs.writeFileSync('./data.json',data, {encoding: 'utf8'});
}


function searchContact(){
	var search = readLineSync.question('Input search keyword: ');
		for(var contact of contacts){
			if(search ===contact.Name){
				console.log(contact.No, contact.Name, contact.Phone);
			}else{
				console.log('Not found');
			}
	}	

}

function main(){
	loadData();
	Menu();
};
main();