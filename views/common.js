//const { controller }  = require('../src/public/controller.js');
//const { User }     = require('../src/models/models.js');

const user_table = () => {
  //const response = await fetch('http://192.168.1.8:3000/users');
  //const data = await response.json();
  
  fetch('/users')    
    .then(res => res.json())
    .then(data => {

      //console.log(data[0]);

      const table = document.getElementById('user_table');
      
      table.innerHTML = "";

      const thead = document.createElement('thead');
      table.appendChild(thead);

      let tr = document.createElement('tr');
      thead.appendChild(tr);

      const th1 = document.createElement('th');
      const th2 = document.createElement('th');
      const th3 = document.createElement('th');
      const th4 = document.createElement('th');

      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);

      const text1 = document.createTextNode('#');
      const text2 = document.createTextNode('id');
      const text3 = document.createTextNode('Name');
      const text4 = document.createTextNode('Descr');

      th1.appendChild(text1);
      th2.appendChild(text2);
      th3.appendChild(text3);
      th4.appendChild(text4);

      const tbody = document.createElement("tbody");
      table.appendChild(tbody);
      
      for (let i = 0; i < data.length; i++) {
        tr = document.createElement("tr");
        tbody.appendChild(tr);

        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
  
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        //console.log(data[i].id);  
        //console.log(data[i].Name);  

        const n     = document.createTextNode(i+1);
        const id    = document.createTextNode(data[i].id);
        const Name  = document.createTextNode(data[i].Name);
        const Descr = document.createTextNode(data[i].Descr);

        td1.appendChild(n);
        td2.appendChild(id);
        td3.appendChild(Name);                          
        td4.appendChild(Descr);    
      }        
  });
}
function user_create()  {
  var input_username = document.getElementById('input-username');
  //var input_password = document.getElementById('input-password');
  var input_descr    = document.getElementById('input-descr');
  
  let user =  {'Name'    : input_username.value,
               'Descr'   : input_descr.value,
               'RolesID' : '1',
               'EAuth'   : '1',
               'Show'    : '1'
  };
 
  console.log(user);

  fetch('/create', { 
    method  : 'post',  
    headers : {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},       
    //headers: {"Content-Type": "application/json"},
    //body: JSON.stringify(user)
    body: new URLSearchParams(user),
    //body    : 'Name=test&Descr=test' 
  })
  .then(res => res.json())  
  .then(data => {  
    console.log('Request succeeded with JSON response', data);  
  })  
  .catch(error => {
    console.log('Request failed', error);
  });      

  user_table(); 
}
function user_delete() {

}
function row_select(evn) { 
  //var table = document.getElementById('user_table');    
  console.log(evn);
}  