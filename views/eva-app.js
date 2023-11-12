let a = [];
//let currentModal;
n = 0;
tbl = [];
forms = document.getElementsByClassName('eva-ref-form');
for (const div of forms) {                            
    // div.setAttribute("style", "overflow-y: scroll;");           
    div.setAttribute("style", "height: calc(100vh - 171px); overflow-y: scroll;");               
    tbl[n] = document.createElement('table');
    tbl[n].setAttribute("class", "table table-striped table-hover table-sm table-responsive");              
    div.appendChild(tbl[n]); 
    n = n + 1;
}
async function showAppTable(showTbl, hide, col, data) {
    console.log('>>showTable()...'); 
    console.log('table: ' + showTbl); 
  
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
//Get on server//////////////////////////////////////////////////////////////
async function getSubsystems() {
    console.log('>>getSubsystems()...');
    let res;
    try{
        const response = await fetch('/subsystems');
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;  
}
async function getConfig() {
    console.log('>>getConfig()...');
    let res;
    try{
        const response = await fetch('/config');
        res = await response.json();
    } catch (err) {
        console.log(err)
    }
    return res;
}
async function getReferences(refName) {
    console.log('>>getReferences()...');

    let data = { 'textId': refName };

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
}
async function showRefTable(refName) {
    
    let data = await getReferences(refName);   

    const col  = { 'id':'Id' };  
    const hide = [];  

    await showAppTable(tbl[0], hide, col, data);

}
//Commands on client/////////////////////////////////////////////////////////
function clickLink() {
    // const evaLinks = document.getElementsByClassName("eva-link");
    // console.log(evaLinks);
    // for (let link of Object.keys(evaLinks)) {
    //     console.log(link);
    //     console.log(evaLinks[link]);
    //     evaLinks[link].addEventListener("click", openRef(link));
    // }
}
function openNav(name) {
    // console.log('>>openNav()...');

    // console.log(name);

    // const status = document.getElementById("status");
    // status.value = ">It's work!";
}
function openRef(refName) {
    console.log('>>openRef()...');

    //console.log(refName);

    const refForm = document.getElementById("ref-form");       
    //console.log(refForm);
    
    const refFormLabel = document.getElementById("refFormLabel"); 
    refFormLabel.innerText = refName+'s';

    let tab = new bootstrap.Tab(refForm);
    tab.show();

    showRefTable(refName);

    const status = document.getElementById("status");
    status.value = ">It's work!";
}
//Content////////////////////////////////////////////////////////////////////
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

    if (name=='Desktop'||name=='References'||name=='Reports') {
        //main
    } else {
        //subsystem
        const subsys = document.createElement("div");        
        subsys.setAttribute("class","tab-pane fade");    
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
async function header(navTab) {
    console.log('>>header()...');
    
    //MAIN
    navItem(navTab, 'Desktop');
    let div = document.getElementById("nav-Desktop");
    tabDesk(div);    
    navItem(navTab, 'References');    
    div = document.getElementById("nav-References");
    tabRef(div);    
    navItem(navTab, 'Reports');    
    div = document.getElementById("nav-Reports");
    //tabRep(div);   

    //DYNAMIC    
    let data = await getSubsystems();
    //console.log(data);
    for (let row of data) {
        //console.log(row.name);
        navItem(navTab, row.name);           
    }  
}
async function tabDesk(div) {
    console.log('>>tabDesk()...');

    let data = await getConfig();
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

    let data = await getConfig();
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
const app = document.getElementById('eva-app');
function init() {
    const mode = document.querySelector('.content').dataset.mode;
    console.log('mode: ' + mode);   
    if (mode==='false') {                
        const navTab = document.getElementById("eva-nav");
        
        header(navTab);    

        const status = document.getElementById("status");    
        status.value='>onload' ;                 
    } 
}
       
document.addEventListener('DOMContentLoaded', init());