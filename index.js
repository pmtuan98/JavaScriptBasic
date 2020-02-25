
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


// Function loadData() load data from created file name
// 'data.json'
var contacts = [];
function loadData(){
	var dataContact = fs.readFileSync('./data.json');
	contacts = JSON.parse(dataContact);
}

// Function showAllContact() shows all contact from 
// file 'data.json'
function showAllContact(){
	console.log('********* LIST OF CONTACT ********');
	var new_contacts = contacts.sort(function(a,b){
		return a.No - b.No;
	})
	for(var contact of new_contacts){
		console.log(contact.No, contact.Name, contact.Phone);
	}
}

//Function check empty input
function checkBlank(mess){
	while(true) {
		var input = readLineSync.question(mess);
		if(input.trim() === ''){
			console.log('Can not be blanked');
		}else { 
			return input;
		}
	}
	
}


// Function addNewContact() add new contact to 
// file 'data.json'
function addNewContact(){
	
	var number = checkBlank('No: ');
		for(var i of contacts){
		while(number == i.No){
			console.log('Duplicated. Re-input');
			number = checkBlank('No: ');
		}
	  }

	var name = checkBlank('Name: ');
	var phone = checkBlank('Phone: ');
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

// Function editContact() choose contact want to edited,
// edit it and save
function editContact(){
	showAllContact();
	var option = readLineSync.question('Choose contact number: ');
	for(var i of contacts){
		while(i.No !== option){
			console.log('Number is not exist');
		}
	}
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
	/*Phan edit phai check xem input nhap vao co ton tai hay khong
		Khong ton tai se thong bao
		Ton tai moi duoc edit*/

}

// Function deleteContact() choose contact 
// and delete it
function deleteContact(){
	showAllContact();
	console.log('Choose contact number you want to delete: ')
	var number = readLineSync.question('> ');
	var newContacts = contacts.splice(number-1,1);
	console.log('**** Deleted successfully! ****');
	var data = JSON.stringify(newContacts);
	fs.writeFileSync('./data.json',data, {encoding: 'utf8'});
	/*Check xem input nguoi dung nhap vao co hay khong*/
}

// Function searchContact() to find contact
// with input keyword
function searchContact(){
	var search = readLineSync.question('Input search keyword: ');
		for(var contact of contacts){
			if(search === contact.Name){
				console.log(contact.No, contact.Name, contact.Phone);
			}else{
				console.log('Not found');
			}
	}

	/*Can bo sung them search 1 phan*/	

}

function main(){
	loadData();
	Menu();
};
main();