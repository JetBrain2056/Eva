//const { controller }  = require('../src/public/controller.js');
//const { User }     = require('../src/models/models.js');

function user_table() {
  //const response = await fetch('http://192.168.1.8:3000/users');
  //const data = await response.json();
  
  fetch('/users')    
    .then(res => res.json())
    .then(data => {

      console.log(data[0]);

      var table = document.getElementById('user_table');    
      
      table.innerHTML = "";
      
      var thead = document.createElement('thead');   
      table.appendChild(thead);

      var tr = document.createElement('tr');
      thead.appendChild(tr);

      var th1 = document.createElement('th');
      var th2 = document.createElement('th');
      var th3 = document.createElement('th');
      var th4 = document.createElement('th');

      tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);

      var text1 = document.createTextNode('#');
      var text2 = document.createTextNode('id');
      var text3 = document.createTextNode('Name');
      var text4 = document.createTextNode('Descr');      

      th1.appendChild(text1);
      th2.appendChild(text2);
      th3.appendChild(text3);
      th4.appendChild(text4);

      var tbody = document.createElement("tbody");
      table.appendChild(tbody);
      
      for (var i = 0; i < data.length; i++) {
        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');
        var td4 = document.createElement('td');
  
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        //console.log(data[i].id);  
        //console.log(data[i].Name);  

        var n     = document.createTextNode(i+1);          
        var id    = document.createTextNode(data[i].id);
        var Name  = document.createTextNode(data[i].Name);
        var Descr = document.createTextNode(data[i].Descr);

        td1.appendChild(n);
        td2.appendChild(id);
        td3.appendChild(Name);                          
        td4.appendChild(Descr);    
      }        
  });
}