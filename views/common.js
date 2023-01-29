let select_rows = [];

const user_tbl = document.getElementById('user_table');
user_tbl.addEventListener('click', row_select); 

function row_select(e) {      
  //console.log(e.path[1]);                
  //console.log(e.target);

  const path = e.path || (e.composedPath && e.composedPath());
  const row  = path[1];
  //console.log(row.cells[0].innerText);
  //console.log(row.cells[0].nodeName );
  
  //if (row.cells[0].innerText === 'id') { return;
  if (row.cells[0].nodeName  === "TH" ){ 
    console.log(row.cells[0].parentNode.parentNode);
    //for (const table of allTables) {
      const tBody = user_tbl.tBodies[0];
      const rows = Array.from(tBody.rows);
      const headerCells = row.cells;
    
      for (const th of headerCells) {
        const cellIndex = th.cellIndex;
    
        th.addEventListener("click", () => {
          rows.sort((tr1, tr2) => {
            const tr1Text = tr1.cells[cellIndex].textContent;
            const tr2Text = tr2.cells[cellIndex].textContent;
            return tr1Text.localeCompare(tr2Text);
          });
    
          tBody.append(...rows);
        });
      }
    //return;
  }else{
      let text;
      if (e.ctrlKey) {
          text = "The CTRL key was pressed!";
          select_rows.push(row);
          row.style.background = "aquamarine";
          console.log("select_rows count: ", select_rows.length);
      } else {
          text = "The CTRL key was NOT pressed!";
          for (const rows of select_rows) {
              rows.style.background = "";
          }
          select_rows.splice(0, select_rows.length);
          row.style.background = "aquamarine";
          select_rows.push(row);
      }
      console.log(text);
  }
}
/////////////////////////////////////////////////////////////////////////////
async function user_table() {
  //const response = await fetch('http://192.168.1.8:3000/users');
  //const data = await response.json();
  
  user_tbl.innerHTML = "";

  fetch('/users')    
    .then(res => res.json())
    .then(data => {

      const thead = document.createElement('thead');
      thead.style.border = '#00ff92';
      user_tbl.appendChild(thead);

      const tbody = document.createElement('tbody');
      user_tbl.appendChild(tbody);

      const tr = document.createElement('tr');
      thead.appendChild(tr);

      const h = {col1:'id',col2:'Name',col3:'Descr'};
      for (const element of Object.keys(h)) {
        const th = document.createElement('th');                
        tr.appendChild(th);        
        th.textContent = h[element];                                  
      }   

      // let i =0;
      //  while (i < 30) {     
      //   data.push({'id':'.'}); 
      //   i++;
      //  }
      
      for (const rows of data) {      
        const tr = document.createElement("tr");
        tbody.appendChild(tr);

        //console.log(rows);

        const p = {id:rows.id, Name:rows.Name, Descr:rows.Descr};
        for (const element of Object.keys(p) ) {        
          const td = document.createElement('td');                   
          tr.appendChild(td);                    
          td.textContent = p[element];   
        }    
      }
             
    });
}
async function user_create() {

  user_table();
  
  const input_username = document.getElementById('input-username');
  const input_password = document.getElementById('input-password');
  const input_confirmpass = document.getElementById('input-confirmpass'); 
  const input_descr    = document.getElementById('input-descr');
  const input_eauth    = document.getElementById('input-eauth');

  if (input_password.value !== input_confirmpass.value) alert("Неверное подтверждение пароля!");

  if (!input_username.value) alert("Не заполнено имя пользователя!");
  
  const user =  {
      'Name'    : input_username.value,
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
    user_table();
  })  
  .catch(error => {
    console.log('Request failed', error);
  });        
}
async function user_delete() {

  user_table();

  for (const row of select_rows){
    
      console.log(row.cells[0].innerText);
  
      const user = { 'id': row.cells[0].innerText};

      fetch('/delete', { 
        method  : 'post',  
        headers : {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},        
        //headers: {"Content-Type": "application/json"},
        //body: JSON.stringify(user)
        body: new URLSearchParams(user),
        //body    : 'id=13' 
        })
        .then(res => res.json())  
        .then(data => {  
          console.log('Request succeeded with JSON response', data);            
          user_table();
        })  
        .catch(error => {
          console.log('Request failed', error);
      });          
  }    
}
user_table();