let a = [];
selectRows = [];
n = 0;

//Commands on client/////////////////////////////////////////////////////////
async function openRef(refName) {
    console.log('>>openRef()...');
    
    const navRefForm    = document.getElementById("nav-References");
    const navForm    = document.getElementById("ref-form");  
    const refForm    = document.getElementById("create-ref-form");  
    refForm.reset();             
    const refLink = navRefForm.querySelector("#"+refName);
    const refId = refLink.getAttribute("eva-id");
    // console.log('refId',refId);
    refForm.setAttribute("eva-id", refId);
    refForm.setAttribute("eva-textId", refName);

    let tab = new bootstrap.Tab(navForm);
    tab.show();    

    selectRows = [];

    await showRefTable(refName);
    
    let status = document.getElementById("status");
    status.value = ">It's work!";
}
async function getSynonyms(refForm) {
    console.log('>>getSynonyms()...');

    const id = refForm.getAttribute("eva-id");
    const datareq = { 
        'owner': id
    }
    const resreq = await postOnServer(datareq, '/getreqs');  

    let arrSyn =[];  
    arrSyn['id'] = 'Id';
    arrSyn['name'] = 'Name';
    for (let elem of resreq) {

        let strJson = elem.data;          
        let Elements = await JSON.parse(strJson);  
        let colName = Elements.textId;
        arrSyn[colName] = Elements.synonum;
    }
    return arrSyn;
}
async function refCreate(e) {
    console.log('>>refCreate()...');

    const refForm    = document.getElementById("create-ref-form");
    const textId     = refForm.getAttribute("eva-textId");
    let createMode   = refForm.getAttribute("create-mode");     
    
    if (!refForm.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }
      
    let data =  {
        'textId'  : textId                
    }

    const evaReqs   = refForm.getElementsByClassName('eva-req');     
    for(let elem of evaReqs) {
        console.log(elem.name);
        if (elem.name==='id'&&createMode==='true'){            
        } else {
            const type     = elem.getAttribute("type");
            const dataType = elem.getAttribute("data-type");
            if (type === 'checkbox') {                 
                data[elem.name] = elem.checked; 
            } else if (type === 'date') {
                if (elem.value === '') {
                    data[elem.name] = new Date('1,1,1');  
                } else {
                    console.log(elem.value);
                    data[elem.name] = new Date(elem.value);                           
                }
            } else {
                if (dataType === 'numeric') {
                    data[elem.name] = Number(elem.value);  
                } else {    
                    data[elem.name] = String(elem.value);    
                }
            }
        }    
    }    
        
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

    await currentModal.hide();

    if (result) await showRefTable(textId);

}
async function refDelete() {
    console.log('>>refDelete()...');

    const refForm = document.getElementById("nav-ref-form");    
    const textId  = refForm.getAttribute("eva-textId");
    
    for (const row of selectRows) {
        const data = {
            'textId': textId,
            'id': row.cells[0].innerText
        }
        result = await postOnServer(data, '/delref');        
    }

    if (result) await showRefTable(textId);
}
async function refModal() {
    console.log('>>refModal()...');      

    const modalForm  = document.getElementById('refModal');  
    currentModal = getModal(modalForm);

    const refModalLabel  = modalForm.querySelector('#refModalLabel');  
    refModalLabel.innerText = 'Add element:';    

    let createMode = true;

    const refForm        = modalForm.querySelector('#create-ref-form');  
    refForm.innerHTML = '';
    refForm.reset();   
    refForm.setAttribute("create-mode", createMode);  
    
    let arrSyn = await getSynonyms(refForm);   
    // console.log('arrSyn',arrSyn);

    const textId = refForm.getAttribute("eva-textId");
    const data = { 
        'textId': textId
    }

    const res = await postOnServer(data, '/getrefcol');  
    let arr =[];    
    let arrCol =[];  
    for (let elem of res) {
        let colName    = elem.column_name;
        let dataType   = elem.data_type;
        let identifier = elem.dtd_identifier;
        let obj = {'colName': colName, 'dataType':dataType, 'identifier': identifier}
        arr[colName]='';  
        arrCol[colName] = obj;
    }
    // console.log(arrCol);
    await refElement(refForm, arr, arrCol, arrSyn, createMode);      
}
async function refEditModal() {
    console.log('>>refEditModal...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      

    const modalForm  = document.getElementById('refModal');  

    const refModalLabel    = modalForm.querySelector('#refModalLabel');  
    refModalLabel.innerText = 'Edit element:';   

    let createMode = false;
          
    const refForm    = modalForm.querySelector('#create-ref-form');    
    refForm.reset();  
    refForm.innerHTML ='';     
    refForm.setAttribute("create-mode", createMode);  

    arrSyn = await getSynonyms(refForm);   

    currentModal = getModal(modalForm);

    const textId = refForm.getAttribute("eva-textId");
    const data = { 
        'textId': textId,
        'id': row.cells[0].innerText
    };

    let res = await postOnServer(data, '/getrefcol');       
    let arrCol =[];  
    for (let elem of res) {
        let colName    = elem.column_name;
        let dataType   = elem.data_type;
        let identifier = elem.dtd_identifier;
        let obj = {'colName': colName, 'dataType':dataType, 'identifier': identifier}         
        arrCol[colName] = obj;
    }
    // console.log(arrCol);

    res = await postOnServer(data, '/getref');  
    await refElement(refForm, res[0], arrCol, arrSyn, createMode);     
}
//DOM Dynamic Content////////////////////////////////////////////////////////
async function refElement(refForm, col, arrCol, arrSyn, createMode) {
    console.log('>>refElement()...');  
    // console.log(res);
    if (col) {                  
        delete col['createdAt'];
        delete col['updatedAt'];
        for (let req of Object.keys(col)) {            
            const label  = document.createElement("label");
            label.setAttribute("for","input-ref-"+req);
            //synonym
            let synom = arrSyn[req];
            // console.log('arr',arrSyn[req]);
            // console.log('synom',synom);
            if (synom) {
                label.innerText = synom+":";  
            } else {
                label.innerText = req+":";  
            }                           
            refForm.appendChild(label);
            const div  = document.createElement("div");
            div.setAttribute("class", "input-group input-group-sm col-auto");
            refForm.appendChild(div);                
                const input  = document.createElement("input");       
                let type = arrCol[req];
                if (type.dataType === 'character varying') {
                    input.setAttribute("type","text");                    
                    input.setAttribute("class","eva-req form-control");    
                } else if (type.dataType === 'integer') {
                    input.setAttribute("type","number");                    
                    input.setAttribute("class","eva-req form-control");   
                    input.setAttribute("required", "required");        
                } else if (type.dataType === 'numeric') {
                    input.setAttribute("type","text");                    
                    input.setAttribute("inputmode","decimal");
                    input.setAttribute("class","eva-req form-control");              
                    input.setAttribute("pattern", "[0-9.]+");   
                    input.setAttribute("maxlength", "15");          
                    input.setAttribute("placeholder", "0.00");  
                    input.style = "text-align:right;";
                } else if (type.dataType === 'timestamp with time zone') {
                    input.setAttribute("type","date");
                    input.setAttribute("class","eva-req form-control");
                } else if (type.dataType === 'boolean') {
                    input.setAttribute("type","checkbox");
                    input.setAttribute("class","eva-req form-check-input");                    
                } else { 
                    input.setAttribute("type","text");
                    input.setAttribute("class","eva-req form-control"); 
                }

                input.setAttribute("data-type", type.dataType);
             
                if (req==='id') {
                    input.setAttribute("disabled","disabled");
                }
                if (req==='name') {
                    input.setAttribute("required", "required");
                }

                input.id    = "input-ref-"+req;
                input.name  = req;
                if (createMode===true) {
                    if (type.dataType === 'timestamp with time zone') {
                        const date = new Date('1,1,1');
                        // console.log('date', date);                        
                        input.value = dateFormat(date).slice(0, 10);
                    } else {
                        input.value = '';
                    }
                } else if (createMode===false) {
                    if (type.dataType === 'boolean') {
                        input.checked = col[req];
                    } else if (type.dataType === 'timestamp with time zone') {
                        const date = col[req];
                        // console.log('date', date);                        
                        input.value = date.slice(0, 10);
                    } else {
                        input.value = col[req];
                    }
                }                
             
                div.appendChild(input); 
        }        
    } 
}
function buildTable(refName) {
    console.log('>>buildTable()...');  

    const refForm = document.getElementById("nav-ref-form");
    refForm.setAttribute("eva-textId", refName);

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

    showTable(refTbl, hide, col, data);

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
function navLink(nav, name, id) {
    console.log('>>navLink()...');
    const a = document.createElement('a');
    a.setAttribute("class","nav-link eva-link");        
    a.setAttribute("id", name);           
    a.setAttribute("eva-id", id);  
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
        let id       = row.id;
        let strJson  = row.data; 
        let elements = await JSON.parse(strJson);
        if (row.state===0 && (elements.typeId==='Reference'||elements.typeId==='Document'||elements.typeId==='Processing')) {
            //console.log(elements.typeId); 
            const nav = document.createElement('nav');
            nav.setAttribute("class","nav flex-column");                 
                navLink(nav, elements.textId, id);                    
            div.appendChild(nav);          
        }
    }        
}
async function tabRef(div) {
    console.log('>>tabRef()...');

    let data = await getOnServer('/getconfig');
    for (let row of data) {
        let id       = row.id;
        let strJson  = row.data;         
        let elements = await JSON.parse(strJson);
        if (row.state===0 && elements.typeId==='Reference') {
                    
            const nav = document.createElement('nav');
            nav.setAttribute("class","nav flex-column");                 
                navLink(nav, elements.textId, id);                    
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