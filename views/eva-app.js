
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
async function header(navTab) {
    
    let data = await getSubsystems();
    console.log(data);
    for (let row of data) {
        console.log(row.name);
        const li = document.createElement('li');
        li.setAttribute("class","nav-item");
        const a = document.createElement('a');
        a.setAttribute("class","nav-link active");        
        a.innerText = row.name;
        li.appendChild(a); 
        navTab.appendChild(li); 
    }
}
function init() {
    const mode = document.querySelector('.content').getAttribute('data-mode');
    console.log('mode: ' + mode);   
    if (mode==='false') {
        const app = document.getElementById('eva-app');
        console.log(app); 
        
        const navTab = document.getElementById("eva-gen");
        header(navTab);
        const div = document.createElement('div');
        console.log(div);
        div.setAttribute("class", "d-flex flex-row flex-grow-1");              
            const div2 = document.createElement('div');
            const div3 = document.createElement('div');
            div3.setAttribute("class","col");
            div3.setAttribute("style", "height:calc(100vh - 99.5px);");               
            div3.insertAdjacentHTML = '{% include "./template/common/dashboard.twig" %}';
            div.appendChild(div3); 
        app.appendChild(div);
    }
}

document.addEventListener('DOMContentLoaded', init());