let select_rows = [];
let n = 0;
let tbl = [];
let forms = document.getElementsByClassName('eva-form');
for (const div of forms) {                            
    // div.setAttribute("style", "overflow-y: scroll;");           
    div.setAttribute("style", "height: calc(100vh - 171px); overflow-y: scroll;");               
    tbl[n] = document.createElement('table');
    tbl[n].setAttribute("class", "table table-striped table-hover table-sm table-responsive");              
    div.appendChild(tbl[n]); 
    n = n + 1;
}

function row_select(e) {
    console.log('row_select');

    const path = e.path || (e.composedPath && e.composedPath());
    const row  = path[1];

    if (row.cells[0].nodeName  === 'TH') {
        
        const tBody = e.currentTarget.tBodies[0];
        const rows = Array.from(tBody.rows);
        
        let reverse = 1;
        
        const cellIndex = e.target.cellIndex;                
                    
        if (e.target.getAttribute("sort-attr") === "desc" ) {
          reverse = -1;
          e.target.setAttribute("sort-attr", "asc");
        } else {
          reverse = 1;
          e.target.setAttribute("sort-attr", "desc");        
        }
        
        rows.sort((tr1, tr2) => {    
          const tr1Text = tr1.cells[cellIndex].textContent;
          const tr2Text = tr2.cells[cellIndex].textContent;       
          return reverse * (tr1Text.localeCompare(tr2Text));
        });
    
        tBody.append(...rows);

        for (cell of row.cells) {
            cell.style.color = 'black';
        }
        e.target.style.color = 'aquamarine';

    } else {
        let text;
        if (e.ctrlKey) {
            text = 'The CTRL key was pressed!';
            select_rows.push(row);
            row.style.background = 'aquamarine';
            console.log('select_rows count: ', select_rows.length);
        } else {
            text = 'The CTRL key was NOT pressed!';
            for (const rows of select_rows) {
                rows.style.background = '';
            }
            select_rows.splice(0, select_rows.length);
            row.style.background = 'aquamarine';
            select_rows.push(row);
        }
        console.log(text);
    }
}
async function show_table(show_tbl , hide, col, data) {
    console.log('show_table'); 
  
    if (show_tbl) show_tbl.addEventListener('click', row_select);

    show_tbl.innerHTML = '';
  
    const thead = document.createElement('thead');
    thead.style.position = 'sticky';  
    thead.style.top      = '0px';
    thead.style.border   = '#00ff92';
    thead.style.background = 'White';  
    show_tbl.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    show_tbl.appendChild(tbody);
  
    const tr = document.createElement('tr'); 
    thead.appendChild(tr);
    
    for (const e of Object.keys(col)) {             
      const th = document.createElement('th');    
      th.setAttribute("sort-attr", "");                        
      for (const h of hide) {   
        if (e===h)     
        th.style.display = "none";        
      }
      tr.appendChild(th);        
      th.textContent = col[e];      
    }       
  
    for (const rows of data) {                  
      const tr = document.createElement('tr');
      tbody.appendChild(tr);             
      for (let p of Object.keys(col)) {            
        const td = document.createElement('td');    
        tr.appendChild(td);              
        td.textContent = rows[p];    
        for (const h of hide) {   
            if (p===h)     
            td.style.display = "none";        
        }
      }
    }   
}
/////////////////////////////////////////////////////////////////////////////
async function show_user_table() {
    
    let data = await getUsers();   

    const col  = { 'id':'Id', 'Name':'Name', 'Descr':'Descr', 'email':'E-mail', 'Show':'Show',  'EAuth':'EAuth' };  
    const hide = ['id'];  

    await show_table(tbl[0], hide, col, data);

}
async function getUsers() {
    console.log('getUsers');
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
    console.log('create_user', user);
    let res;
    try {
        let response = await fetch('/create', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        res = await response.json();
    } catch(err) {
        console.log(err);
    }
    return res;
}
async function user_create() {
    console.log('user_create');

    const input_username    = document.getElementById('input-username');
    const input_password    = document.getElementById('input-password');
    const input_confirmpass = document.getElementById('input-confirmpass');
    const input_descr       = document.getElementById('input-descr');
    const input_eauth       = document.getElementById('input-eauth');

    if (input_password.value !== input_confirmpass.value) alert('Неверное подтверждение пароля!');
    if (!input_username.value) alert('Не заполнено имя пользователя!');

    const data =  {
        'Name'    : input_username.value,
        'Descr'   : input_descr.value,
        'Password': input_password.value,
        'RoleId'  : '1',
        'EAuth'   : input_eauth.value,
        'Show'    : '1'
    };
    //console.log(data);

    try {
        let result = await create_user(data)
        console.log(result);

        if (result) await show_user_table();
    } catch (e) {
        console.log(e);
    }
}
async function edit_user(obj) {
    console.log('edit_user', obj); 
  
    let data =  {   
        'id'      : obj.id,   
        'name'    : obj.name,
        'descr'   : obj.descr
      };   
  
    let res;
    try {
      let response = await fetch('/updateuser', { 
          method  : 'post',    
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)            
        });  
        res = await response.json();                      
    } catch (e) {
      console.log(e);
    }

    return res;
}
async function user_edit_modal() {
    console.log('user_modal'); 
  
    const row = select_rows[0];  
  
    const input_name        = document.getElementById('input-edit-username');  
    const input_descr       = document.getElementById('input-edit-descr');    
    const input_email       = document.getElementById('input-edit-email');    
    const input_password    = document.getElementById('input-edit-password');    
    const input_confirmpass = document.getElementById('input-edit-confirmpass'); 
    const input_eauth       =  document.getElementById('input-edit-eauth');
  
    input_name.value  = row.cells[1].innerText;
    input_descr.value = row.cells[2].innerText;   
    input_email.value = '';   
    input_password.value    = '';   
    input_confirmpass.value = '';                
    input_eauth.value       = '';                

}
async function user_edit() {
    console.log('user_edit'); 
  
    const row = select_rows[0];  
  
    const input_name        = document.getElementById('input-edit-username');  
    const input_descr       = document.getElementById('input-edit-descr');     
    //const input_email       = document.getElementById('input-edit-email');    
    //const input_password    = document.getElementById('input-edit-password');    
    //const input_confirmpass = document.getElementById('input-edit-confirmpass'); 
    //const input_eauth       =  document.getElementById('input-edit-eauth');   
    
    const data =  {
        'id'      : row.cells[0].innerText,
        'name'    : input_name.value,
        'descr'   : input_descr.value
    };
  
    let result;
    try {
      result = await edit_user(data)     
    } catch (e) {
      console.log(e);
    }
    //if (result) {      
      await show_user_table();     
    //}
}
async function delete_user(user){
    console.log('delete_user', user);
    let res;
    try {
        let response = await fetch('/delete', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        });
        res = await response.json();
    } catch (err) {
        console.log(err);
    }
    return res;
}
async function user_delete() {
    console.log('user_delete');
    let result = {};
    for (const row of select_rows){

        console.log(row.cells[0].innerText);

        const user = {'id': row.cells[0].innerText};

        result = await delete_user(user);
        console.log(result);
    }

    if(result) await show_user_table();
}
async function getUsersRoles() {
    console.log('getUsersRoles...');
    let res;
    try{
        const response = await fetch('/roles');
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;
}
let currentModal;
async function user_edit_role() {
  console.log('>>user_edit_role...'); 

  let editUserRoleModal = document.getElementById("editUserRoleModal");
  let options =  {
    focus: true
  };

  currentModal = new bootstrap.Modal(editUserRoleModal, options);
  currentModal.show();

  let data = await getUsersRoles();  

  const col = {'id':'Id', 'Name':'Name'};  
  const hide = ['id'];
  
  await show_table(tbl[1], hide, col, data);
 
}
async function role_select() {
  console.log('>>role_select...'); 

  const row = select_rows[0];  

  const input_roleId      = document.getElementById('input-roleId');   
  const input_role        = document.getElementById('input-role');   
  const input_edit_roleId = document.getElementById('input-edit-roleId');   
  const input_edit_role   = document.getElementById('input-edit-role');   


  input_roleId.value      = row.cells[0].innerText;
  input_role.value        = row.cells[1].innerText;
  input_edit_roleId.value = row.cells[0].innerText;  
  input_edit_role.value   = row.cells[1].innerText;

  currentModal.hide();
           
}

window.onload = async () => {
    await show_user_table();
}