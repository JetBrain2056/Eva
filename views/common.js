let select_rows = [];
let data = {};

const user_tbl = document.getElementById('user_table');
if (user_tbl) {user_tbl.addEventListener('click', row_select)}

function row_select(e) {      
  console.log("row_select"); 
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
async function user_table() {
  console.log("user_table"); 
  return data = await getUsers();
  //show_user_table(data)  
  //let result=  await show_user_table(data)
  //console.log(result);
  //user_tbl.Show;   
}
 async function show_user_table() {
  console.log("show_user_table"); 
  let data = await getUsers();
  user_tbl.innerHTML = "";

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
    const p = {id:rows.id, Name:rows.Name, Descr:rows.Descr};
    for (const element of Object.keys(p) ) {                                 
      const td = document.createElement('td');    
      tr.appendChild(td);                    
      td.textContent = p[element];   
    }    
  }    
  //user_tbl.Show;   
  console.log(new Date()); 
}
/////////////////////////////////////////////////////////////////////////////

async function getUsers() {
  console.log("getUsers"); 
  let res;
  try{
    const response = await fetch('/users'); 
    res = await response.json();
  } catch (err) {
    console.log(err)
  }
  return res;
}

async function create_user(user) {
  console.log("create_user", user); 
  let res;
  try {
    let response = await fetch('/create', { 
      method  : 'post',  
      headers : { "Content-type": "application/x-www-form-urlencoded; charset=UTF-8" },       
      //headers: {"Content-Type": "application/json"},
      //body: JSON.stringify(user)
      body: new URLSearchParams(user),
      //body    : 'Name=test&Descr=test' 
    });
    res = await response.json();
  } catch(ex) {
    console.log(ex);
  }
  return res;
}   
async function user_create() {
  console.log("user_create"); 

  const input_username    = document.getElementById('input-username');
  const input_password    = document.getElementById('input-password');
  const input_confirmpass = document.getElementById('input-confirmpass'); 
  const input_descr       = document.getElementById('input-descr');
  const input_eauth       = document.getElementById('input-eauth');

  if (input_password.value !== input_confirmpass.value) {
    alert("Не верное подтверждение пароля!"); 
    return "";
  }

  if (!input_username.value) {alert("Не заполнено имя пользователя!"); return "";}
  
  const user =  {
      'Name'    : input_username.value,
      'Descr'   : input_descr.value,
      'Password': input_password.value,
      'RolesID' : '1',
      'EAuth'   : input_eauth.value,
      'Show'    : '1'
  };
  console.log(user);
 
  try {
    let result = await create_user(user)
    console.log(result); 

    if (result) {
      // let data = await getUsers();    
      // console.log(data);
      // show_user_table(data);
      setTimeout(async () => {
        await show_user_table();
      }, 100);
    }
  } catch (e) {
    console.log(e);
  }
}
async function delete_user(user){
  console.log("delete_user", user);
  let res;
  try {
    let response = await fetch('/delete', { 
      method  : 'post',  
      //headers : {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},        
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(user)
      //body: new URLSearchParams(user),
      //body    : 'id=13' 
    });
    res = await response.json();
  } catch (ex) {
    console.log(ex);
  }
  return res;
}
async function user_delete() {

  let result = {};
  for (const row of select_rows){
    
    console.log(row.cells[0].innerText);

    const user = { 'id': row.cells[0].innerText};

    result = await delete_user(user);
    console.log(result);
  }

  if(result){
    setTimeout(async () => {
      await show_user_table()
    },100);
    console.log('user_table');
  }
}
window.onload = () => { 
  show_user_table();
}         