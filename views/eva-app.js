let a = [];
selectRows = [];
n = 0;

//Commands on client/////////////////////////////////////////////////////////
async function openRef(refName) {
    console.log('>>openRef()...');
    console.log(refName);

    const form    = document.getElementById("ref-form");  
    const refForm = document.getElementById("create-ref-form");  
    refForm.reset();   
    refForm.setAttribute("eva-id", refName);    
    refForm.setAttribute("eva-textId", refName);

    let tab = new bootstrap.Tab(form);
    tab.show();    

    await showRefTable(refName);

    const status = document.getElementById("status");
    status.value = ">It's work!";
}
async function refCreate() {
    console.log('>>refCreate()...');

    const refForm    = document.getElementById("create-ref-form");
    const textId     = refForm.getAttribute("eva-textId");
    const createMode = refForm.getAttribute("create-mode");  
    const inputName  = document.getElementById('input-ref-name');    

    const data =  {
        'textId'  : textId,
        'id'      : refForm.getAttribute("eva-id"),
        'name'    : inputName.value        
    };
    
    let result;
    console.log('createMode: '+createMode);
    if (createMode==='true') {
        try {
            result = await postOnServer(data, '/createref')
            console.log(result);        
        } catch (e) {
            console.log(e);
        }
    } else {
        try {
            result = await postOnServer(data, '/updateref')
            console.log(result);        
        } catch (e) {
            console.log(e);
        }
    }

    if (result) await showRefTable(textId);

}
async function refDelete() {
    console.log('>>refDelete...');

    const refForm = document.getElementById("nav-ref-form");
    const textId = refForm.getAttribute("eva-id");

    let result;
    for (const row of selectRows){

        let data = {
            'textId': textId,
            'id': row.cells[0].innerText
        };

        result = await postOnServer(data, '/delref');        
    }

    if(result) await showRefTable(textId);
}
async function refModal() {
    console.log('>>refEditModal...'); 
  
    //if (selectRows.length === 0) { return };   
          
    const refModalLabel    = document.getElementById('refModalLabel');  
    refModalLabel.innerText = 'Add element';    
    const refForm        = document.getElementById('create-ref-form');  
    refForm.reset();   
    refForm.setAttribute("create-mode", true);   
}
async function refEditModal() {
    console.log('>>refEditModal...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      

    const refModalLabel    = document.getElementById('refModalLabel');  
    refModalLabel.innerText = 'Edit element';   
          
    const refForm    = document.getElementById('create-ref-form');      
    let textId = refForm.getAttribute("eva-textId");
    console.log(textId);    
    refForm.setAttribute("create-mode", false);  

    const input_name     = document.getElementById('input-ref-name');  

    let data = { 
        'textId': textId,
        'id': row.cells[0].innerText
    };

    let res;
    try {    
        let response = await fetch('/getref', {
            method  : 'post',    
            headers : {'Content-Type': 'application/json'},
            body    : JSON.stringify(data)            
        });  
        res = await response.json();     
       
    } catch (err) {
      console.log(err);
    }
  
    if (res) {       
        refForm.setAttribute("eva-id", res[0].id);
        input_name.value        = res[0].name;
        //input_descr.value       = res[0].descr;        
    }  
}
//DOM Dynamic Content////////////////////////////////////////////////////////
function buildTable(refName) {
    console.log('>>buildTable()...');  

    const refForm = document.getElementById("nav-ref-form");
    refForm.setAttribute("eva-id", refName);

    const refFormLabel = document.getElementById("refFormLabel"); 
    refFormLabel.innerText = refName+'s';

    const formTbl = document.getElementById("eva-ref-form");    
    formTbl.innerHTML='';
    formTbl.setAttribute("style", "height: calc(100vh - 171px); overflow-y: scroll;");               
        const refTbl = document.createElement('table');
        refTbl.setAttribute("class", "table table-striped table-hover table-sm table-responsive");              
    formTbl.appendChild(refTbl);  

    return refTbl;

}
async function showRefTable(refName) {
    console.log('>>showRefTable()...');   

    refTbl = buildTable(refName);

    let tmp = {'textId': refName };
    let data = await postOnServer(tmp, '/getrefs');   

    const col  = { 'id':'Id', 'name':'Name' };  
    const hide = [];      

    await showTable(refTbl, hide, col, data);

}
function navItem(navTab, name) {    
    const li = document.createElement('li');
    li.setAttribute("class","nav-item");
        a[name] = document.createElement('a');             
        a[name].setAttribute("id", name);      
        a[name].setAttribute("role", "tab");  
        a[name].setAttribute("data-bs-toggle","tab");   
        a[name].setAttribute("data-bs-target","#nav-"+name);
        a[name].setAttribute("aria-controls","nav-"+name);
        if (name=='Desktop') {
            a[name].setAttribute("class","nav-link active");   
            a[name].setAttribute("aria-selected", true);        
        } else {             
            a[name].setAttribute("class","nav-link");      
            a[name].setAttribute("aria-selected", false);
        }
        a[name].innerText = name;    
        a[name].href="#";  
        //a[name].onclick = openNav();           
    li.appendChild(a[name]);     
    navTab.appendChild(li);  

    const evaSubsys = document.querySelector('.eva-subsys'); 
    const subsys = document.createElement("div"); 
    if (name=='Desktop') {    
        subsys.setAttribute("class","tab-pane fade active show");      
    } else {                       
        subsys.setAttribute("class","tab-pane fade");   
    }
    subsys.setAttribute("role","tabpanel");
    subsys.setAttribute("id", "nav-"+name);
    subsys.setAttribute("aria-labelledby","nav-"+name+"-tab");
        const h5 = document.createElement("h5");  
        h5.setAttribute("class","title");
        h5.innerText = name;
        h5.appendChild(document.createElement("hr"));  
    subsys.appendChild(h5);    
    evaSubsys.appendChild(subsys);                   
}
function navLink(nav, name) {
    console.log('>>navLink()...');
    const a = document.createElement('a');
    a.setAttribute("class","nav-link eva-link");        
    a.setAttribute("id", name);           
    a.innerText = name+'s';
    a.href="#";
    a.setAttribute("style","color: grey;font-size: 19px;");       
    a.setAttribute("onclick", "openRef(id)");         
    nav.appendChild(a); 
}
async function header() {
    console.log('>>header()...');

    const navTab = document.getElementById("eva-nav");  
    
    //MAIN
    navItem(navTab, 'Desktop'); 
    navItem(navTab, 'References');         
    navItem(navTab, 'Reports');    

    //DYNAMIC    
    data = await getOnServer('/subsystems');
    //console.log(data);
    for (let row of data) {
        //console.log(row.name);
        navItem(navTab, row.name);           
    }      

    let div = document.getElementById("nav-Desktop");
    tabDesk(div);  
    div = document.getElementById("nav-References");
    tabRef(div);  
    div = document.getElementById("nav-Reports");
    //tabRep(div);    
}
async function tabDesk(div) {
    console.log('>>tabDesk()...');

    let data = await getOnServer('/getconfig');
    for (let row of data) {
        let strJson = row.data; 
        let elements = await JSON.parse(strJson);
        if (!row.state===0||elements.typeId==='Constant'||elements.typeId==='Subsystem') {
            console.log(elements.typeId);
        } else {    
            const nav = document.createElement('nav');
            nav.setAttribute("class","nav flex-column");                 
                navLink(nav, elements.textId);                    
            div.appendChild(nav);          
        }
    }        
}
async function tabRef(div) {
    console.log('>>tabRef()...');

    let data = await getOnServer('/getconfig');
    for (let row of data) {
        let strJson = row.data; 
        let elements = await JSON.parse(strJson);
        if (row.state===0 && elements.typeId==='Reference') {
                    
            const nav = document.createElement('nav');
            nav.setAttribute("class","nav flex-column");                 
                navLink(nav, elements.textId);                    
            div.appendChild(nav);          
        }
    }        
}
/////////////////////////////////////////////////////////////////////////////
function appContent() {

    const app = document.getElementById('eva-app');
    app.setAttribute("class","col tab-content p-3 eva-subsys");    
    app.style="height:calc(100vh - 95.5px); border: 1px solid #00ff92";

    const status = document.getElementById("status"); 
    status.value='>onload';  
}
function init() {
    
    const mode   = document.querySelector('.content').dataset.mode;
    const logged = document.querySelector('.content').dataset.logged;
    //console.log('mode: ' + mode);   
    if (mode==='false'&&logged==='true') {      
                    
        appContent();
        header();                                           
    } 
}
       
document.addEventListener('DOMContentLoaded', init());