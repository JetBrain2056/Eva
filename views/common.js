const { controller }  = require('../src/public/controller.js');
//const { User }     = require('../src/models/models.js');

function ClientgetUsers() {

    Users = controller.getAll();
    console.log(Users);

    return Users;

}

function user_table() {

    //Users = ClientgetUsers();

    var table = document.getElementById('user_table');         
    
    var thead = document.createElement('thead');   
    table.appendChild(thead);

    var tr = document.createElement('tr');
    thead.appendChild(tr);

    var th1 = document.createElement('th');
    var th2 = document.createElement('th');
    var th3 = document.createElement('th');

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);

    var text1 = document.createTextNode('#');
    var text2 = document.createTextNode('Имя');
    var text3 = document.createTextNode('Фамилия');

    th1.appendChild(text1);
    th2.appendChild(text2);
    th3.appendChild(text3);

    //for (var i = 1; i < 4; i++){    
               
   // } 

   // table.insertAdjacentHTML("beforeend", thead);

  }