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
      
    const evaReqs   = document.getElementsByClassName('eva-req'); 
    let reqList ={evaId:'',value:''};
    for(let elem of evaReqs) {
        reqList.evaId = elem.id;
        reqList.value = elem.value;
    }
    console.log('reqList:',reqList);

    const data =  {
        'textId'  : textId,
        'id'      : refForm.getAttribute("eva-id"),
        'name'    : inputName.value,
        'reqList' : reqList    
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
    console.log('>>refModal()...');      

    const refModalLabel  = document.getElementById('refModalLabel');  
    refModalLabel.innerText = 'Add element';    
    const refForm        = document.getElementById('create-ref-form');  
    refForm.innerHTML = '';
    refForm.reset();   
    refForm.setAttribute("create-mode", true);  
    
    let id     = refForm.getAttribute("eva-id");
    let textId = refForm.getAttribute("eva-textId");
    console.log(id); 
    console.log(textId); 

    let data = { 
        'textId': textId
    };

    res = await postOnServer(data, '/getrefs');  
    if (res) {       
        let col = res[0];  
        //refForm.setAttribute("eva-id", col.id);              
        for (let req of Object.keys(col)) {
            const label  = document.createElement("label");
            label.setAttribute("for","input-"+req);
            label.innerText = req+":";        
            refForm.appendChild(label);
            const div  = document.createElement("div");
            div.class = "input-group";
            refForm.appendChild(div);
                const input  = document.createElement("input");
                input.setAttribute("type","text");
                input.id    = "input-"+req;
                input.value = '';
                input.setAttribute("class","eva-req form-control");
                div.appendChild(input); 
        }        
    }       
}
async function refEditModal() {
    console.log('>>refEditModal...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      

    const refModalLabel    = document.getElementById('refModalLabel');  
    refModalLabel.innerText = 'Edit element';   
          
    const refForm    = document.getElementById('create-ref-form');    
    refForm.reset();  
    refForm.innerHTML ='';   
    let textId = refForm.getAttribute("eva-textId");
    refForm.setAttribute("create-mode", false);  

    let data = { 
        'textId': textId,
        'id': row.cells[0].innerText
    };

    res = await postOnServer(data, '/getref');  
    if (res) {       
        let col = res[0];  
        refForm.setAttribute("eva-id", col.id);              
        for (let req of Object.keys(col)) {
            const label  = document.createElement("label");
            label.setAttribute("for","input-"+req);
            label.innerText = req+":";        
            refForm.appendChild(label);
            const div  = document.createElement("div");
            div.class = "input-group";
            refForm.appendChild(div);
                const input  = document.createElement("input");
                input.setAttribute("type","text");
                input.id    = "input-"+req;
                input.value = col[req];
                input.setAttribute("class","eva-req form-control");
                div.appendChild(input); 
        }        
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

    const col  = { 'id':'Id' ,'name':'Name' };  
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
        if (row.state===0 && (elements.typeId==='Reference'||elements.typeId==='Document'||elements.typeId==='Processing')) {
            //console.log(elements.typeId); 
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