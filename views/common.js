let selectRows = [];
let currentModal;
let tabpartModal;
let requisiteModal;
let selectModal;
let $dashboard;
let inputStatus     = document.getElementById('status');
const btnConfigSave = document.getElementById('btn-config-save');
const content       = document.querySelector('.content');
const $objectModal  = document.getElementById("objectModal");

function mainSelect() {
    console.log('>>mainSelect()...');

    const inputType      = $objectModal.querySelector('#input-type');
    const labelConstType = $objectModal.querySelector("label[for=input-const-type]"); 
    const inputConstType = $objectModal.querySelector('#input-const-type');
    const inputTypeBtn   = $objectModal.querySelector('#input-const-type_btn');
    const inputObjectRep = $objectModal.querySelector('#input-object-rep');
    const inputListRep   = $objectModal.querySelector('#input-list-rep');
    const inputSubsystem = $objectModal.querySelector("#input-subsystem");    
    const inputSubsysBtn = $objectModal.querySelector("#input-subsystem_btn");  
    const inputModule    = $objectModal.querySelector("#input-module"); 
    const inputOwner     = $objectModal.querySelector("#input-owner");
    const inputOwnerBtn  = $objectModal.querySelector("#input-owner_btn");
    const navMain        = $objectModal.querySelector("#object-main");
    const navRequisite   = $objectModal.querySelector("#object-requisite");
    const navTabular     = $objectModal.querySelector("#object-tabular");    
    const navForms       = $objectModal.querySelector("#object-forms");   
    const inputHideId    = $objectModal.querySelector("#input-hide-id");
    const labelHideId    = $objectModal.querySelector("label[for=input-hide-id]"); 
    const inputNameLength= $objectModal.querySelector("#input-name-length");
    const labelNameLength= $objectModal.querySelector("label[for=input-name-length]"); 
    
    navMain.click();
    if (inputType.value === "Subsystem"||inputType.value === "") {                     
        inputSubsystem .setAttribute("disabled","disabled");  
        inputSubsysBtn .setAttribute("disabled","disabled");       
        inputModule    .setAttribute("disabled","disabled");
        inputOwner     .setAttribute("disabled","disabled");       
        inputOwnerBtn  .setAttribute("disabled","disabled");   
        navRequisite   .setAttribute("hidden","hidden");        
        navTabular     .setAttribute("hidden","hidden");
        navForms       .setAttribute("hidden","hidden"); 
        labelConstType .setAttribute("hidden","hidden");   
        inputConstType .setAttribute("hidden","hidden");   
        inputTypeBtn   .setAttribute("hidden","hidden");     
        inputObjectRep .removeAttribute("disabled");
        inputListRep   .setAttribute("disabled","disabled");                          
    } else if (inputType.value === "Module"||inputType.value === "Constant") {   
        inputObjectRep.setAttribute("disabled","disabled");   
        inputListRep  .setAttribute("disabled","disabled");                               
        navRequisite  .setAttribute("hidden","hidden");        
        navTabular    .setAttribute("hidden","hidden");
        navForms      .setAttribute("hidden","hidden");         
        inputOwner    .setAttribute("disabled","disabled");       
        inputOwnerBtn .setAttribute("disabled","disabled"); 
        if (inputType.value === "Constant") {           
            labelConstType.removeAttribute("hidden");  
            inputConstType.removeAttribute("hidden");  
            inputTypeBtn  .removeAttribute("hidden");   
            inputModule   .setAttribute("disabled","disabled");     
            inputObjectRep.removeAttribute("disabled");        
        } else {           
            labelConstType.setAttribute("hidden","hidden");   
            inputConstType.setAttribute("hidden","hidden");  
            inputTypeBtn  .setAttribute("hidden","hidden"); 
            inputModule   .removeAttribute("disabled");      
            inputObjectRep.setAttribute("disabled","disabled");                
        }
    } else {        
        inputSubsystem.removeAttribute("disabled");        
        inputSubsysBtn.removeAttribute("disabled");
        if (inputType.value === "Reference") {
            inputOwner     .removeAttribute("disabled");       
            inputOwnerBtn  .removeAttribute("disabled"); 
            inputHideId    .removeAttribute("hidden"); 
            labelHideId    .removeAttribute("hidden"); 
            inputNameLength.removeAttribute("hidden"); 
            labelNameLength.removeAttribute("hidden"); 
        } else {
            inputOwner     .setAttribute("disabled","disabled");       
            inputOwnerBtn  .setAttribute("disabled","disabled"); 
            inputHideId    .setAttribute("hidden","hidden");  
            labelHideId    .setAttribute("hidden","hidden");  
            inputNameLength.setAttribute("hidden","hidden");  
            labelNameLength.setAttribute("hidden","hidden");  
        }
        inputModule   .removeAttribute("disabled");        
        navRequisite  .removeAttribute("hidden");        
        navTabular    .removeAttribute("hidden");        
        navForms      .removeAttribute("hidden");    
        labelConstType.setAttribute("hidden","hidden");   
        inputConstType.setAttribute("hidden","hidden");  
        inputTypeBtn  .setAttribute("hidden","hidden");  
        inputObjectRep.removeAttribute("disabled");  
        inputListRep  .removeAttribute("disabled");    
    }
}
function rowSelect(e) {
    console.log('>>rowSelect()...');

    const path = e.path || (e.composedPath && e.composedPath());
    const row  = path[1];

    // selectRows = [];

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
          const typeAttr = e.target.getAttribute("type-attr");
          if (typeAttr==='integer') {
            const a = Number(tr1Text);
            const b = Number(tr2Text);                      
            return reverse*(a - b);
          } else if (typeAttr==='numeric') {
            const a = Number(tr1Text.replace(/\s/g, "").replace(',','.'));
            const b = Number(tr2Text.replace(/\s/g, "").replace(',','.'));                        
            return reverse*(a - b);
          } else {
            return reverse * (tr1Text.localeCompare(tr2Text));
          }
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
function dblSelect(e) {
    console.log('>>dblSelect()...');

    if (e.target.nodeName  === 'TH') {
        return;
    } else {
        const currentForm = e.currentTarget.parentNode.parentNode;
            
        const btnTrigger = currentForm.querySelector('.eva-edit');
        if (btnTrigger) {
            // console.log('btnTrigger');
            btnTrigger.onclick();         
        }            
    }
}
function addListeners(showTbl) {
    console.log('>>addListeners()...'); 

    if (showTbl) {
        showTbl.addEventListener('click', rowSelect);
        showTbl.addEventListener('dblclick', dblSelect,{once:false});                        
    }
}
async function showTable(showTbl, hide, col, data, colType) {
    console.log('>>showTable()...'); 

    showTbl.innerHTML='';
   
    addListeners(showTbl);

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
    
    let keysCol = Object.keys(col);       
    
    // console.log(keysCol)
    // keysCol.sort(function(a, b) {                                        
    //     return keysCol.indexOf(a) - keysCol.indexOf(b);         
    // });
    // console.log(keysCol)
    for (const e of keysCol) {             
        const th = document.createElement('th');    
        th.setAttribute("sort-attr", "");    
        if (e.split('.').length>1) {                                   
            th.setAttribute("type-attr", e);   
        } else {            
            if (colType) th.setAttribute("type-attr", colType[e]);  
        }
        if (hide.includes(e)) { th.style.display = "none" }
        tr.appendChild(th);        
        th.textContent = col[e];              
    }       
  
    if (data) {
        for (const rows of data) {                  
            const tr = document.createElement('tr');
            tbody.appendChild(tr);             
            for (const p of keysCol) {        
                const td = document.createElement('td');    
                tr.appendChild(td);   
                if (p.split('.').length>1) {
                    ref = await postOnServer({'id':rows[p], 'textId':p.split('.')[1]}, '/getref');                      
                    if (rows[p]===0) {
                        td.textContent = ''; 
                    } else {        
                        if (p.split('.')[0]==='Reference') {
                            if (ref.length>0) td.textContent = ref[0].name;                        
                        } else {
                            if (ref.length>0) {
                                const d = new Date(ref[0].date);
                                td.textContent = p.split('.')[1]+' №'+ref[0].number+' from '+new Intl.DateTimeFormat('ru').format(d);  
                            }
                        }
                    }
                } else {                                   
                    if (colType&&colType[p]==='timestamp with time zone') {     
                        if (rows[p]) {
                            const d = new Date(rows[p]);
                            td.textContent = new Intl.DateTimeFormat('ru').format(d);  
                        } else {
                            td.textContent = '';
                        }                         
                    } else if (colType&&colType[p]==='numeric') {
                        if (rows[p]) { 
                            const minFD = rows[p].split('.')[1].length;
                            td.textContent = new Intl.NumberFormat('ru', {minimumFractionDigits: minFD}).format(rows[p]);
                            td.style.textAlign = 'end';
                        }
                    } else {                        
                        td.textContent = rows[p]; 
                    }
                }                                    
                if (hide.includes(p)) {
                    td.style.display = "none";        
                }
            }
        } 
    } else {
        console.log('data:', data);
        return;   
    }
}
function getModal(modalForm) {
    console.log('>>getModal()...');
    let options =  { focus: true };
    Modal = new bootstrap.Modal(modalForm, options);  
    Modal.show();
    return Modal;
}
function logout() {
    console.log('>>Logout()...');
    let mode = content.getAttribute('data-mode');
    console.log(mode);   
}
async function listUsers() {
    console.log('>>listUsers()...');           

    data = await getOnServer('/getlistusers');

    const inputUserName = document.getElementById('input-username');    

    for (let rows of data) {
        
        if (rows['Show']) {
            let option = document.createElement('option');
            option.value = rows['Name'];
            option.text  = rows['Name'];

            inputUserName.appendChild(option);
        }        
    }    
}
function dateFormat(date) {
    let newDate = new Date(date - (new Date()).getTimezoneOffset() * 60000);
    return newDate.toISOString().slice(0, 19).replace('T', ' ');
}
function buildTabpanel(refForm, indent) {
    console.log('>>buildTabpanel()...');  

    const formTbl = refForm.querySelector(".eva-table");    
    formTbl.innerHTML='';      
        formTbl.setAttribute("style", "height: calc(100vh - "+indent+"px); overflow-y: scroll;");               
        const refTbl = document.createElement('table');
        refTbl.setAttribute("class", "table table-striped table-hover table-sm table-responsive");              
    formTbl.appendChild(refTbl);  

    return refTbl;
}
function tblFilter(name) {
    console.log('>>tblFilter()...');  
    const navConfig = document.getElementById("nav-config");
    const tbl       = navConfig.getElementsByTagName("tr");
    
    for (const row of tbl) {
        // console.log(row.rowIndex);    
        if (row.childNodes[1].innerText+'s' === name||row.rowIndex===0) {            
            row.removeAttribute("hidden"); 
        } else {
            row.setAttribute("hidden", "hidden");
        }
    }    
}
//Get/post on Server//////////////////////////////////////////////////////////
async function postOnServer(data, link) {
    console.log('>>postOnServer()...', link);
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
    console.log('>>getOnServer()...', link);
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
async function showUserTable() {
    console.log('>>showUserTable()...');

    const refForm = document.getElementById("nav-users");

    resTbl = buildTabpanel(refForm, "127");
    
    let data = await getOnServer('/getusers');   

    const col  = { 'id':'Id', 'Name':'Name', 'Descr':'Descr', 'Role':'Role', 'email':'E-mail', 'Show':'Show', 'EAuth':'EAuth' };  
    const hide = ['id'];  

    showTable(resTbl, hide, col, data);

}
async function userCreate(e) {
    console.log('>>userCreate()...');
    
    const input_form        = document.getElementById('create-user-form');  
    const createMode = input_form.getAttribute("create-mode");  
    const input_username    = input_form.querySelector('#input-user-name');
    const input_password    = input_form.querySelector('#input-password');
    const input_confirmpass = input_form.querySelector('#input-confirmpass');
    const input_descr       = input_form.querySelector('#input-descr');
    const input_eauth       = input_form.querySelector('#input-eauth');
    const input_show        = input_form.querySelector('#input-show');
    const input_role        = input_form.querySelector('#input-role');

    if (!input_form.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }

    if (input_password.value !== input_confirmpass.value) alert('Incorrect password confirmation!');    

    const data =  {
        'id'      : input_form.getAttribute("eva-id"),
        'Name'    : input_username.value,
        'Descr'   : input_descr.value,
        'Password': input_password.value,
        'RoleId'  : input_role.getAttribute("eva-id"),
        'EAuth'   : input_eauth.checked,
        'Show'    : input_show.checked
    }
               
    if (createMode==='true') {
        try {
            result = await postOnServer(data, '/createuser')
            console.log('create:', result);        
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            result = await postOnServer(data, '/updateuser');
            console.log('create:',result);          
        } catch (err) {
            console.log(err);
        }
    }
  
    await currentModal.hide();

    if (result) await showUserTable();

}
async function userCreateModal() {
    console.log('>>userCreateModal()...');     

    const modalForm         = document.getElementById('userModal'); 
  
    const inputLabel        = modalForm.querySelector("#userModalLabel");
    inputLabel.innerText    = $dashboard.text_add_user;      
    const input_form        = modalForm.querySelector('#create-user-form'); 
    input_form.reset(); 
    input_form.setAttribute("create-mode",true);            

    currentModal = getModal(modalForm); 
}
async function userEditModal() {
    console.log('>>userEditModal()...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      
   
    const modalForm         = document.getElementById('userModal'); 
   
    const inputLabel        = modalForm.querySelector("#userModalLabel");
    const input_form        = modalForm.querySelector('#create-user-form');   
    const input_name        = input_form.querySelector('#input-user-name');  
    const input_descr       = input_form.querySelector('#input-descr');    
    const input_email       = input_form.querySelector('#input-email');    
    const input_role        = input_form.querySelector('#input-role');           
    const input_password    = input_form.querySelector('#input-password');    
    const input_confirmpass = input_form.querySelector('#input-confirmpass'); 
    const input_show        = input_form.querySelector('#input-show');
    const input_eauth       = input_form.querySelector('#input-eauth');

    input_form.setAttribute("create-mode", false);    
    input_form.reset();
    inputLabel.innerText = $dashboard.text_edit_user;

    let data = { 'id': row.cells[0].innerText }

    let result = await postOnServer(data, '/getuser');    
    if (result) {       
        let elem = result[0];
        input_form.setAttribute("eva-id", elem.id);
        input_name.value        = elem.Name;
        input_descr.value       = elem.Descr;   
        input_email.value       = elem.email;   
        input_role.value        = elem.Role;           
        input_role.setAttribute("eva-id", elem.RoleId);
        input_password.value    = '';   
        input_confirmpass.value = '';                
        input_show.checked      = elem.Show;
        input_eauth.checked     = elem.EAuth; 
        
        currentModal = getModal(modalForm); 
    }   
}
async function userDelete() {
    console.log('>>userDelete()...');
  
    for (const row of selectRows) {

        let data = {'id': row.cells[0].innerText}

        result = await postOnServer(data, '/deluser');        
    }

    if (result) await showUserTable();
}
/////////////////////////////////////////////////////////////////////////////
async function showRoleTable() {
    console.log('>>showRoleTable()...');
    
    const refForm = document.getElementById("nav-roles");

    resTbl = buildTabpanel(refForm, "127");

    let data = await getOnServer('/getroles');   

    const col  = { 'id':'Id', 'Name':'Name' };  
    const hide = ['id'];  

    showTable(resTbl, hide, col, data);

}
async function roleCreateModal() {
    console.log('>>roleCreateModal()...');     

    const modalForm         = document.getElementById('roleModal'); 
  
    const inputLabel        = modalForm.querySelector("#roleModalLabel");
    inputLabel.innerText    = $dashboard.text_add_role;      
    const input_form        = modalForm.querySelector('#create-role-form');  
    input_form.reset(); 
    input_form.setAttribute("create-mode",true);            

    currentModal = getModal(modalForm); 
}
async function roleCreate(e) {
    console.log('>>roleCreate()...');

    const inputRolename    = document.getElementById('input-rolename');

    if (!inputRolename.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }

    const data =  {
        'Name'    : inputRolename.value,
    }
        
    try {
        result = await postOnServer(data,'/createrole')              
    } catch (err) {
        console.log(err);
    }    

    currentModal.hide();    

    if (result) await showRoleTable();

}
async function userEditRole() {
    console.log('>>userEditRole...'); 

    const modalForm = document.getElementById("editUserRoleModal");    

    resTbl = buildTabpanel(modalForm, "300");

    selectModal = getModal(modalForm);

    let data = await getOnServer('/getroles');  

    const col = {'id':'Id', 'Name':'Name'};  
    const hide = ['id'];

    showTable(resTbl, hide, col, data);
 
}
async function roleSelect() {
  console.log('>>roleSelect...'); 

    if (selectRows.length === 0) return;

    const row = selectRows[0];  

    const input_role        = document.getElementById('input-role');    

    input_role.value        = row.cells[1].innerText;
    input_role.setAttribute("eva-id", row.cells[0].innerText);

    await selectModal.hide();
           
}
async function roleDelete() {
    console.log('>>roleDelete...');
    
    for (const row of selectRows) {

        let data = {'id': row.cells[0].innerText};

        result = await postOnServer(data, '/delrole');        
    }

    if (result) await showRoleTable();
}
/////////////////////////////////////////////////////////////////////////////
async function showConfigTable() {
    console.log('>>showConfigTable...');

    const refForm = document.getElementById("nav-config");

    resTbl = buildTabpanel(refForm,"127");
    
    let tmp  = await getOnServer('/getconfig');     
    let data = [];

    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = JSON.parse(strJson);

        if (row.state===0||row.state===1||row.state===3) {
            data.push(Object.assign({'id':row.id}, Elements));
        }
    }

    data.sort(function(a, b) {
        if(a.typeId < b.typeId) { return -1; }
        if(a.typeId > b.typeId) { return 1; }
        return 0;
    });

    const col  = { 'id':'Id', 'typeId':'Type',  'textId': 'Identifier'};  
    const hide = ['id'];  

    showTable(resTbl, hide, col, data);

    inputStatus.value = '>>Ready...';

}
async function objectCreate(e) {
    console.log('>>configCreate()...');

    const inputForm         = document.getElementById('create-object-form'); 
    const input_type        = inputForm.querySelector('#input-type');
    const input_const_type  = inputForm.querySelector('#input-const-type');
    const inputObjRep       = inputForm.querySelector('#input-object-rep'); 
    const inputListRep      = inputForm.querySelector('#input-list-rep'); 
    const input_textId      = inputForm.querySelector('#input-textId');    
    const input_subsystem   = inputForm.querySelector('#input-subsystem');      
    const inputReqId        = document.querySelector('#input-hide-id'); 
    const inputReqName      = document.querySelector('#input-name-length'); 
    const inputOwner        = inputForm.querySelector('#input-owner');  
    const createMode        = inputForm.getAttribute("create-mode");  
    
    if (!inputForm.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }
    
    // resCheck = await postOnServer({'typeId': input_type.value,'textId' : input_textId.value},'/checkobject');    
    // console.log(resCheck);
    // if (resCheck) {
    //     console.log('The identifier is not unique!');          
    // }

    const tmp = { 
        typeId    : input_type.value, 
        textId    : input_textId.value,
        subsysId  : input_subsystem.getAttribute("eva-id"),
        subsysName: input_subsystem.value,
        constType : input_const_type.value,
        objectRep : inputObjRep.value,
        listRep   : inputListRep.value,
        hideId    : inputReqId.checked,
        nameLength: inputReqName.value,
        owner     : inputOwner.value
    }
    const data =  {
        'id'      : inputForm.getAttribute("eva-id"),
        'data'    : JSON.stringify(tmp),
    }
    
    // console.log('createMode:', createMode);
    if (createMode==='true') {
        try {
            result = await postOnServer(data, '/createobject')
            console.log(result);        
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            result = await postOnServer(data, '/editobject')
            console.log(result);        
        } catch (err) {
            console.log(err);
        }
    }

    await currentModal.hide();

    if (result) await showConfigTable();

    btnConfigSave.style.backgroundColor = 'red';
}
async function objectModal() {
    console.log('>>objectModal()...'); 

    const modalForm = document.getElementById("objectModal");

    const objectModalLabel = modalForm.querySelector('#objectModalLabel');  
    objectModalLabel.innerText = $dashboard.text_add_object;    

    const input_form      = modalForm.querySelector('#create-object-form');  
    input_form.reset();   
    input_form.setAttribute("create-mode",true);   

    const input_type      = input_form.querySelector('#input-type');
    input_type.removeAttribute("disabled");

    const input_subsystem = input_form.querySelector('#input-subsystem');  
    input_subsystem.removeAttribute("disabled");     

    const navReq = modalForm.querySelector("#nav-requisite");
    const evaTbl = navReq.querySelector(".eva-table");
    evaTbl.innerHTML = '';

    const navTab    = modalForm.querySelector("#nav-tabpart");    
    const evaTabTbl = navTab.querySelector(".eva-table");
    evaTabTbl.innerHTML = '';

    currentModal = getModal(modalForm);

    mainSelect();

}
async function objectEditModal() {
    console.log('>>objectEditModal()...'); 
  
    if (selectRows.length === 0) return;

    const modalForm = document.getElementById("objectModal");
  
    const row = await selectRows[0];  

    const objectModalLabel = modalForm.querySelector('#objectModalLabel');  
    objectModalLabel.innerText = $dashboard.text_edit_object;  

    const inputForm      = modalForm.querySelector('#create-object-form');  
    inputForm.reset();  
    inputForm.setAttribute("create-mode",false);   

    const input_type      = inputForm.querySelector('#input-type');
    input_type.setAttribute("disabled","disabled");    
    const input_textId    = inputForm.querySelector('#input-textId');   
    const input_subsystem = inputForm.querySelector('#input-subsystem');  
    const inputConstType  = inputForm.querySelector('#input-const-type'); 
    const inputObjRep     = inputForm.querySelector('#input-object-rep'); 
    const inputListRep    = inputForm.querySelector('#input-list-rep'); 
    const inputReqId      = modalForm.querySelector('#input-hide-id'); 
    const inputReqName    = modalForm.querySelector('#input-name-length'); 
    const inputOwner      = inputForm.querySelector('#input-owner');  

    let data = {'id': row.cells[0].innerText}

    res = await postOnServer(data,'/getobject');
    if (res) {
        const strJson  = res.data;          
        const Elements = await JSON.parse(strJson);        

        inputForm.setAttribute("eva-id", res.id);
        
        if (Elements.typeId === "Constant") {                
            const option = document.createElement('option');
            option.value = Elements.constType;
            option.text  = Elements.constType;
            option.setAttribute("selected","selected"); 
            inputConstType.appendChild(option);          
            inputConstType.setAttribute("eva-id", row.cells[0].innerText);
        } else if (Elements.typeId === "Reference") {            
            if (Elements.hideId)     {inputReqId.checked      = Elements.hideId;}
            if (Elements.nameLength) {inputReqName.value      = Elements.nameLength;}
            inputObjRep.value       = Elements.objectRep;
            inputListRep.value      = Elements.listRep;
            if (Elements.owner)      {inputOwner.value        = Elements.owner;}
        } else if (Elements.typeId === "Document") {                        
            inputObjRep.value       = Elements.objectRep;
            inputListRep.value      = Elements.listRep;   
            inputOwner.value        = "";           
        } else {
            inputObjRep.value       = "";
            inputListRep.value      = "";
            inputOwner.value        = "";  
        } 
        input_type.value        = Elements.typeId;        
        input_textId.value      = Elements.textId;                    
        input_subsystem.value   = Elements.subsysName;
        input_subsystem.setAttribute("eva-id", Elements.subsysId);
           
    }    

    currentModal = getModal(modalForm);

    mainSelect();

    await showRequisiteTable();
    await showTabPartTable();
}
async function objectDelete() {
    console.log('>>objectDelete()...');
    
    for (const row of selectRows) {
        const data = {'id': row.cells[0].innerText}
        result = await postOnServer(data,'/delobject');        
    }

    if (result) await showConfigTable();

    btnConfigSave.style.backgroundColor = 'red';
}
async function updateConfig() {
    console.log('>>updateConfig()...');
    inputStatus.value = '>> Update config in DB...';
  
    result = await postOnServer({}, '/updateconf');

    console.log(result);
    if (result===1) { 
        await showConfigTable();        
        btnConfigSave.style.backgroundColor = '#282c34';
        inputStatus.value = '>> Config update completed!';
    } else {
        inputStatus.value = '>> Config update error!!!';
    }
       
}
function openModule() {
    console.log('>>openModule()...'); 

    const modalForm = document.getElementById("moduleModal");

    const modalLabel = modalForm.querySelector('#moduleModalLabel');  
    modalLabel.innerText = 'Edit module:';

    const textArea      = modalForm.querySelector('#editor');     
    // console.log(textArea);
    // textArea.value = '';
    //inputForm.setAttribute("create-mode",true);   

    currentModal['module'] = getModal(modalForm);

}
async function showTypeTable(modalForm) {
    console.log('>>showTypeTable()...');

    resTbl = buildTabpanel(modalForm, "300");

    let tmp  = await getOnServer('/getconfig');     
    let data = [];

    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = JSON.parse(strJson);

        if (row.state===0&&(Elements.typeId==='Reference'||Elements.typeId==='Document')) {
            data.push(Object.assign({'id':row.id}, Elements));
        }
    }

    data.sort(function(a, b) {
        if(a.typeId < b.typeId) { return -1; }
        if(a.typeId > b.typeId) { return 1; }
        return 0;
    });

    const col  = { 'id':'Id', 'typeId':'Type',  'textId': 'Identifier'};  
    const hide = ['id'];  
    
    showTable(resTbl, hide, col, data);

}
async function typeSelect() {
    console.log('>>typeSelect()...');

    if (selectRows.length === 0) return;

    const row = selectRows[0];  

    const modalForm = document.getElementById("selectTypeModal");

    const id = modalForm.getAttribute("eva-id");         
    const inputElement = document.querySelector("#"+id);    
    const value = row.cells[1].innerText+'.'+row.cells[2].innerText;
    
    const elem = inputElement.querySelector("option[value='"+value+"']");    
    if (!elem) {
        const option = document.createElement('option');
        option.value = value;
        option.text  = value;
        option.setAttribute("selected","selected"); 
        inputElement.appendChild(option);
    }

    const inputReqId = document.querySelector("#input-req-id");
    inputReqId.value = value;
    inputReqId.setAttribute("disabled","disabled");   
  
    inputElement.setAttribute("eva-id", row.cells[0].innerText);
  
    await selectModal.hide();
}
function changeType() {

    const inputForm    = document.querySelector("#create-req-form");   
    const inputReqType = inputForm.querySelector("#input-req-type");
    const inputReqLen  = inputForm.querySelector("#input-req-length");  
    const inputReqLAcc = inputForm.querySelector("#input-req-accuracy");      
    if (inputReqType.value==='Number') {
        inputReqLen.removeAttribute("disabled");
        inputReqLAcc.removeAttribute("disabled");
        inputReqLen.setAttribute("min",0);
        inputReqLen.setAttribute("max",32);
    } else if (inputReqType.value==='String') {
        inputReqLen.removeAttribute("disabled");
        inputReqLAcc.value = 0;
        inputReqLAcc.setAttribute("disabled", "disabled");
        inputReqLen.removeAttribute("min");
        inputReqLen.removeAttribute("max");
    } else {
        inputReqLen.value = 0;
        inputReqLen.setAttribute("disabled", "disabled");
        inputReqLAcc.value = 0;
        inputReqLAcc.setAttribute("disabled", "disabled");
    }    
}
async function selectType(id) {
    console.log('>>selectType()...'); 

    const modalForm = document.getElementById("selectTypeModal");
    modalForm.setAttribute("eva-id", id.split('_')[0]);

    selectModal = getModal(modalForm);

    await showTypeTable(modalForm);
}
async function ownerSelect() {
    console.log('>>ownerSelect()...');

    if (selectRows.length === 0) return;

    const row = selectRows[0];  

    const modalForm = document.getElementById("selectOwnerModal");

    const id = modalForm.getAttribute("eva-id");         
    const inputElement = document.querySelector("#"+id);    
    const value = row.cells[1].innerText+'.'+row.cells[2].innerText;
    
    const inputOwner = document.querySelector("#input-owner");
    inputOwner.value = value;
    // inputOwner.setAttribute("disabled","disabled");   
  
    inputElement.setAttribute("eva-id", row.cells[0].innerText);
  
    await selectModal.hide();
}
async function selectOwner(id) {
    console.log('>>selectOwner()...'); 

    const modalForm = document.getElementById("selectOwnerModal");
    modalForm.setAttribute("eva-id", id.split('_')[0]);

    selectModal = getModal(modalForm);

    await showTypeTable(modalForm);
}
/////////////////////////////////////////////////////////////////////////////
async function showSubsystemsTable() {
    console.log('>>showSubsystemsTable()...');

    const modalForm = document.getElementById("editSubsystemModal");

    resTbl = buildTabpanel(modalForm, "300");

    let data = await getOnServer('/subsystems');  
  
    const col = {'id':'Id', 'name':'Name', 'display':'Display subsystem'};  
    const hide = ['id'];
    
    showTable(resTbl, hide, col, data);

}
async function subsystemSelect() {
    console.log('>>selectSubsystem()...');

    if (selectRows.length === 0) return;

    const row = selectRows[0];  
  
    const inputElement = document.getElementById('input-subsystem');            
  
    inputElement.value  = row.cells[1].innerText;
    inputElement.setAttribute("eva-id", row.cells[0].innerText);
  
    await selectModal.hide();
}
async function objectEditSubsystem() {

    const modalForm = document.getElementById("editSubsystemModal");

    selectModal = getModal(modalForm);
  
    await showSubsystemsTable();

}
/////////////////////////////////////////////////////////////////////////////
async function showRequisiteTable() {
    console.log('>>showRequisiteTable()...');
   
    const modalForm = document.getElementById("nav-requisite");

    resTbl = buildTabpanel(modalForm, "300");

    const ownerForm     = document.getElementById("create-object-form");  
    const id = ownerForm.getAttribute("eva-id");

    const getData = {'owner': id}
    let tmp = await postOnServer(getData,'/getreqs');  

    let data = [];

    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = await JSON.parse(strJson);

        data.push({'id':row.id, 'textId':Elements.textId, 'type':Elements.type});    
    }
  
    const col = {'id':'Id','textId':'Identifier','type':'Type'} 
    const hide = ['id'];
    
    showTable(resTbl, hide, col, data);

}
async function showTabPartReqTable() {
    console.log('>>showTabPartReqTable()...');
   
    const modalForm = document.getElementById("tabPartModal");

    resTbl = buildTabpanel(modalForm, "385");

    // const ownerForm     = modalForm;  
    const id = modalForm.getAttribute("eva-id");
    // console.log(id);
    const getData = {'owner': id}
    let tmp = await postOnServer(getData,'/gettabpartreqs');  
    // console.log(tmp);
    let data = [];
    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = await JSON.parse(strJson);

        data.push({'id':row.id, 'textId':Elements.textId, 'type':Elements.type});    
    }
  
    const col = {'id':'Id','textId':'Identifier','type':'Type'} 
    const hide = ['id'];
    
    showTable(resTbl, hide, col, data);

}
async function reqModal() {
    console.log('>>reqModal()...');

    const inputOwnerForm  = document.querySelector("#create-object-form"); 
    if (!inputOwnerForm.checkValidity()) {    
        alert('The main identifier is not valid!')
        return;
    }
    
    const modalForm  = document.getElementById("requisiteModal");
    const objectModalLabel = modalForm.querySelector("#requisiteModalLabel");  
    objectModalLabel.innerText = 'Add requisite:';

    const inputForm  = modalForm.querySelector("#create-req-form");   
    inputForm.reset();
    inputForm.setAttribute("create-mode",true);  
    inputForm.setAttribute("eva-ownerId", inputOwnerForm.getAttribute("eva-id"));  
    const inputReqId = inputForm.querySelector("#input-req-id");
    inputReqId.removeAttribute("disabled");

    requisiteModal = getModal(modalForm);

    changeType();
}
async function reqEditModal() {
    console.log('>>reqEditModal()...');

    if (selectRows.length === 0) return;

    const modalForm  = document.getElementById("requisiteModal");    

    const objectModalLabel = modalForm.querySelector('#requisiteModalLabel');  
    objectModalLabel.innerText = 'Edit requisite:';

    const inputForm  = modalForm.querySelector("#create-req-form");   
    inputForm.reset();
    inputForm.setAttribute("create-mode",false);  

    requisiteModal = getModal(modalForm);

    const row = await selectRows[0];  

    let data = { 'id': row.cells[0].innerText }

    let res = await postOnServer(data,'/getreq');

    const inputReqId    = inputForm.querySelector("#input-req-id");
    const inputReqType  = inputForm.querySelector("#input-req-type");    
    const inputReqSyn   = inputForm.querySelector("#input-req-synonum");
    const inputReqLen   = inputForm.querySelector("#input-req-length");  
    const inputReqLAcc  = inputForm.querySelector("#input-req-accuracy");    
    const inputReqLPat  = inputForm.querySelector("#input-req-pattern");  
    const inputReqLValid= inputForm.querySelector("#input-req-valid");             
    const inputReqDescr = inputForm.querySelector("#input-req-descr");

    if (res) {
        let strJson = res.data;                  
        let Elements = await JSON.parse(strJson);    

        inputForm.setAttribute("eva-id", res.id);
        inputReqId.value       = Elements.textId;
        const type = inputReqType.querySelector("option[value='"+Elements.type+"']");
        if (Elements.type.split('.').length>1 && !type) { 
            const option = document.createElement("option");            
            option.innerText = Elements.type;  
            option.value     = Elements.type;
            inputReqType.appendChild(option);
            inputReqType.value     = Elements.type;
            inputReqId.setAttribute("disabled","disabled");            
        } else {
            inputReqType.value     = Elements.type;
            inputReqId.removeAttribute("disabled");
        }
        inputReqDescr.value    = Elements.descr;
        inputReqSyn.value      = Elements.synonum;
        inputReqLen.value      = Elements.length;
        inputReqLAcc.value     = Elements.accuracy;
        inputReqLPat.value     = Elements.pattern;
        inputReqLValid.checked = Elements.validation;
    }
    changeType();
}
async function reqCreate(e) {
    console.log('>>reqCreate()...');

    const ownerForm     = document.getElementById("create-object-form");  
    const ownerTabPart  = document.getElementById("create-tabpart-form");  

    let owner = ownerTabPart.getAttribute("eva-id")||ownerForm.getAttribute("eva-id");
    console.log('owner',owner);

    const inputForm     = document.getElementById("create-req-form");
    const inputReqId    = inputForm.querySelector("#input-req-id");
    const inputReqType  = inputForm.querySelector("#input-req-type");
    const inputReqSyn   = inputForm.querySelector("#input-req-synonum");
    const inputReqLen   = inputForm.querySelector("#input-req-length");  
    const inputReqLAcc  = inputForm.querySelector("#input-req-accuracy");    
    const inputReqLPat  = inputForm.querySelector("#input-req-pattern");  
    const inputReqLValid= inputForm.querySelector("#input-req-valid");              
    const inputReqDescr = inputForm.querySelector("#input-req-descr");
    const createMode    = inputForm.getAttribute("create-mode"); 

    if (!inputForm.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }

    let tmp = { 
        textId    : inputReqId.value, 
        type      : inputReqType.value,  
        synonum   : inputReqSyn.value,      
        length    : inputReqLen.value, 
        accuracy  : inputReqLAcc.value,
        pattern   : inputReqLPat.value,
        validation: inputReqLValid.checked,
        descr     : inputReqDescr.value
    }          

    const data =  {
        'id'      : inputForm.getAttribute("eva-id"),
        'owner'   : owner,
        'data'    : JSON.stringify(tmp),
    }
    
    let link = '';
    if (ownerTabPart.getAttribute("eva-id")) {
        link = 'tabpartreq';
    } else {
        link = 'req';
    }

    if (createMode==='true') {
        try {
            result = await postOnServer(data, '/create'+link)
            console.log(result);        
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            result = await postOnServer(data, '/edit'+link)
            console.log(result);        
        } catch (err) {
            console.log(err);
        }
    }

    await requisiteModal.hide();

    if (result) {  
        await showRequisiteTable();        
        await showTabPartReqTable();          
    }
}
async function reqDelete() {
    console.log('>>reqDelete()...');
    
    for (const row of selectRows) {
        const data = {'id': row.cells[0].innerText};

        res = await postOnServer(data,'/delreq');        
    }

    if (res) await showRequisiteTable();
}
async function reqTabPartDelete() {
    console.log('>>reqTabPartDelete()...');
    
    for (const row of selectRows) {
        const data = {'id': row.cells[0].innerText};

        res = await postOnServer(data,'/deltabpartreq');        
    }

    if (res) await showTabPartReqTable();
}
async function reqTabPartModal() {
    console.log('>>reqTabPartModal()...');

    const inputOwnerForm  = document.getElementById("create-tabpart-form"); 
    if (!inputOwnerForm.checkValidity()) {    
        alert('The main identifier is not valid!')
        return;
    }
    
    const modalForm  = document.getElementById("requisiteModal");
    const objectModalLabel = modalForm.querySelector("#requisiteModalLabel");  
    objectModalLabel.innerText = 'Add requisite:';

    const inputForm  = modalForm.querySelector("#create-req-form");   
    inputForm.reset();
    inputForm.setAttribute("create-mode",true);            

    requisiteModal = getModal(modalForm);
}
async function reqTabPartEditModal() {
    console.log('>>reqTabPartEditModal()...');

    if (selectRows.length === 0) return;

    const modalForm  = document.getElementById("requisiteModal");    

    const objectModalLabel = modalForm.querySelector('#requisiteModalLabel');  
    objectModalLabel.innerText = 'Edit requisite:';

    const inputForm  = modalForm.querySelector("#create-req-form");   
    inputForm.reset();
    inputForm.setAttribute("create-mode",false);  

    requisiteModal = getModal(modalForm);

    const row = await selectRows[0];  

    let data = { 'id': row.cells[0].innerText }

    let res = await postOnServer(data,'/gettabpartreq');

    const inputReqId    = inputForm.querySelector("#input-req-id");
    const inputReqType  = inputForm.querySelector("#input-req-type");    
    const inputReqSyn   = inputForm.querySelector("#input-req-synonum");
    const inputReqLen   = inputForm.querySelector("#input-req-length");  
    const inputReqLAcc  = inputForm.querySelector("#input-req-accuracy");    
    const inputReqLPat  = inputForm.querySelector("#input-req-pattern");  
    const inputReqLValid= inputForm.querySelector("#input-req-valid");             
    const inputReqDescr = inputForm.querySelector("#input-req-descr");
  
    if (res) {
        let strJson = res.data;                  
        let Elements = await JSON.parse(strJson);    

        inputForm.setAttribute("eva-id", res.id);
        inputReqId.value       = Elements.textId;
        const type = inputReqType.querySelector("option[value='"+Elements.type+"']");
        if (Elements.type.split('.').length>1 && !type) { 
            const option = document.createElement("option");            
            option.innerText = Elements.type;  
            option.value     = Elements.type;
            inputReqType.appendChild(option);
            inputReqType.value     = Elements.type;
                      
        } else {
            inputReqType.value     = Elements.type;
        }
        inputReqDescr.value    = Elements.descr;
        inputReqSyn.value      = Elements.synonum;
        inputReqLen.value      = Elements.length;
        inputReqLAcc.value     = Elements.accuracy;
        inputReqLPat.value     = Elements.pattern;
        inputReqLValid.checked = Elements.validation;
    }
}
/////////////////////////////////////////////////////////////////////////////
async function showTabPartTable() {
    console.log('>>showTabPartTable()...');
   
    const modalForm = document.getElementById("nav-tabpart");

    resTbl = buildTabpanel(modalForm, "300");

    const ownerForm     = document.getElementById("create-object-form");  
    const id = ownerForm.getAttribute("eva-id");

    const getData = {'owner': id}
    let tmp = await postOnServer(getData,'/gettabparts');  

    let data = [];
    for (const row of tmp) {
        let strJson = row.data; 
        let Elements = await JSON.parse(strJson);
        if (row.state===0||row.state===1||row.state===3) {
            data.push({'id':row.id, 'textId':Elements.textId, 'type':Elements.type}); 
        }   
    }
  
    const col = {'id':'Id','textId':'Identifier'} 
    const hide = ['id'];
    
    showTable(resTbl, hide, col, data);

}
async function tabPartModal() {
    console.log('>>tabPartModal()...');

    const inputOwnerForm  = document.querySelector("#create-object-form"); 
    if (!inputOwnerForm.checkValidity()) {    
        alert('The main identifier is not valid!')
        return;
    }
    
    const modalForm  = document.getElementById("tabPartModal");
    const objectModalLabel = modalForm.querySelector("#tabPartModalLabel");  
    objectModalLabel.innerText = 'Add tabular part:';

    const inputForm  = modalForm.querySelector("#create-tabpart-form");   
    inputForm.reset();
    inputForm.setAttribute("create-mode",true);  
    modalForm.setAttribute("eva-id", inputForm.getAttribute("eva-id"));  

    tabpartModal = getModal(modalForm);

    await showTabPartReqTable();
}
async function tabPartEditModal() {
    console.log('>>tabPartEditModal()...');

    if (selectRows.length === 0) return;
   
    const modalForm  = document.getElementById("tabPartModal");    

    const objectModalLabel = modalForm.querySelector('#tabPartModalLabel');  
    objectModalLabel.innerText = 'Edit tabular part:';

    const inputForm  = modalForm.querySelector("#create-tabpart-form");   
    inputForm.reset();
    inputForm.setAttribute("create-mode",false);     

    tabpartModal = getModal(modalForm);

    const row = await selectRows[0];  

    let data = { 'id': row.cells[0].innerText }

    let res = await postOnServer(data,'/gettabpart');

    const inputTabPartId    = inputForm.querySelector("#input-tabpart-id");
    const inputTabPartSyn   = inputForm.querySelector("#input-tabpart-synonum");
  
    if (res) {
        let strJson = res.data;                  
        let Elements = await JSON.parse(strJson);    

        modalForm.setAttribute("eva-id", res.id);         
        inputForm.setAttribute("eva-id", res.id);                
        inputTabPartId.value       = Elements.textId;        
        inputTabPartSyn.value      = Elements.synonum;
    }

    await showTabPartReqTable();
}
async function tabPartCreate(e) {
    console.log('>>tabPartCreate()...');

    const ownerForm       = document.getElementById("create-object-form");  
    const inputForm       = document.getElementById("create-tabpart-form");
    const inputTabpartId  = inputForm.querySelector("#input-tabpart-id");    
    const inputTabpartSyn = inputForm.querySelector("#input-tabpart-synonum");
    const createMode      = inputForm.getAttribute("create-mode"); 
    const input_textId    = ownerForm.querySelector('#input-textId'); 

    if (!inputForm.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }

    const owner   = input_textId.value;
    const ownerId = ownerForm.getAttribute("eva-id");
    // console.log('ownerId', ownerId );
    const id = inputForm.getAttribute("eva-id");
    // console.log('id', id );

    let tmp = { 
        owner     : owner,
        textId    : inputTabpartId.value,         
        synonum   : inputTabpartSyn.value,           
    }          

    const data =  {
        'id'      : id,
        'owner'   : ownerId,        
        'data'    : JSON.stringify(tmp),
    }

    if (createMode==='true') {
        try {
            result = await postOnServer(data, '/createtabpart')
            console.log(result);        
        } catch (err) {
            console.log(err);
        }
    } else {
        try {
            result = await postOnServer(data, '/edittabpart')
            console.log(result);        
        } catch (err) {
            console.log(err);
        }
    }

    await tabpartModal.hide();

    if (result) await showTabPartTable();    
}
async function tabPartDelete() {
    console.log('>>tabPartDelete()...');
    
    for (const row of selectRows) {
        const data = {'id': row.cells[0].innerText};

        res = await postOnServer(data,'/deltabpart');        
    }

    if (res) await showTabPartTable();
}
/////////////////////////////////////////////////////////////////////////////
window.onload = function() {
    try { 
        const mode   = content.getAttribute("data-mode");
        if (mode==='true') {
            let editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
                lineNumbers: true, 
                mode: 'javascript',
                lineWrapping: true,
                extraKeys: {"Ctrl-Q": function(cm){ cm.foldCode(cm.getCursor()); }},
                foldGutter: true,
                gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]                   
            }); 
        }
    } catch(e) {
        console.log(e);
    }    
    try {          
        const logged = content.getAttribute("data-logged");
        if (logged==='true') return;
        listUsers();                       
    } catch(e) {
        console.log(e);
    }
}
function loginMode() {
    console.log('>>loginMode()...'); 

    const logged = content.getAttribute("data-logged");   
    const mode   = content.getAttribute("data-mode");
 
    if (mode==='true'&&logged==='true') {   
        const dashboard = document.getElementById('dashboard');
        $dashboard = JSON.parse(dashboard.dataset.dashboard);
        showConfigTable();
        let inputType = $objectModal.querySelector('#input-type');
        inputType.addEventListener('change', mainSelect);            
    } else {
        return;
    }    
}
document.addEventListener('DOMContentLoaded', loginMode());