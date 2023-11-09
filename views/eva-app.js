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
function openNav(e) {
    console.log('>>openNav()...');

    console.log(e);

    const status = document.getElementById("status");
    //status.value = ">It's work!";
}
function openRef() {
    console.log('>>openRef()...');

    const $dashboard = document.getElementById("dashboard");      
    $dashboard.innerHTML = ""; 
    //$dashboard.innerHTML = `{{ block('ref') | json_encode | raw }}`;  

    let btnBlock = document.getElementById("nav-ref");
    btnBlock.setAttribute("class", "tab-content");
    // console.log(btnBlock);      
    
    $dashboard.appendChild(btnBlock);

    // let someTabTriggerEl = document.getElementById('nav-ref');
    // let tab = new bootstrap.Tab(someTabTriggerEl);
  
    // tab.show();
}
//Content////////////////////////////////////////////////////////////////////
let a = [];

function navItem(navTab, name) {    
    const li = document.createElement('li');
    li.setAttribute("class","nav-item");
        a[name] = document.createElement('a');
        a[name].setAttribute("class","nav-link eva-link");        
        a[name].setAttribute("id", name);      
        a[name].setAttribute("role", "tab");              
        a[name].innerText = name;    
        a[name].href="#";  
        a[name].onclick = openNav();           
    li.appendChild(a[name]);     
    navTab.appendChild(li);         
}
function navLink(nav, name) {
    console.log('>>navLink()...');
    const a = document.createElement('a');
    a.setAttribute("class","nav-link");        
    a.setAttribute("id", name);           
    a.innerText = name;
    a.href="#";
    a.setAttribute("style","color:grey;font-size: 19px;");       
    a.setAttribute("onclick", "openRef()");         
    nav.appendChild(a); 
}
async function header(navTab) {
    console.log('>>header()...');
    //MAIN
     navItem(navTab, 'Desktop');
     navItem(navTab, 'References');    
     navItem(navTab, 'Service');    
    
    let data = await getSubsystems();
    //console.log(data);
    for (let row of data) {
        //console.log(row.name);
        navItem(navTab, row.name);          
    }   

    // const evaLinks = document.getElementsByClassName("eva-link");
    // console.log(evaLinks);
    // for (let link of Object.keys(evaLinks)) {
    //     console.log(link);
    //     console.log(evaLinks[link]);
    //     evaLinks[link].addEventListener("click", openNav(evaLinks[link].id));
    // }
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
/////////////////////////////////////////////////////////////////////////////
const app = document.getElementById('eva-app');
function init() {
    const mode = document.querySelector('.content').dataset.mode;
    console.log('mode: ' + mode);   
    if (mode==='false') {
        //const app = document.getElementById('eva-app');
        //console.log(app); 
        
        const navTab = document.getElementById("eva-nav");
        header(navTab);
        const div = document.createElement('div');   
        div.setAttribute("class", "d-flex flex-row flex-grow-1");                                  
        div.setAttribute("style", "height:calc(100vh - 96px); border: 1px solid #00ff92");       
            const div3 = document.createElement('div');           
            div3.setAttribute("class","col p-4 gap-2");
            div3.setAttribute("id","dashboard");      
            dashboard(div3);
            div.appendChild(div3); 
        app.appendChild(div);   
    } 
}

document.addEventListener('DOMContentLoaded', init());