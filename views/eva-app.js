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
function openRef() {
    console.log('>>openRef()...');

    const navUsers = document.getElementById("nav-users");

    const $dashboard = document.getElementById("dashboard");
    $dashboard.innerHTML = "It's work!";

}

//const Counterpartie = document.getElementById("Counterpartie");
//Counterpartie.addEventListener("click", await openRef());

//Content////////////////////////////////////////////////////////////////////
async function navItem(navTab, name) {
    const li = document.createElement('li');
    li.setAttribute("class","nav-item");
        const a = document.createElement('a');
        a.setAttribute("class","nav-link");        
        a.setAttribute("id", name);           
        a.innerText = name;        
    li.appendChild(a); 
    navTab.appendChild(li); 
}
async function header(navTab) {
    console.log('>>header()...');
    //MAIN
    await navItem(navTab, 'Desktop');
    await navItem(navTab, 'References');    
    await navItem(navTab, 'Service');    
    
    let data = await getSubsystems();
    console.log(data);
    for (let row of data) {
        console.log(row.name);
        li = await navItem(navTab, row.name);          
    }
}
async function dashboard(div) {
    console.log('>>dashboard()...');

    const div2 = document.createElement('div');
    div2.setAttribute("class", "tab-content p-4 gap-2");          
        const div4 = document.createElement('div');
        div4.setAttribute("class", "tab-pane fade");   
        div4.setAttribute("role", "tabpanel");          
        div2.appendChild(div4);  
    div.appendChild(div2);  

    let data = await getConfig();
    for (let row of data) {
        let strJson = row.data; 
        let elements = await JSON.parse(strJson);
        if (!row.state===0||elements.typeId==='Constant'||elements.typeId==='Subsystem') {
            console.log(elements.typeId);
        } else {    
            const a = document.createElement('a');
            a.setAttribute("class","nav-link");  
            a.setAttribute("style","color:grey;font-size: 19px;");  
            a.innerText = elements.textId;
            a.setAttribute("onclick", "openRef()");
            div2.appendChild(a);  
        }
    }        
}
/////////////////////////////////////////////////////////////////////////////
function init() {
    const mode = document.querySelector('.content').getAttribute('data-mode');
    console.log('mode: ' + mode);   
    if (mode==='false') {
        const app = document.getElementById('eva-app');
        //console.log(app); 
        
        const navTab = document.getElementById("eva-nav");
        header(navTab);
        const div = document.createElement('div');   
        div.setAttribute("class", "d-flex flex-row flex-grow-1");                          
            const div3 = document.createElement('div');
            div3.setAttribute("id","dashboard");
            div3.setAttribute("class","col");
            div3.setAttribute("style", "height:calc(100vh - 96px); border: 1px solid #00ff92");                
            //div3.insertAdjacentHTML = '{% include "./template/common/dashboard.twig" %}';
            dashboard(div3);
            div.appendChild(div3); 
        app.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', init());