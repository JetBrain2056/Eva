let a = [];
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
//Button comands/////////////////////////////////////////////////////////////
function openNav(name) {
    console.log('>>openNav()...');

    console.log(name);

    //const $dashboard = document.getElementById("dashboard");  
    //$dashboard.innerHTML = "";

    // const navDesk = document.getElementById("nav-desk");    
    // console.log(navDesk);      
    
    // $dashboard.appendChild(navDesk);

    // let someTabTriggerEl = document.getElementById('nav-desk');    
    // let tab = new bootstrap.Tab(someTabTriggerEl);
  
    // tab.show();
    const status = document.getElementById("status");
    status.value = ">It's work!";
}
function openRef() {
    console.log('>>openRef()...');

    //const $dashboard = document.getElementById("nav-Desktop");    
    //$dashboard.innerHTML = ""; 
    //$dashboard.innerHTML = `{{ block('ref') | json_encode | raw }}`;  

    let btnBlock = document.getElementById("References");
    console.log(btnBlock);      
    
    //$dashboard.appendChild(btnBlock);
    
    // let someTabTriggerEl = document.getElementById('nav-ref');
    let tab = new bootstrap.Tab(btnBlock);
  
    tab.show();
    const status = document.getElementById("status");
    status.value = ">It's work!";
}
//Content////////////////////////////////////////////////////////////////////
async function navItem(navTab, name) {    
    const li = document.createElement('li');
    li.setAttribute("class","nav-item");
        a[name] = document.createElement('a');             
        a[name].setAttribute("id", name);      
        a[name].setAttribute("role", "tab");  
        a[name].setAttribute("data-bs-toggle","tab");   
        a[name].setAttribute("data-bs-target","#nav-"+name);
        a[name].setAttribute("aria-controls","nav-"+name);
        if (name=='Desktop') {
            a[name].setAttribute("class","nav-link active eva-nav-link");   
            a[name].setAttribute("aria-selected", true);        
        } else {             
            a[name].setAttribute("class","nav-link eva-link");      
            a[name].setAttribute("aria-selected", false);
        }
        a[name].innerText = name;    
        a[name].href="#";  
        //a[name].onclick = openNav();           
    li.appendChild(a[name]);     
    navTab.appendChild(li);  

    const evaSubsys = document.querySelector('.eva-subsys'); 

    if (name=='Desktop'||name=='References'||name=='Reports') {
    } else {
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
    a.innerText = name;
    a.href="#";
    a.setAttribute("style","color: grey;font-size: 19px;");       
    a.setAttribute("onclick", "openRef()");         
    nav.appendChild(a); 
}
async function header(navTab) {
    console.log('>>header()...');
    //MAIN
    navItem(navTab, 'Desktop');
    const div = document.getElementById("nav-Desktop");
    await dashboard(div);
    
    navItem(navTab, 'References');    
    navItem(navTab, 'Reports');    
    
    //DYNAMIC    
    let data = await getSubsystems();
    //console.log(data);
    for (let row of data) {
        //console.log(row.name);
        navItem(navTab, row.name);           
    }  
}
async function dashboard(div) {
    console.log('>>dashboard()...');

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
function clickNav() {
    const evaLinks = document.getElementsByClassName("eva-link");
    console.log(evaLinks);
    for (let link of Object.keys(evaLinks)) {
        console.log(link);
        console.log(evaLinks[link]);
        evaLinks[link].addEventListener("click", openNav(link));
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
        clickNav();
        status.value='>onload' ;                 
    } 
}
       
document.addEventListener('DOMContentLoaded', init());