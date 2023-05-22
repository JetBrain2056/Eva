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
let input_username = document.getElementById('input-username');

async function select_user() {
               
    let data = await getUsers();    
    for(let rows of data) {
        
        let option = document.createElement('option');
        option.value = rows['Name'];
        option.text  = rows['Name'];
        input_username.appendChild(option);
        
    }
}
async function show_user_table() {
    
    let data = await getUsers();   

    const col  = { 'id':'Id', 'Name':'Name', 'Descr':'Descr', 'Role':'Role','email':'E-mail', 'Show':'Show',  'EAuth':'EAuth' };  
    const hide = ['id'];  

    await show_table(tbl[1], hide, col, data);

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
async function create_user(data) {
    console.log('>>create_user...');
    let res;
    try {
        let response = await fetch('/createuser', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        res = await response.json();
    } catch(err) {
        console.log(err);
    }
    return res;
}
async function user_create() {
    console.log('>>user_create...');

    const input_username    = document.getElementById('input-username');
    const input_password    = document.getElementById('input-password');
    const input_confirmpass = document.getElementById('input-confirmpass');
    const input_descr       = document.getElementById('input-descr');
    const input_eauth       = document.getElementById('input-eauth');
    const input_show        = document.getElementById('input-show');
    const input_role        = document.getElementById('input-role');

    if (input_password.value !== input_confirmpass.value) alert('Неверное подтверждение пароля!');
    if (!input_username.value) alert('Не заполнено имя пользователя!');

    const data =  {
        'Name'    : input_username.value,
        'Descr'   : input_descr.value,
        'Password': input_password.value,
        'RoleId'  : input_role.getAttribute("eva-id"),
        'EAuth'   : input_eauth.value,
        'Show'    : input_show.value
    };
    
    let result;
    try {
        result = await create_user(data)
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await show_user_table();

}
async function edit_user(data) {
    console.log('>>edit_user..'); 
  
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
          
    const input_form        = document.getElementById('create-user-form');  
    const input_name        = document.getElementById('input-edit-username');  
    const input_descr       = document.getElementById('input-edit-descr');    
    const input_email       = document.getElementById('input-edit-email');    
    const input_role        = document.getElementById('input-edit-role');           
    const input_password    = document.getElementById('input-edit-password');    
    const input_confirmpass = document.getElementById('input-edit-confirmpass'); 
    const input_show        = document.getElementById('input-edit-show');
    const input_eauth       = document.getElementById('input-edit-eauth');

    let data = { 'id': row.cells[0].innerText };

    let res;
    try {    
        let response = await fetch('/getone', {
            method  : 'post',    
            headers : {'Content-Type': 'application/json'},
            body    : JSON.stringify(data)            
        });  
        res = await response.json();     
       
    } catch (err) {
      console.log(err);
    }
  
    if (res) {
       
        input_form.setAttribute("eva-id", res[0].id);
        input_name.value        = res[0].Name;
        input_descr.value       = res[0].Descr;   
        input_email.value       = res[0].email;   
        input_role.value        = res[0].Role;           
        input_role.setAttribute("eva-id", res[0].RoleId);
        input_password.value    = '';   
        input_confirmpass.value = '';                
        input_show.value        = res[0].Show;  
        input_eauth.value       = res[0].EAuth;       
    }         

}
async function user_edit() {
    console.log('user_edit'); 
      
    const input_form        = document.getElementById('create-user-form');  
    const input_name        = document.getElementById('input-edit-username');  
    const input_descr       = document.getElementById('input-edit-descr');     
    const input_email       = document.getElementById('input-edit-email');    
    const input_password    = document.getElementById('input-edit-password');    
    const input_confirmpass = document.getElementById('input-edit-confirmpass'); 
    const input_eauth       = document.getElementById('input-edit-eauth');   
    const input_show        = document.getElementById('input-edit-show');   
    const input_role        = document.getElementById('input-edit-role'); 

    if (!input_password.value === input_confirmpass.value) return;
    
    const data =  {
        'id'          : input_form.getAttribute("eva-id"),
        'Name'        : input_name.value,
        'Descr'       : input_descr.value,
        'email'       : input_email.value,
        'Password'    : input_password.value,
        'EAuth'       : input_eauth.value,
        'Show'        : input_show.value,
        'RoleId'      : input_role.getAttribute("eva-id")
    };
  
    console.log(data);

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
async function delete_user(data) {
    console.log('>>delete_user...');
    let res;
    try {
        let response = await fetch('/deluser', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        res = await response.json();
    } catch (err) {
        console.log(err);
    }
    return res;
}
async function user_delete() {
    console.log('>>user_delete...');
    let result;
    for (const row of select_rows){

        let data = {'id': row.cells[0].innerText};

        result = await delete_user(data);        
    }

    if(result) await show_user_table();
}
/////////////////////////////////////////////////////////////////////////////
async function show_role_table() {
    
    let data = await getUsersRoles();   

    const col  = { 'id':'Id', 'Name':'Name' };  
    const hide = ['id'];  

    await show_table(tbl[2], hide, col, data);

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
async function create_role(data) {
    console.log('>>create_role...');
    let res;
    try {
        let response = await fetch('/createrole', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        res = await response.json();
    } catch(err) {
        console.log(err);
    }
    return res;
}
async function role_create() {
    console.log('>>role_create...');

    const input_rolename    = document.getElementById('input-rolename')
    
    if (!input_rolename.value) alert('Не заполнено наименование!');

    const data =  {
        'Name'    : input_rolename.value,
    };
    
    let result;
    try {
        result = await create_role(data)
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await show_role_table();

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
  
  await show_table(tbl[3], hide, col, data);
 
}
async function role_select() {
  console.log('>>role_select...'); 

  const row = select_rows[0];  

  const input_role        = document.getElementById('input-role');   
  const input_edit_role   = document.getElementById('input-edit-role');   

  input_role.value        = row.cells[1].innerText;
  input_role.setAttribute("eva-id", row.cells[0].innerText);
  input_edit_role.value   = row.cells[1].innerText;
  input_edit_role.setAttribute("eva-id", row.cells[0].innerText);

  currentModal.hide();
           
}
/////////////////////////////////////////////////////////////////////////////
async function getConfig() {
    console.log('>>getConfig...');
    let res;
    try{
        const response = await fetch('/config');
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;
}
async function show_config_table() {
    
    let data = await getConfig();   

    const col  = { 'id':'Id', 'data':'Data' };  
    const hide = [];  

    await show_table(tbl[0], hide, col, data);

}
async function create_config(data) {
    console.log('>>create_config...');
    let res;
    try {
        let response = await fetch('/createconf', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        res = await response.json();
    } catch(err) {
        console.log(err);
    }
    return res;
}
async function config_create() {
    console.log('>>config_create...');

    const input_data    = document.getElementById('input-data')
    
    if (!input_data.value) alert('Не заполнены данные!');

    const data =  {
        'data'    : input_data.value,
    };
    
    let result;
    try {
        result = await create_config(data)
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await show_config_table();

}
async function delete_config(data) {
    console.log('>>delete_user...');
    let res;
    try {
        let response = await fetch('/delconf', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        res = await response.json();
    } catch (err) {
        console.log(err);
    }
    return res;
}
async function config_delete() {
    console.log('>>config_delete...');
    let result;
    for (const row of select_rows){

        let data = {'id': row.cells[0].innerText};

        result = await delete_config(data);        
    }

    if(result) await show_config_table();
}

window.onload = async function() {
    await select_user();
    await show_config_table();
}