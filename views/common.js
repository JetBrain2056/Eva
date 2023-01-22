
let select_rows = [];

const user_tbl = document.getElementById('user_table');
user_tbl.addEventListener('click', row_select);   

const user_table = () => {
  //const response = await fetch('http://192.168.1.8:3000/users');
  //const data = await response.json();
  
  fetch('/users')    
    .then(res => res.json())
    .then(data => {
      
      user_tbl.innerHTML = "";

      const thead = document.createElement('thead');
      user_tbl.appendChild(thead);

      const tr = document.createElement('tr');
      thead.appendChild(tr);

      const h = {col1:'id',col2:'Name',col3:'Descr'};
      for (element of Object.keys(h)) {      
        const th = document.createElement('th');                
        tr.appendChild(th);        
        th.textContent = h[element];                                  
      };

      const tbody = document.createElement("tbody");
      user_tbl.appendChild(tbody);
      
      for (const rows of data) {      
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        console.log(rows);

        const p = {id:rows.id, Name:rows.Name, Descr:rows.Descr};
        for (const element of Object.keys(p) ) {        
          const td = document.createElement('td');                   
          tr.appendChild(td);                    
          td.textContent = p[element];   
        };
      };     
    });
}
function user_create()  {
  const input_username = document.getElementById('input-username');
  const input_password = document.getElementById('input-password');
  const input_descr    = document.getElementById('input-descr');
  const input_eauth    = document.getElementById('input-eauth');

  if (input_username.value === "")
  {alert("Не заполнено имя пользователя!"); return "";}
  
  const user =  { 'Name'    : input_username.value,
                  'Descr'   : input_descr.value,
                  'Password': input_password.value,
                  'RolesID' : '1',
                  'EAuth'   : input_eauth.value,
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
function row_select(event) {      

    console.log(event.path[1]);                
    console.log(event.target);      

    if (event.ctrlKey) {
      text = "The CTRL key was pressed!";
      select_rows.push(event.path[1]);
      event.path[1].style.background = "aquamarine";  
      console.log("select_rows count: ",select_rows.length);  
    } else {
      text = "The CTRL key was NOT pressed!";     
      for (const rows of select_rows){
        rows.style.background = "";       
       }      
      select_rows.splice(0,select_rows.length);
      event.path[1].style.background = "aquamarine";  
      select_rows.push(event.path[1]);
    }
    console.log(text);
}  

user_table();