let selectRows = [];
let currentModal;
let n = 0;
let tbl = [];
let forms = document.getElementsByClassName('eva-form');
for (const div of forms) {                                          
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
async function showTable(showTbl, hide, col, data) {
    console.log('>>showTable()...'); 

    //console.log('table: ' + showTbl); 

    showTbl.innerHTML='';
   
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
    } else {       
        //return;
    }
  
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
  
    if (data) {
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
    } else {
        console.log('data: '+data)
        return;   
    }
}
getModal = (modalForm) => {
    let options =  { focus: true };
    currentModal = new bootstrap.Modal(modalForm, options);  
    
    return currentModal.show();   
}
function logout() {
    console.log('>>Logout()...');
    let mode = content.getAttribute('data-mode');
    console.log(mode);   
}
/////////////////////////////////////////////////////////////////////////////
const inputStatus   = document.getElementById('status');
const btnConfigSave = document.getElementById('btn-config-save');
const content       = document.querySelector('.content');
//Get/post on Server///////////////////////////////////////////////////////////
async function postOnServer(data, link) {
    console.log('>>postOnServer()...');
    let res;
    try {
        let response = await fetch(link, {
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
async function getOnServer(link) {
    console.log('>>getOnServer()...');
    let res;
    try{
        let response = await fetch(link);
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;
}
//////////////////////////////////////////////////////////////////////////////
async function selectUser() {
    console.log('>>selectUser...');           

    let data = await getOnServer('/getusers');

    const inputUserName = document.getElementById('input-username');

    //console.log(inputUserName);  

    for (let rows of data) {
        
        if (rows['Show']) {
            let option = document.createElement('option');
            option.value = rows['Name'];
            option.text  = rows['Name'];

            inputUserName.appendChild(option);
        }        
    }    
}
async function showUserTable() {
    
    let data = await getOnServer('/getusers');   

    const col  = { 'id':'Id', 'Name':'Name', 'Descr':'Descr', 'Role':'Role', 'email':'E-mail', 'Show':'Show', 'EAuth':'EAuth' };  
    const hide = ['id'];  

    await showTable(tbl[1], hide, col, data);

}
async function userCreate() {
    console.log('>>userCreate...');
    
    const input_form        = document.getElementById('create-user-form');  
    const createMode = input_form.getAttribute("create-mode");  
    const input_username    = document.getElementById('input-user-name');
    const input_password    = document.getElementById('input-password');
    const input_confirmpass = document.getElementById('input-confirmpass');
    const input_descr       = document.getElementById('input-descr');
    const input_eauth       = document.getElementById('input-eauth');
    const input_show        = document.getElementById('input-show');
    const input_role        = document.getElementById('input-role');

    if (input_password.value !== input_confirmpass.value) alert('Incorrect password confirmation!');
    if (!input_username.value) alert('User name is not filled in!');

    const data =  {
        'id'      : input_form.getAttribute("eva-id"),
        'Name'    : input_username.value,
        'Descr'   : input_descr.value,
        'Password': input_password.value,
        'RoleId'  : input_role.getAttribute("eva-id"),
        'EAuth'   : input_eauth.value,
        'Show'    : input_show.value
    };
    
    let result;
    console.log('createMode: '+createMode);
    if (createMode==='true') {
        try {
            result = await postOnServer(data, '/createuser')
            console.log('create: '+result);        
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
        result = await postOnServer(data, '/updateuser');
        console.log('create: '+result);          
        } catch (e) {
        console.log(e);
        }
    }
    if (result) await showUserTable();

}
async function userCreateModal() {
    console.log('>>userCreateModal()...');     

    const inputLabel        = document.getElementById("userModalLabel");
    inputLabel.innerText = 'Add user:';      
    const input_form        = document.getElementById('create-user-form');  
    input_form.setAttribute("create-mode",true);   
}
async function userEditModal() {
    console.log('>>userEditModal...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      
    
    const inputLabel        = document.getElementById("userModalLabel");
    const input_form        = document.getElementById('create-user-form');  
    const input_name        = document.getElementById('input-user-name');  
    const input_descr       = document.getElementById('input-descr');    
    const input_email       = document.getElementById('input-email');    
    const input_role        = document.getElementById('input-role');           
    const input_password    = document.getElementById('input-password');    
    const input_confirmpass = document.getElementById('input-confirmpass'); 
    const input_show        = document.getElementById('input-show');
    const input_eauth       = document.getElementById('input-eauth');

    input_form.setAttribute("create-mode",false);    
    inputLabel.innerText = 'Edit user:';

    let data = { 'id': row.cells[0].innerText};

    let res = await postOnServer(data,'/getuser');
  
    if (res) {
       
        input_form.setAttribute("eva-id", res[0].id);
        input_name.value        = res[0].Name;
        input_descr.value       = res[0].Descr;   
        input_email.value       = res[0].email;   
        input_role.value        = res[0].Role;           
        input_role.setAttribute("eva-id", res[0].RoleId);
        input_password.value    = '';   
        input_confirmpass.value = '';    
        input_show.checked        = res[0].Show;  
        input_eauth.checked       = res[0].EAuth;       
    }         

}
async function userDelete() {
    console.log('>>userDelete...');
    let result;
    for (const row of selectRows){

        let data = {'id': row.cells[0].innerText};

        result = await postOnServer(data,'/deluser');        
    }

    if(result) await showUserTable();
}
/////////////////////////////////////////////////////////////////////////////
async function showRoleTable() {
    
    let data = await getOnServer('/getroles');   

    console.log(data);

    const col  = { 'id':'Id', 'Name':'Name' };  
    const hide = ['id'];  

    await showTable(tbl[2], hide, col, data);

}
async function roleCreate() {
    console.log('>>roleCreate...');

    const input_rolename    = document.getElementById('input-rolename')
    
    if (!input_rolename.value) alert('The name is not filled in!');

    const data =  {
        'Name'    : input_rolename.value,
    };
    
    let result;
    try {
        result = await postOnServer(data,'/createrole')
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await showRoleTable();

}
async function userEditRole() {
  console.log('>>userEditRole...'); 

  let modalForm = document.getElementById("editUserRoleModal");

  currentModal = getModal(modalForm);

  let data = await getOnServer('/getroles');  

  const col = {'id':'Id', 'Name':'Name'};  
  const hide = ['id'];
  
  await showTable(tbl[3], hide, col, data);
 
}
async function roleSelect() {
  console.log('>>roleSelect...'); 

  if (selectRows.length === 0) return;

  const row = selectRows[0];  

  const input_role        = document.getElementById('input-role');   
  const input_edit_role   = document.getElementById('input-edit-role');   

  input_role.value        = row.cells[1].innerText;
  input_role.setAttribute("eva-id", row.cells[0].innerText);
  input_edit_role.value   = row.cells[1].innerText;
  input_edit_role.setAttribute("eva-id", row.cells[0].innerText);

  await currentModal.hide();
           
}
async function roleDelete() {
    console.log('>>roleDelete...');
    let result;
    for (const row of selectRows){

        let data = {'id': row.cells[0].innerText};

        result = await postOnServer(data,'/delrole');        
    }

    if(result) await showRoleTable();
}
/////////////////////////////////////////////////////////////////////////////
async function showConfigTable() {
    console.log('>>showConfigTable...');

    const logged = content.getAttribute("data-logged");
    console.log('logged:' + logged);
    const mode = content.getAttribute("data-mode");
 
    if (logged==='false') return;
    if (mode==='false') return;
    
    let tmp  = await getOnServer('/getconfig');     
    let data = [];

    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = await JSON.parse(strJson);

        if (row.state===0||row.state===1) {
            data.push(Object.assign({'id':row.id}, Elements));
        }
    }

    const col  = { 'id':'Id', 'typeId':'Type',  'textId': 'Identifier'};  
    const hide = ['id'];  

    await showTable(tbl[0], hide, col, data);

    inputStatus.value = '>>Ready...';

}
async function configCreate() {
    console.log('>>configCreate()...');

    const input_type   = document.getElementById('input-type');
    const input_textId = document.getElementById('input-textId');    
    const input_subsystem  = document.getElementById('input-subsystem');    
    
    if (!input_textId.value) alert('Error: Impty ID!');
    
    let tmp = { 
        typeId: input_type.value, 
        textId: input_textId.value,
        subsysId: input_subsystem.getAttribute("eva-id"),
        subsysName: input_subsystem.value
    };        

    const data =  {'data': JSON.stringify(tmp)};
    
    let result;
    try {
        result = await postOnServer(data,'/createconf')
        //console.log(result);        
    } catch (e) {
        console.log(e);
    }

    if (result) await showConfigTable();
    //btnConfigSave.removeAttribute("disabled");
    btnConfigSave.style.backgroundColor = 'red';

}
async function objectEditModal() {
    console.log('>>objectEditModal...'); 
  
    if (selectRows.length === 0) return;

    const modalForm = document.getElementById("objectModal");

    currentModal = getModal(modalForm);
  
    const row = await selectRows[0];  

    const objectModalLabel = document.getElementById('objectModalLabel');  
    objectModalLabel.innerText = 'Edit object';

    const input_form      = document.getElementById('create-object-form');  
    const input_type      = document.getElementById('input-type');
    input_type.setAttribute("disabled","disabled");
    const input_textId    = document.getElementById('input-textId');   
    const input_subsystem = document.getElementById('input-subsystem');   
    const subsystemBtn    = document.getElementById("subsystemBtn");

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
        input_subsystem.value   = Elements.subsysName;
        input_subsystem.setAttribute("eva-id", Elements.subsysId);
        console.log(Elements.typeId);
        if (Elements.typeId==='Subsystem'||Elements.typeId==='Constant') {            
            input_subsystem.setAttribute("disabled","disabled"); 
            subsystemBtn.setAttribute("disabled","disabled"); 
        } else {
            input_subsystem.removeAttribute ("disabled"); 
            subsystemBtn.removeAttribute("disabled"); 
        }
    }         

}
async function objectEdit() {
    console.log('>>configEdit...'); 

    // let modalForm = document.getElementById("objectEditModal");

    // currentModal = await getModal(modalForm);
      
    const input_form   = document.getElementById('object-edit-form');  
    const input_type   = document.getElementById('input-edit-type');
    const input_textId = document.getElementById('input-edit-textId');   
    const input_subsystem = document.getElementById('input-edit-subsystem');  

    let tmp = { 
        typeId: input_type.value, 
        textId: input_textId.value,
        subsysId: input_subsystem.getAttribute("eva-id"),
        subsysName: input_subsystem.value
    };        

    const data =  {
        'id'      : input_form.getAttribute("eva-id"),
        'data'    : JSON.stringify(tmp),
    };
  
    //console.log(data);

    let result;
    try {
      result = await postOnServer(data,'/editobject');    
    } catch (e) {
      console.log(e);
    }
        
    await currentModal.hide();

    //if (result) {      
      await showConfigTable();     
    //}
    btnConfigSave.style.backgroundColor = 'red';
}
async function configDelete() {
    console.log('>>configDelete()...');
    let result;
    for (const row of selectRows){

        let data = {'id': row.cells[0].innerText};

        result = await postOnServer(data,'/delconf');        
    }

    if(result) await showConfigTable();

    btnConfigSave.style.backgroundColor = 'red';
}
async function updateConfig() {
    console.log('>>updateConfig...');
    inputStatus.value = '>> Update config in DB...';

    let tmp  = await getOnServer('/getconfig');     
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

    result = postOnServer(data, '/updateconf');

    btnConfigSave.style.backgroundColor = '#282c34';

    //if(result) 
    await showConfigTable();

    inputStatus.value = '>> Config update completed!';
       
}
/////////////////////////////////////////////////////////////////////////////
async function showSubsystemsTable() {
    console.log('>>showSubsystemsTable...');

    let data = await getOnServer('/subsystems');  
  
    const col = {'id':'Id', 'name':'Name', 'display':'Display subsystem'};  
    const hide = ['id'];
    
    await showTable(tbl[4], hide, col, data);

}
async function subsystemSelect() {
    console.log('>>selectSubsystem...');
    inputStatus.value = '>> Select subsystem...';

    if (selectRows.length === 0) return;

    const row = selectRows[0];  
  
    const inputSubsystem     = document.getElementById('input-subsystem');       
    const inputEditSubsystem = document.getElementById('input-edit-subsystem');  
  
    inputSubsystem.value  = row.cells[1].innerText;
    inputSubsystem.setAttribute("eva-id", row.cells[0].innerText);
    inputEditSubsystem.value  = row.cells[1].innerText;
    inputEditSubsystem.setAttribute("eva-id", row.cells[0].innerText);
  
    await currentModal.hide();
}
async function objectEditSubsystem() {

    let modalForm = document.getElementById("editSubsystemModal");

    currentModal = getModal(modalForm);
  
    await showSubsystemsTable();

}

window.onload = async function() {
    try {
        const logged = content.getAttribute("data-logged");
        if (logged==='true') return;
        await selectUser();                
    } catch(e) {
        console.log(e);
    }
}

document.addEventListener('DOMContentLoaded', showConfigTable());