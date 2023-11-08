
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
    status.value = ">It's work!";
}
function openRef() {
    console.log('>>openRef()...');

    const $dashboard = document.getElementById("dashboard");

    const ref = document.getElementById("nav-tabRef");    
     console.log(ref);
    const navRef = "{{ block('app') }}";
    // console.log(navRef);
          
    $dashboard.innerHTML = ">It's work!"; 
    $dashboard.setAttribute("data-app",navRef);
    // $dashboard.innerHTML = `<div class="" id="nav-tabRef">                              
    //                             <div class="" id="nav-ref" role="tabpanel" aria-labelledby="nav-ref-tab">
    //                                 <div class="btn-toolbar" role="toolbar" aria-label="toolbar group">
        //                                 <div class="btn-group btn-group-sm" role="group">
        //                                     <button type="button" class="btn btn-primary d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#refModal">
        //                                          <i class="fa fa-plus-square"></i>
        //                                          <span>{{ button_add }}</span>
        //                                     </button>
        //                                     <button type="button" class="btn btn-primary d-flex gap-2 align-items-center eva-edit" onclick="refEditModal()">
        //                                         <i class="fa fa-edit"></i>
        //                                         <span>{{ button_edit }}</span>
        //                                     </button>
        //                                 </div>
    //                                 </div>           
    //                                 <div class="eva-form"></div>      
    //                             </div> 
    //                         </div>`;   
}
//Content////////////////////////////////////////////////////////////////////
let a = [];

function navItem(navTab, name) {    
    const li = document.createElement('li');
    li.setAttribute("class","nav-item");
        a[name] = document.createElement('a');
        a[name].setAttribute("class","nav-link eva-link");        
        a[name].setAttribute("id", name);           
        a[name].innerText = name;    
        a[name].href="#";  
        a[name].onclick = openNav();           
    li.appendChild(a[name]);     
    navTab.appendChild(li);         
}
function dashboardItem(node, name) {
    const li = document.createElement('li');
    li.setAttribute("class","nav-item");
        const a = document.createElement('a');
        a.setAttribute("class","nav-link");        
        a.setAttribute("id", name);           
        a.innerText = name;
        a.href="#";
        a.setAttribute("style","color:grey;font-size: 19px;");       
        a.setAttribute("onclick", "openRef()");     
    li.appendChild(a); 
    node.appendChild(li); 
    return node;
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

    // const div2 = document.createElement('div');
    // div2.setAttribute("class", "tab-content p-4 gap-2");          
    //     const div4 = document.createElement('div');
    //     div4.setAttribute("class", "tab-pane fade");   
    //     div4.setAttribute("role", "tabpanel");          
    //     div2.appendChild(div4);  
    // div.appendChild(div2);  

    let data = await getConfig();
    for (let row of data) {
        let strJson = row.data; 
        let elements = await JSON.parse(strJson);
        if (!row.state===0||elements.typeId==='Constant'||elements.typeId==='Subsystem') {
            console.log(elements.typeId);
        } else {    
            const ul = document.createElement('ul');
            ul.setAttribute("class","nav navbar-nav gap-2");  
            ul.setAttribute("role","tablist");                 
                dashboardItem(ul, elements.textId);                    
            div.appendChild(ul);  
        }
    }        
}
/////////////////////////////////////////////////////////////////////////////
function init() {
    const mode = document.querySelector('.content').dataset.mode;
    console.log('mode: ' + mode);   
    if (mode==='false') {
        const app = document.getElementById('eva-app');
        //console.log(app); 
        
        const navTab = document.getElementById("eva-nav");
        header(navTab);
        const div = document.createElement('div');   
        div.setAttribute("class", "d-flex flex-row flex-grow-1");                                  
        div.setAttribute("style", "height:calc(100vh - 96px); border: 1px solid #00ff92");       
            const div3 = document.createElement('div');           
            div3.setAttribute("class","col p-4 gap-2");
            div3.setAttribute("id","dashboard");            
            div3.setAttribute("data-app","{{ block('app') }}"); 
            dashboard(div3);
            div.appendChild(div3); 
        app.appendChild(div);   
    } 
}

document.addEventListener('DOMContentLoaded', init());