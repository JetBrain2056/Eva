let selectRows = [];
let currentModal;
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

function rowSelect(e) {
    console.log('>>rowSelect...');

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
            selectRows.push(row);
            row.style.background = 'aquamarine';
            console.log('select_rows count: ', selectRows.length);
        } else {
            text = 'The CTRL key was NOT pressed!';
            for (const rows of selectRows) {
                rows.style.background = '';
            }
            selectRows.splice(0, selectRows.length);
            row.style.background = 'aquamarine';
            selectRows.push(row);
        }
        console.log(text);
    }
}
async function showTable(showTbl , hide, col, data) {
    console.log('>>showTable...'); 
  
    if (showTbl) {
        showTbl.addEventListener('click', rowSelect);
  
        showTbl.addEventListener('dblclick',  (e) => {
          
          if (e.target.nodeName  === 'TH') {
            return;
          } else {
            const currentForm = e.currentTarget.parentNode.parentNode;
              
            const modalTrigger = currentForm.getElementsByClassName('eva-edit');
            if (modalTrigger[0]) {
              modalTrigger[0].click();
            }
          }
        });
    }

    showTbl.innerHTML = '';
  
    const thead = document.createElement('thead');
    thead.style.position = 'sticky';  
    thead.style.top      = '0px';
    thead.style.border   = '#00ff92';
    thead.style.background = 'White';  
    showTbl.appendChild(thead);
  
    const tbody = document.createElement('tbody');
    showTbl.appendChild(tbody);
  
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
function getModal(modalForm) {
    let options =  { focus: false };
    currentModal = new bootstrap.Modal(modalForm, options); 
    return currentModal.show();   
}
/////////////////////////////////////////////////////////////////////////////
const inputUserName = document.getElementById('input-username');
const inputStatus   = document.getElementById('status');
const btnConfigSave = document.getElementById('btn-config-save');

async function selectUser() {
               
    let data = await getUsers();    
    for (let rows of data) {
        
        let option = document.createElement('option');
        option.value = rows['Name'];
        option.text  = rows['Name'];
        inputUserName.appendChild(option);
        
    }
}
async function showUserTable() {
    
    let data = await getUsers();   

    const col  = { 'id':'Id', 'Name':'Name', 'Descr':'Descr', 'Role':'Role','email':'E-mail', 'Show':'Show',  'EAuth':'EAuth' };  
    const hide = ['id'];  

    await showTable(tbl[1], hide, col, data);

}
async function getUsers() {
    console.log('>>getUsers...');
    let res;
    try{
        const response = await fetch('/users');
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;
}
async function createUser(data) {
    console.log('>>createUser...');
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
async function userCreate() {
    console.log('>>userCreate...');

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
        result = await createUser(data)
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await showUserTable();

}
async function editUser(data) {
    console.log('>>editUser...'); 
  
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
async function userEditModal() {
    console.log('>>userEditModal...'); 
  
    if (selectRows.length === 0) return;

    let modalForm = document.getElementById("userEditModal");
    currentModal = getModal(modalForm);

    const row = await selectRows[0];      
          
    const input_form        = document.getElementById('user-edit-form');  
    const input_name        = document.getElementById('input-edit-username');  
    const input_descr       = document.getElementById('input-edit-descr');    
    const input_email       = document.getElementById('input-edit-email');    
    const input_role        = document.getElementById('input-edit-role');           
    const input_password    = document.getElementById('input-edit-password');    
    const input_confirmpass = document.getElementById('input-edit-confirmpass'); 
    const input_show        = document.getElementById('input-edit-show');
    const input_eauth       = document.getElementById('input-edit-eauth');

    let data = { 'id': row.cells[0].innerText};

    let res;
    try {    
        let response = await fetch('/getuser', {
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
async function userEdit() {
    console.log('>>userEdit...'); 
      
    const input_form        = document.getElementById('user-edit-form');  
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
        'EAuth'       : input_eauth.checked,
        'Show'        : input_show.checked,
        'RoleId'      : input_role.getAttribute("eva-id")
    };
  
    // console.log(data);

    let result;
    try {
      result = await editUser(data)     
    } catch (e) {
      console.log(e);
    }

    currentModal.hide();

    //if (result) {      
      await showUserTable();     
    //}
}
async function deleteUser(data) {
    console.log('>>deleteUser...');
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
async function userDelete() {
    console.log('>>userDelete...');
    let result;
    for (const row of selectRows){

        let data = {'id': row.cells[0].innerText};

        result = await deleteUser(data);        
    }

    if(result) await showUserTable();
}
/////////////////////////////////////////////////////////////////////////////
async function showRoleTable() {
    
    let data = await getUsersRoles();   

    console.log(data);

    const col  = { 'id':'Id', 'Name':'Name' };  
    const hide = ['id'];  

    await showTable(tbl[2], hide, col, data);

}
async function getUsersRoles() {
    console.log('>>getUsersRoles...');
    let res;
    try{
        const response = await fetch('/roles');
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;
}
async function createRole(data) {
    console.log('>>createRole...');
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
async function roleCreate() {
    console.log('>>roleCreate...');

    const input_rolename    = document.getElementById('input-rolename')
    
    if (!input_rolename.value) alert('Не заполнено наименование!');

    const data =  {
        'Name'    : input_rolename.value,
    };
    
    let result;
    try {
        result = await createRole(data)
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await showRoleTable();

}
async function userEditRole() {
  console.log('>>userEditRole...'); 

  let modalForm = document.getElementById("editUserRoleModal");

  currentModal = await getModal(modalForm);
  currentModal.show();

  let data = await getUsersRoles();  

  const col = {'id':'Id', 'Name':'Name'};  
  const hide = ['id'];
  
  await showTable(tbl[3], hide, col, data);
 
}
async function roleSelect() {
  console.log('>>roleSelect...'); 

  const row = selectRows[0];  

  const input_role        = document.getElementById('input-role');   
  const input_edit_role   = document.getElementById('input-edit-role');   

  input_role.value        = row.cells[1].innerText;
  input_role.setAttribute("eva-id", row.cells[0].innerText);
  input_edit_role.value   = row.cells[1].innerText;
  input_edit_role.setAttribute("eva-id", row.cells[0].innerText);

  currentModal.hide();
           
}
async function deleteRole(data) {
    console.log('>>deleteRole...');
    let res;
    try {
        let response = await fetch('/delrole', {
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
async function roleDelete() {
    console.log('>>roleDelete...');
    let result;
    for (const row of selectRows){

        let data = {'id': row.cells[0].innerText};

        result = await deleteRole(data);        
    }

    if(result) await showRoleTable();
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
async function showConfigTable() {
    
    let tmp  = await getConfig();     
    let data = [];

    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = await JSON.parse(strJson);
        
        data.push(Object.assign({'id':row.id}, Elements));
    }

    const col  = { 'id':'Id', 'typeId':'Type',  'textId': 'Identifier'};  
    const hide = [];  

    await showTable(tbl[0], hide, col, data);

}
async function createConfig(data) {
    console.log('>>createConfig...');
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
async function configCreate() {
    console.log('>>configCreate...');

    const input_type   = document.getElementById('input-type');
    const input_textId = document.getElementById('input-textId');    
    
    if (!input_textId.value) alert('Не заполнен идентификатор!');
    
    let tmp = {typeId:input_type.value, textId:input_textId.value};        

    const data =  {
        'data'    : JSON.stringify(tmp),
    };
    
    let result;
    try {
        result = await createConfig(data)
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await showConfigTable();
    btnConfigSave.style.backgroundColor = 'red';

}
async function editObject(data) {
    console.log('>>editObject...'); 

    inputStatus.value = '>>Edit object...';
  
    let res;
    try {
      let response = await fetch('/editobject', { 
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
async function objectEditModal() {
    console.log('>>objectEditModal...'); 
  
    if (selectRows.length === 0) return;

    let modalForm = document.getElementById("objectEditModal");

    currentModal = getModal(modalForm);
  
    const row = await selectRows[0];  
          
    const input_form   = document.getElementById('object-edit-form');  
    const input_type   = document.getElementById('input-edit-type');
    const input_textId = document.getElementById('input-edit-textId');    

    let data = { 'id': row.cells[0].innerText };

    console.log(data);

    let res;
    try {    
        let response = await fetch('/getobject', {
            method  : 'post',    
            headers : {'Content-Type': 'application/json'},
            body    : JSON.stringify(data)            
        });  
        res = await response.json();  
        console.log(res);          
    } catch (err) {
      console.log(err);
    }
  
    if (res) {

        let strJson = res[0].data;          
        let Elements = await JSON.parse(strJson);        

        input_form.setAttribute("eva-id", res[0].id);
        input_type.value        = Elements.typeId;
        input_textId.value      = Elements.textId;
      
    }         

}
async function objectEdit() {
    console.log('>>configEdit...'); 
      
    const input_form   = document.getElementById('object-edit-form');  
    const input_type   = document.getElementById('input-edit-type');
    const input_textId = document.getElementById('input-edit-textId');   

    let tmp = { typeId:input_type.value, textId:input_textId.value };        

    const data =  {
        'id'      : input_form.getAttribute("eva-id"),
        'data'    : JSON.stringify(tmp),
    };
  
    console.log(data);

    let result;
    try {
      result = await editObject(data);    
    } catch (e) {
      console.log(e);
    }

    currentModal.hide();

    //if (result) {      
      await showConfigTable();     
    //}
    btnConfigSave.style.backgroundColor = 'red';
}
async function deleteConfig(data) {
    console.log('>>deleteConfig...');
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
async function configDelete() {
    console.log('>>configDelete...');
    let result;
    for (const row of selectRows){

        let data = {'id': row.cells[0].innerText};

        result = await deleteConfig(data);        
    }

    if(result) await showConfigTable();

    btnConfigSave.style.backgroundColor = 'red';
}
async function updateConfig() {
    console.log('>>updateConfig...');
    inputStatus.value = '>> Update config in DB...';

    let tmp  = await getConfig();     
    let data = [];

    for (const row of tmp) {
        console.log(row.state);
        if (row.state===1||row.state===2) {
            let strJson = row.data; 
            let Elements = await JSON.parse(strJson);
            console.log(Elements);
            
            data.push(Object.assign({'id':row.id, 'state':row.state}, Elements));
        }
    }

    let res;
    try {
        let response = await fetch('/updateconf', {
            method  : 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        //res = await response.json();        
        btnConfigSave.style.backgroundColor = '#282c34';
        inputStatus.value = '>> Config update completed!';
    } catch(err) {
        console.log(err);
    }

    //if(result) 
    await showConfigTable();
   
    // return res;
}

window.onload = async function() {
    await selectUser();
    await showConfigTable();
    inputStatus.value = '>>Ready...';
}