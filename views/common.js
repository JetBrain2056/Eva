
const user_tab = document.getElementById('user_table');
user_tab.addEventListener('click', row_select);   

const user_table = () => {
  //const response = await fetch('http://192.168.1.8:3000/users');
  //const data = await response.json();
  
  fetch('/users')    
    .then(res => res.json())
    .then(data => {
      
      user_tab.innerHTML = "";

      const thead = document.createElement('thead');
      user_tab.appendChild(thead);

      let tr = document.createElement('tr');
      thead.appendChild(tr);

      //const th1 = document.createElement('th');
      const th2 = document.createElement('th');
      const th3 = document.createElement('th');
      const th4 = document.createElement('th');

      //tr.appendChild(th1);
      tr.appendChild(th2);
      tr.appendChild(th3);
      tr.appendChild(th4);

      //const text1 = document.createTextNode('#');
      const text2 = document.createTextNode('id');
      const text3 = document.createTextNode('Name');
      const text4 = document.createTextNode('Descr');

      //th1.appendChild(text1);
      th2.appendChild(text2);
      th3.appendChild(text3);
      th4.appendChild(text4);

      const tbody = document.createElement("tbody");
      user_tab.appendChild(tbody);
      
      for (const element of data) {
      
        tr = document.createElement("tr");
        tbody.appendChild(tr);
        
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');

        td2.textContent = element.id;
        td3.textContent = element.Name;
        td4.textContent = element.Descr;
  
        //tr.appendChild(td);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);      
      };     
  });
}
function user_create()  {
  const input_username = document.getElementById('input-username');
  const input_password = document.getElementById('input-password');
  const input_descr    = document.getElementById('input-descr');
  const input_eauth    = document.getElementById('input-eauth');

  if (input_username.value === "")
  {alert("Не заполнено имя пользователя!"); return "";}
  
  const user =  { 'Name'    : input_username.value,
                  'Descr'   : input_descr.value,
                  'Password': input_password.value,
                  'RolesID' : '1',
                  'EAuth'   : input_eauth.value,
                  'Show'    : '1'
  };
  console.log(user);

  fetch('/create', { 
    method  : 'post',  
    headers : {"Content-type": "application/x-www-form-urlencoded; charset=UTF-8"},       
    //headers: {"Content-Type": "application/json"},
    //body: JSON.stringify(user)
    body: new URLSearchParams(user),
    //body    : 'Name=test&Descr=test' 
  })
  .then(res => res.json())  
  .then(data => {  
    console.log('Request succeeded with JSON response', data);  
  })  
  .catch(error => {
    console.log('Request failed', error);
  });      

  user_table(); 
}
function user_delete() {
}
function row_select(event) {      
  console.log(event);
}  

user_table();