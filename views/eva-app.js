let a = [];
selectRows = [];
let elementsModal;
n = 0;

//Commands on client/////////////////////////////////////////////////////////
function mask(val, length, accuracy) {    
    
    function triads(parts) { return new Intl.NumberFormat('ru').format(parts) }

    let newVal = '';          
    val = val.replace(/[^0-9,.]/g,'');
    val = val.replace('.',',').replace(' ','');    
    let valArr = val.split(',');        
    if (valArr.length===1) { 
        if (val.length > length-accuracy) {
            newVal = triads(valArr[0].slice(0,length-accuracy))+','+valArr[0].slice(length-accuracy,length)
        } else{
            newVal = triads(val);
        }                                  
    } else {    
        let valSumArr = '';
        if (valArr[2]) {
            valSumArr = valArr[1] + valArr[2];
        } else {
            valSumArr = valArr[1]; 
        }
        
        if (valArr[0].length > length-accuracy) {    
            newVal = triads(valArr[0].slice(0,length-accuracy))+','+valSumArr.slice(0,accuracy); 
        } else {            
            newVal = triads(valArr[0])+','+valSumArr.slice(0,accuracy);   
        }                                     
    } 
    if (newVal.slice(0,1)==='0'&&valArr[0].length>1) newVal = newVal.slice(1,newVal.length);
    if (newVal.slice(0,1)===','&&valArr[1].length>0) newVal = '0'+newVal;
    if (newVal===',') newVal='0,';
    
    return newVal;     
}
function setStatus(value) {
    let status = document.getElementById("status");
    status.value = value;
}
async function modalShow() {
    console.log('>>modalShow()...');   
    await selectModal.hide();     
    await currentModal.show();   
    if (elementsModal) await elementsModal.show();
}
async function openConst() {
    console.log('>>openConst()...');
        
    const refForm    = document.getElementById("create-const-form");  
    const tabForm    = document.getElementById("const-form");      
    refForm.reset();               
    refForm.setAttribute("eva-id", "Constant");
    refForm.setAttribute("eva-textId", "Constant");

    let tab = new bootstrap.Tab(tabForm);
    tab.show();    

    selectRows = [];

    await showConstTable();
    
    setStatus(">Open Constants");
}
async function openRef(refName, name) {
    console.log('>>openRef()...', refName, name);
              
    const tabForm = document.getElementById("ref-form");                      
    const refLink = document.querySelector("#"+refName);
    const refId   = refLink.getAttribute("eva-id");    
    const refType = refLink.getAttribute("eva-type");    
    const evaForm = document.getElementById("eva-ref-form");  
    evaForm.setAttribute("eva-id", refId);
    evaForm.setAttribute("eva-textId", refName);
    evaForm.setAttribute("eva-typeId", refType);
    evaForm.setAttribute("name", name);

    let tab = new bootstrap.Tab(tabForm);
    tab.show();    

    selectRows = [];
    
    await showRefTable(refName, refType, refId);
    
    setStatus(">Open "+refName+"s");
}
async function getColumns(textId) {
    res = await postOnServer({'textId': textId}, '/getrefcol');         
    let arrCol = [];
    for (elem of res) {
        const colName    = elem.column_name;
        const dataType   = elem.data_type;
        const identifier = elem.dtd_identifier;
        const maxlength  = elem.character_maximum_length; 
        const numPrec    = elem.numeric_precision;
        const numScale   = elem.numeric_scale;
        const obj = {'colName': colName, 'dataType':dataType, 'identifier': identifier, 
                     'maxlength': maxlength, 'numPrec':numPrec, 'numScale':numScale}          
        arrCol[colName] = obj;
    }
    return arrCol;
}
async function getSynonyms(evaForm) {
    console.log('>>getSynonyms()...');

    const id = evaForm.getAttribute("eva-id");    
    const resreq  = await postOnServer({'owner': id}, '/getreqs');  
    
    let arrSyn = [];  
    arrSyn['id'] = 'Id';
    arrSyn['name'] = 'Name';
    arrSyn['date'] = 'Date';
    arrSyn['number'] = 'Number';
    for (let elem of resreq) {
        let strJson = elem.data;          
        let Elements = await JSON.parse(strJson);  
        let colName = Elements.textId;
        arrSyn[colName] = Elements.synonum;
    }
    return arrSyn;
}
async function getReqs(evaForm) {
    console.log('>>getReqs()...');

    const id = evaForm.getAttribute("eva-id");    
    const resreq = await postOnServer({ 'owner': id }, '/getreqs');      
    let arrReq = [];  
    arrReq['id']     = {'synonum':'Id'};
    arrReq['name']   = {'synonum':'Name'};
    arrReq['date']   = {'synonum':'Date'};
    arrReq['number'] = {'synonum':'Number'};
    for (let elem of resreq) {
        let strJson = elem.data;          
        let Elements = await JSON.parse(strJson);  
        let colName = Elements.textId;
        arrReq[colName] = {'synonum':Elements.synonum, 'validation':Elements.validation, 'pattern':Elements.pattern};
    }
    return arrReq;
}
async function getTabPartSyns(id) {
    console.log('>>getTabPartSyns()...', id);
  
    const resreq = await postOnServer({'owner': id}, '/gettabpartreqs');  
    
    let arrReq = [];  
    arrReq['id'] = {'synonum':'Id'}
    arrReq['owner'] = {'synonum':'Owner'}
    for (let elem of resreq) {
        let strJson = elem.data;          
        let Elements = await JSON.parse(strJson);  
        let colName = Elements.textId;
        arrReq[colName] = {'synonum':Elements.synonum, 'validation':Elements.validation, 'pattern':Elements.pattern};
    }
    return arrReq;
}
async function constEditModal() {
    console.log('>>constEditModal()...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      

    const modalForm  = document.getElementById('constModal');             
    const inputForm  = modalForm.querySelector('#create-const-form');    
    inputForm.reset();        
      
    const inputName     = inputForm.querySelector('#input-const-name');  
    const inputValue    = inputForm.querySelector('#input-const-value');  
    const constValueBtn = inputForm.querySelector('#input-const-value_btn');     

    inputForm.reset();    

    let data = { 
        'textId' : 'Constant',
        'id'     : row.cells[0].innerText
    }

    let result = await postOnServer(data, '/getref');    
    if (result) {       
        let elem = result[0];
        inputForm.setAttribute("eva-id", elem.id);
        inputName.value        = elem.name;
        inputValue.setAttribute("data-type",elem.type);
         
        inputValue.removeAttribute("disabled"); 
        constValueBtn.setAttribute("hidden","hidden");

        if (elem.type==='String') {
            inputValue.setAttribute("type","text");
            inputValue.setAttribute("class","eva-req form-control"); 
            inputValue.value       = elem.value;              
        } else if (elem.type === 'Number') {
            inputValue.setAttribute("type","text");                    
            inputValue.setAttribute("inputmode","decimal");
            inputValue.setAttribute("class","eva-req form-control");              
            inputValue.setAttribute("pattern", "[0-9.]+");   
            inputValue.setAttribute("maxlength", "15");          
            inputValue.setAttribute("placeholder", "0.00");  
            inputValue.style = "text-align:right;";                        
            inputValue.value = elem.value;             
        } else if (elem.type === 'Date') {
            inputValue.setAttribute("type","date");
            inputValue.setAttribute("class","eva-req form-control");      
            if (elem.value==='') {                
                inputValue.value = '';
            } else {                                               
                inputValue.value = elem.value.slice(0,10);
                console.log(elem.value.slice(0,10));
            }   
        } else if (elem.type === 'Boolean') {
            inputValue.setAttribute("type","checkbox");
            inputValue.setAttribute("class","eva-req form-check-input");                         
            inputValue.checked       = (elem.value === 'true');                                                     
        } else { 
            inputValue.setAttribute("type","text");
            inputValue.setAttribute("disabled","disabled");
            inputValue.setAttribute("class","eva-req form-control");   
            const refName = elem.type.split('.');
            // console.log(refName);
            
            if (elem.value>0) {
                const ref = await postOnServer({'id':elem.value, 'textId':refName[1]}, '/getref');                                          
                // console.log(ref);
                if (ref) {
                    inputValue.value       = ref[0].name;  
                    inputValue.setAttribute("eva-id", ref[0].id)
                    constValueBtn.removeAttribute("hidden");  
                } else {        
                    inputValue.value       = '';  
                    constValueBtn.removeAttribute("hidden"); 
                }
            } else {    
                inputValue.value       = '';  
                constValueBtn.removeAttribute("hidden"); 
            }
        }
        
        currentModal = getModal(modalForm); 
    }    
}
async function constSave() {
    console.log('>>constSave()...');

    const inputForm  = document.getElementById("create-const-form");    
    const inputId    = inputForm.getAttribute("eva-id"); 
    const inputValue = inputForm.querySelector("#input-const-value"); 
    const type       = inputValue.getAttribute("data-type");

    let value;
    if (type==='Boolean') {        
        value = inputValue.checked;
    } else if (type==='String'||type==='Number') {
        value = inputValue.value;
    } else if (type==='Date') {
        if (inputValue.value==='') {
            value = '';
        } else {             
            value = inputValue.value.slice(0,10);
        }
    } else {
        value = inputValue.getAttribute("eva-id");
    }
      
    const data =  {
        'textId'  : 'Constant',
        'id'      : inputId,        
        'value'   : value
    }

    try {  
        result = await postOnServer(data, '/updateref');
        // console.log(result);  
    } catch (err) {
        console.log(err);
    }

    await currentModal.hide();

    if (result) await showConstTable();

}
async function elementBtn(idBtn) {
    console.log('>>elementBtn()...');
  
    const modalForm      = document.getElementById("selectElemModal");
    const inputElemValue = document.querySelector("#"+idBtn.split('_')[0]);
    const inputElemType  = inputElemValue.getAttribute("data-type");

    modalForm.setAttribute("eva-id", idBtn.split('_')[0]);

    const refType = inputElemType.split('.')[0];
    const refName = inputElemType.split('.')[1];

    modalForm.setAttribute("eva-type", inputElemType);

    currentModal.hide();
    if (elementsModal) elementsModal.hide();

    selectModal = getModal(modalForm);

    refTbl = buildTabpanel(modalForm, "270");

    let tmp = {'textId': refName};
    let data = await postOnServer(tmp, '/getrefs');   

    let col = {};
    let hide = [];
    let colType = {};
    if (refType==='Reference') {
        col  = {'id':'Id' ,'name':'Name'};          
    } else {
        col  = {'id':'Id' ,'number':'Number', 'date':'Date'};  
        hide = ['id'];   
        colType = {'date': 'timestamp with time zone'};
    }       

    showTable(refTbl, hide, col, data, colType);
}
async function elemSelect() {
    console.log('>>elemSelect()...');
    if (selectRows.length === 0) return;

    const row = selectRows[0];  

    const modalForm       = document.getElementById("selectElemModal");
    const id              = modalForm.getAttribute("eva-id");
    const type            = modalForm.getAttribute("eva-type");
    const inputElemValue  = document.querySelector('#'+id);    

    if (type.split('.')[0]==='Reference') {
        inputElemValue.value = row.cells[1].innerText;
    } else {                
        inputElemValue.value = type.split('.')[1]+' №' + row.cells[1].innerText + ' from ' + row.cells[2].innerText;
    }

    inputElemValue.setAttribute("eva-id", row.cells[0].innerText);    

    await selectModal.hide();
    await currentModal.show();
    if (elementsModal) await elementsModal.show();
}
async function createReq(refForm, textId, createMode, copyMode) {
    console.log('>>createReq()...');   
    let data =  { 'textId' : textId }

    const evaReqs   = refForm.getElementsByClassName('eva-req');     
    for(let elem of evaReqs) {      
        if ((createMode==='true'||copyMode==='true')&&elem.name==="id") {            
        } else {
            const type     = elem.getAttribute("type");
            const dataType = elem.getAttribute("data-type");
            if (type === 'checkbox') {                 
                data[elem.name] = elem.checked; 
            } else if (type === 'date') {
                if (elem.value === '') {
                    if (createMode==='false') data[elem.name] = null;                       
                } else {                    
                    data[elem.name] = new Date(elem.value);                           
                }
                console.log(data[elem.name]);                    
            } else if (type === 'number') {
                data[elem.name] = Number(elem.value); 
            } else if (type === 'text') {
                if (dataType === 'numeric') {                                          
                    data[elem.name] = Number(elem.value.replace(',','.').replace(/[^0-9.]/g,''));  
                } else if (dataType === 'integer') { 
                    data[elem.name] = Number(elem.value);  
                } else if (dataType === 'character varying') {  
                    data[elem.name] = String(elem.value);                   
                } else {         
                    const id = elem.getAttribute("eva-id");  
                    if (id) {
                        data[elem.name] = id;    
                    } else {
                        data[elem.name] = 0;   
                    }
                }
            }
        }    
    } 
    return data;
}
async function refCreate(e) {
    console.log('>>refCreate()...');

    const evaForm    = document.querySelector('#eva-ref-form');   
    const refId      = evaForm.getAttribute("eva-id");
    
    const refForm    = document.getElementById("create-ref-form");    
    const textId     = refForm.getAttribute("eva-textId");
    const typeId     = refForm.getAttribute("eva-typeId");    
    const createMode = refForm.getAttribute("create-mode");     
    const copyMode   = refForm.getAttribute("copy-mode");   
    const save       = refForm.getAttribute("eva-save");
    
    if (!refForm.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }
      
    data = await createReq(refForm, textId, createMode, copyMode); 
    try {
        if (createMode==='true'&&copyMode==='false') {
            result = await postOnServer(data, '/createref');                  
        } else if (createMode==='false'&&copyMode==='true') {             
            result = await postOnServer(data, '/createref'); 
            await copyTabPart(refForm, result);                             
        } else {    
            result = await postOnServer(data, '/updateref');
        }         
    } catch (err) {
        console.log(err);
    }
    
    if (save==='false') {
        await currentModal.hide();
    } else {
        refForm.setAttribute("eva-save", false);
        refForm.setAttribute("create-mode", false);  
        refForm.setAttribute("copy-mode", false);  
    }

    if (result) {        
        refForm.setAttribute("eva-id", result);
        await showRefTable(textId, typeId, refId);
    }
}
async function refModal() {
    console.log('>>refModal()...');      

    const modalForm  = document.getElementById('refModal');  

    const ul = modalForm.querySelector("#eva-nav-tabs-ref"); 
    ul.innerHTML = '';  
    
    addTabs(ul, 'Main');

    const refModalLabel  = modalForm.querySelector('#refModalLabel');  
    refModalLabel.innerText = 'Add an element:';    

    const createMode = true;
    const copyMode   = false;

    const refForm        = modalForm.querySelector('#create-ref-form');  
    refForm.innerHTML = '';
    refForm.reset();   
    refForm.setAttribute("create-mode", createMode);  
    refForm.setAttribute("copy-mode", copyMode);   
    refForm.setAttribute("eva-save", false);   

    currentModal = getModal(modalForm);
   
    const evaForm = document.querySelector('#eva-ref-form'); 
    const textId = evaForm.getAttribute("eva-textId");
    const typeId = evaForm.getAttribute("eva-typeId");
    refForm.setAttribute("eva-textId", textId);  
    refForm.setAttribute("eva-typeId", typeId);
    refForm.setAttribute("class","tab-content");

    const div = document.createElement("div");
    div.setAttribute("class","tab-pane active show");    
    div.setAttribute("id","nav-Main");
    div.setAttribute("role","tabpanel");
    refForm.appendChild(div);
    
    refForm.setAttribute("eva-id", 0);
    
    arrCol = await getColumns(textId);
    arrReq = await getReqs(evaForm);

    await refElement(div, arrCol, arrCol, createMode, copyMode, typeId, arrReq);            
    await tabParts(refForm, ul, textId);

    res = await postOnServer({owner:'Reference.'+textId}, '/getowner');     
    if (res) { 
        for (const row of res) {
            const refName = row.refName;
            addTabs(ul, refName);
            await tabOwner(refForm, textId, refName);
        }
    }
}
async function refEditModal(copyMode) {
    console.log('>>refEditModal()...'); 
  
    if (selectRows.length === 0) { return };

    const row = selectRows[0];      

    const modalForm  = document.getElementById('refModal');  

    const ul = modalForm.querySelector("#eva-nav-tabs-ref"); 
    ul.innerHTML = '';  
    
    addTabs(ul, 'Main');

    const refModalLabel    = modalForm.querySelector('#refModalLabel');  
    if (copyMode) {
        refModalLabel.innerText = 'Add an element:';
    } else {
        refModalLabel.innerText = 'Edit an element:';
    }   

    const createMode = false;    
          
    const refForm    = modalForm.querySelector('#create-ref-form');    
    refForm.reset();  
    refForm.innerHTML = '';     
    refForm.setAttribute("create-mode", createMode);  
    refForm.setAttribute("copy-mode", copyMode);   
    refForm.setAttribute("eva-save", false);  

    currentModal = getModal(modalForm);

    const evaForm    = document.querySelector('#eva-ref-form');   
    const textId = evaForm.getAttribute("eva-textId");
    const typeId = evaForm.getAttribute("eva-typeId");
    refForm.setAttribute("eva-textId", textId);
    refForm.setAttribute("eva-typeId", typeId);
    refForm.setAttribute("class","tab-content");

    const div = document.createElement("div");
    div.setAttribute("class","tab-pane active show");    
    div.setAttribute("id","nav-Main");
    div.setAttribute("role","tabpanel");
    refForm.appendChild(div);

    const id   = row.cells[0].innerText;    
    refForm.setAttribute("eva-id", id);
        
    arrCol = await getColumns(textId);
    arrReq = await getReqs(evaForm);

    const data = {'textId': textId, 'id': id}
    res = await postOnServer(data, '/getref');  
    await refElement(div, res[0], arrCol, createMode, copyMode, typeId, arrReq);     
    await tabParts(refForm, ul, textId);

    res = await postOnServer({owner:'Reference.'+textId}, '/getowner');      
    if (res) { 
        for (const row of res) {
            const refName = row.refName;
            addTabs(ul, refName);
            await tabOwner(refForm, textId, refName);
        }
    }
}
async function refDelete() {
    console.log('>>refDelete()...');
    
    const evaForm = document.getElementById("eva-ref-form");   
    const refId   = evaForm.getAttribute("eva-id");   
    const textId  = evaForm.getAttribute("eva-textId");        
    const typeId  = evaForm.getAttribute("eva-typeId");
    
    for (const row of selectRows) {
        const data = {'textId': textId, 'id': row.cells[0].innerText}
        result = await postOnServer(data, '/delref');        
    }

    if (result) await showRefTable(textId, typeId, refId);
}
async function refSave() {
    const docForm  = document.getElementById("create-ref-form");
    docForm.setAttribute("eva-save", true);
    await refCreate();
}
async function copyTabPart(ownerForm, ownerId) {
    console.log('>>copyTabPart()...', ownerId);

    const currentOwnerId = ownerForm.getAttribute("eva-id");
    
    let res = ownerForm.getElementsByClassName("tab-pane");  
    
    for (const tabPane of res) {
        if (tabPane.id==="nav-Main") continue;
        
        const textId  = tabPane.getAttribute("eva-id");  
        // console.log(textId);                         

        const data = {'textId': textId, 'owner': currentOwnerId}
        const result = await postOnServer(data, '/getrefs');   
        // console.log(result);
        for (const row of result) {             
            delete row['id'];
            delete row['createdAt'];
            delete row['updatedAt'];
            row['owner'] = ownerId;
            row['textId'] = textId;
            // console.log(row);        

            await postOnServer(row, '/createref');   
        }
    }

}
async function elemCreate(e) {
    console.log('>>elemCreate()...');

    const refModalForm = currentModal._element;
    const ownerForm  = refModalForm.querySelector('#create-ref-form');  
    const refForm    = document.getElementById("create-elem-form");

    const tabPane = ownerForm.querySelector(".tab-pane.active.show");     
    const textId  = tabPane.getAttribute("eva-id");      
    const tabId   = tabPane.getAttribute("eva-tabId");     
 
    const createMode   = refForm.getAttribute("create-mode");     
    const copyMode     = refForm.getAttribute("copy-mode");   
    const save         = refForm.getAttribute("eva-save");
        
    if (!refForm.checkValidity()) {
        await e.preventDefault();
        await e.stopPropagation();        
    }
    
    const ownerId     = ownerForm.getAttribute("eva-id");
    const ownerTextId = ownerForm.getAttribute("eva-textId");

    data = await createReq(refForm, textId, createMode, copyMode); 
    if (tabId==='0') {
        data['Reference.'+ownerTextId] = ownerId;
    } else {
        data['owner'] = ownerId;
    }

    try {
        if (createMode==='true'&&copyMode==='false') {
            result = await postOnServer(data, '/createref');                  
        } else if (createMode==='false'&&copyMode==='true') {             
            result = await postOnServer(data, '/createref');                           
        } else {    
            result = await postOnServer(data, '/updateref');
        }         
    } catch (err) {
        console.log(err);
    }

    if (save==='false') {
        await elementsModal.hide();
        elementsModal = "";
    } else {
        refForm.setAttribute("eva-save", false);
        refForm.setAttribute("create-mode", false);  
        refForm.setAttribute("copy-mode", false);  
    }

    if (tabId==='0') {        
        if (result) await showOwnerTable(tabPane, 'Reference.'+ownerTextId, textId);
    } else {        
        if (result) await showTabTable(tabPane, textId);
    }
}
async function elemModal() {
    console.log('>>elemModal()...');    
    
    const modalForm  = document.getElementById('elemModal');  

    const refModalLabel  = modalForm.querySelector('#elemModalLabel');  
    refModalLabel.innerText = 'Add an element:';    

    let createMode = true;
    let copyMode   = false;

    const refModalForm = currentModal._element;
    const ownerForm = refModalForm.querySelector('#create-ref-form');  

    const refForm        = modalForm.querySelector('#create-elem-form');  
    refForm.innerHTML = '';
    refForm.reset();   
    refForm.setAttribute("create-mode", createMode);  
    refForm.setAttribute("copy-mode", copyMode);   
    refForm.setAttribute("eva-save", false); 

    const tabPane = ownerForm.querySelector(".tab-pane.active.show");     
    const textId  = tabPane.getAttribute("eva-id");
    const tabId   = tabPane.getAttribute("eva-tabId");

    const ownerId      = ownerForm.getAttribute("eva-id");
    const ownerTextId  = ownerForm.getAttribute("eva-textId");

    if (Number(ownerId)===0) await refSave();

    elementsModal = getModal(modalForm);
       
    arrReq = await getTabPartSyns(tabId);         
    arrCol = await getColumns(textId);    
    
    if (tabId==='0') {
        arrReq['Reference.'+ownerTextId] = {'synonum':'Owner'};
        arrCol['Reference.'+ownerTextId] = Number(ownerId);
    }
    
    await refElement(refForm, arrCol, arrCol, createMode, copyMode, 'Element', arrReq);          
}
async function elemEditModal(copyMode) {
    console.log('>>elemEditModal()...'); 
  
    if (selectRows.length === 0) return;

    const row = selectRows[0];      

    const modalForm  = document.getElementById('elemModal');  

    const refModalLabel    = modalForm.querySelector('#elemModalLabel');  
    if (copyMode) {
        refModalLabel.innerText = 'Add an element:';
    } else {
        refModalLabel.innerText = 'Edit an element:';
    }   

    const createMode = false;    
          
    const refModalForm = currentModal._element;
    const ownerForm    = refModalForm.querySelector('#create-ref-form'); 
  
    const refForm    = modalForm.querySelector('#create-elem-form');    
    refForm.reset();  
    refForm.innerHTML = '';     
    refForm.setAttribute("create-mode", createMode);  
    refForm.setAttribute("copy-mode", copyMode);   
    refForm.setAttribute("eva-save", false); 

    elementsModal = getModal(modalForm);
    
    const tabPane = ownerForm.querySelector(".tab-pane.active.show");     
    const textId  = tabPane.getAttribute("eva-id");   
    const tabId   = tabPane.getAttribute("eva-tabId");
    refForm.setAttribute("eva-textId", textId);
    
    const ownerId     = ownerForm.getAttribute("eva-id");
    const ownerTextId = ownerForm.getAttribute("eva-textId");
    const id      = row.cells[0].innerText;

    arrReq = await getTabPartSyns(tabId);  
    arrCol = await getColumns(textId);    

    if (tabId==='0') arrReq['Reference.'+ownerTextId] = {'synonum':'Owner'};

    const data = {'textId': textId, 'id': id, 'owner': ownerId}
    res = await postOnServer(data, '/getref');      
    await refElement(refForm, res[0], arrCol, createMode, copyMode, 'Element', arrReq);       
}
async function elemDelete() {
    console.log('>>elemDelete()...');
     
    const refModalForm = currentModal._element;
    const ownerForm    = refModalForm.querySelector('#create-ref-form');    

    const ownerTextId = ownerForm.getAttribute("eva-textId");
  
    const tabPane = ownerForm.querySelector(".tab-pane.active.show");    
    const textId  = tabPane.getAttribute("eva-id");   
    const tabId   = tabPane.getAttribute("eva-tabId");   
    
    for (const row of selectRows) {
        const data = {
            'textId': textId,
            'id': row.cells[0].innerText
        }
        result = await postOnServer(data, '/delref');        
    }

    if (tabId==='0') {        
        if (result) await showOwnerTable(tabPane, 'Reference.'+ownerTextId, textId);
    } else {        
        if (result) await showTabTable(tabPane, textId);
    }
}
async function elemSave() {
    const elemForm  = document.getElementById("create-elem-form");
    elemForm.setAttribute("eva-save", true);    
    await elemCreate();
}
//DOM Dynamic Content////////////////////////////////////////////////////////
function addTabs(ul, tabName) {
    const li = document.createElement("li");        
    li.setAttribute("class","nav-item");                      
    li.setAttribute("id", "eva-item-"+tabName);  
    li.setAttribute("name", tabName);  
        const a = document.createElement("a");
        if (tabName==='Main') {
            a.setAttribute("class","nav-link active");                                       
        } else {
            a.setAttribute("class","nav-link");                                 
        }
        a.setAttribute("data-bs-toggle","tab");
        a.setAttribute("data-bs-target","#nav-"+tabName);
        a.setAttribute("role","tab");  
        a.setAttribute("href","#");                    
        a.setAttribute("name", tabName);  
        a.setAttribute("id", "eva-link-"+tabName);                                                        
        a.innerText = tabName;                                    
    li.appendChild(a);                             
    ul.appendChild(li);   
}
async function tabParts(refForm, ul, refName) {
    console.log('>>tabParts()...', refName);

    selectRows = [];
    
    const refLink = document.querySelector("#"+refName);
    const id      = refLink.getAttribute("eva-id");    
    
    res = await postOnServer({'owner': id}, '/gettabparts');         
    for (elem of res) {
        const tabId    = elem.id;
        const strJson  = elem.data;          
        const Elements = await JSON.parse(strJson);    
        addTabs(ul, Elements.textId);

        let textId = Elements.owner+'.'+Elements.textId;

        if (textId.substring(textId.length - 1)==='s') {
            textId = textId.substring(0, textId.length-1);
        }    

        const div = document.createElement("div");
        div.setAttribute("class","tab-pane");    
        div.setAttribute("id","nav-"+Elements.textId);
        div.setAttribute("role","tabpanel");
        div.setAttribute("eva-id", textId);
        div.setAttribute("eva-ownerId", id);
        div.setAttribute("eva-tabId", tabId);
        refForm.appendChild(div);    

        const navRefForm = document.getElementById("nav-ref-form");
        const tmpBtnToolbar = navRefForm.querySelector(".btn-toolbar");
        const btnToolbar = tmpBtnToolbar.cloneNode(true);        
        div.appendChild(btnToolbar);  

        const div2 = document.createElement("div");
        div2.setAttribute("class","eva-table"); 
        div2.setAttribute("id","eva-"+Elements.owner+"-"+Elements.textId+"-form"); 
        div.appendChild(div2);     
                
        const evaAdd  = btnToolbar.querySelector(".eva-add");
        const evaEdit = btnToolbar.querySelector(".eva-edit");
        const evaCopy = btnToolbar.querySelector(".eva-copy");
        const evaDel  = btnToolbar.querySelector(".eva-del");
        const evaRefresh = btnToolbar.querySelector(".eva-refresh");
        evaRefresh.setAttribute("name", refName);  
        evaRefresh.setAttribute("id", "eva-link-"+refName);              
        evaAdd .setAttribute("onclick","elemModal()");
        evaEdit.setAttribute("onclick","elemEditModal(false)");
        evaCopy.setAttribute("onclick","elemEditModal(true)");
        evaDel .setAttribute("onclick","elemDelete()");
        evaRefresh.setAttribute("onclick","");

        await showTabTable(div, textId);      
    }
}
async function tabOwner(refForm, textId, refName) {
    console.log('>>tabOwner()...', textId, refName);

    const refLink   = document.querySelector("#"+textId);
    const ownerId = refLink.getAttribute("eva-id"); 
    console.log('ownerId', ownerId);
 
    const div = document.createElement("div");
    div.setAttribute("class","tab-pane");    
    div.setAttribute("id","nav-"+refName);
    div.setAttribute("role","tabpanel");
    div.setAttribute("eva-id", refName);
    div.setAttribute("eva-ownerId", ownerId);
    div.setAttribute("eva-tabId", 0);
    refForm.appendChild(div);    

    const navRefForm = document.getElementById("nav-ref-form");
    const tmpBtnToolbar = navRefForm.querySelector(".btn-toolbar");
    const btnToolbar = tmpBtnToolbar.cloneNode(true);        
    div.appendChild(btnToolbar);  

    const div2 = document.createElement("div");
    div2.setAttribute("class","eva-table"); 
    div2.setAttribute("id","eva-"+refName+"-form"); 
    div.appendChild(div2);     
            
    const evaAdd  = btnToolbar.querySelector(".eva-add");
    const evaEdit = btnToolbar.querySelector(".eva-edit");
    const evaCopy = btnToolbar.querySelector(".eva-copy");
    const evaDel  = btnToolbar.querySelector(".eva-del");
    const evaRefresh = btnToolbar.querySelector(".eva-refresh");
    evaRefresh.setAttribute("name", refName);  
    evaRefresh.setAttribute("id", "eva-link-"+refName);              
    evaAdd .setAttribute("onclick","elemModal()");
    evaEdit.setAttribute("onclick","elemEditModal(false)");
    evaCopy.setAttribute("onclick","elemEditModal(true)");
    evaDel .setAttribute("onclick","elemDelete()");
    evaRefresh.setAttribute("onclick","");

    await showOwnerTable(div,  'Reference.'+textId, refName);      
}
async function refElement(refForm, col, arrCol, createMode, copyMode, typeId, arrReq) {
    console.log('>>refElement()...', typeId);  

    const textId = refForm.parentElement.getAttribute("eva-textId");
    
    if (col) {                  
        delete col['createdAt'];
        delete col['updatedAt'];
        for (let req of Object.keys(col)) {            
            const label  = document.createElement("label");
            label.setAttribute("for","input-ref-"+req);
                       
            const reqs = arrReq[req];        
            console.log(reqs);      
            let validation = false;
            let pattern    = '';
            if (reqs) {
                validation = reqs.validation;
                pattern    = reqs.pattern;            
            }
            if (reqs&&reqs.synonum) {                    
                label.innerText = reqs.synonum+":";         
            } else {                                    
                label.innerText = req+":";  
            }  
            
            refForm.appendChild(label);
            const div  = document.createElement("div");
            div.setAttribute("class", "input-group input-group-sm col-auto");
            refForm.appendChild(div);                
                const input  = document.createElement("input");       
                const btn    = document.createElement("button");
                let type = arrCol[req];                
                if (req.split('.').length > 1) {
                    input.setAttribute("type","text");
                    input.setAttribute("class","eva-req form-control"); 
                    input.setAttribute("disabled","disabled");   
                    // input.oninput = function() { input.value = input.value.replace(/[^]/g,'') }                 
                    input.setAttribute("data-type", req);
                    const reqName = req.split('.')[1].toLowerCase();
                    input.id    = "input-ref-"+reqName;
                    input.name  = req;
                    btn.setAttribute("class","btn btn-outline-secondary");
                    btn.setAttribute("id","input-ref-"+reqName+"_btn");
                    btn.setAttribute("type","button");
                    btn.setAttribute("onclick","elementBtn(id)");      
                    btn.innerText ="...";
                } else {
                    if (type.dataType === 'character varying') {
                        input.setAttribute("type","text");                    
                        input.setAttribute("class","eva-req form-control");                           
                        if (type.maxlength) input.setAttribute("maxlength", type.maxlength);                        
                    } else if (type.dataType === 'integer') {
                        input.setAttribute("type","number");                    
                        input.setAttribute("class","eva-req form-control");                          
                        input.setAttribute("maxlength", type.numPrec);    
                        input.setAttribute("placeholder", "0");                          
                    } else if (type.dataType === 'numeric') {
                        input.setAttribute("type","text");                    
                        input.setAttribute("inputmode","decimal");
                        input.setAttribute("class","eva-req form-control");                                                                                       
                        input.setAttribute("step", 0.01); 
                        input.setAttribute("min", 0.0);                                                                                                                                                                                                        
                        input.setAttribute("placeholder", "0,00");  
                        input.style = "text-align:right;";
                        if (createMode===true||input.value===0) input.value = '0,00';                                           
                        input.oninput = function() { input.value = mask(input.value, type.numPrec, type.numScale) }
                    } else if (type.dataType === 'timestamp with time zone') {
                        input.setAttribute("type","date");
                        input.setAttribute("class","eva-req form-control");
                    } else if (type.dataType === 'boolean') {
                        input.setAttribute("type","checkbox");
                        input.setAttribute("class","eva-req form-check-input");     
                    }
                    input.setAttribute("data-type", type.dataType);
                    input.id    = "input-ref-"+req;
                    input.name  = req;    
                    if (pattern) input.setAttribute("pattern", pattern);                   
                }
             
                if (req==='id'||req==='owner') {
                    input.setAttribute("disabled","disabled");                    
                    if (typeId==='Document'||typeId==='Element') {
                        label.setAttribute("hidden", "hidden");
                        input.setAttribute("hidden", "hidden");
                    }
                }
                if (req==='name'||req==='date'||validation===true) {
                    input.setAttribute("required", "required");                    
                }
                
                if (createMode===true) {
                    if (type.dataType === 'timestamp with time zone') {   
                        if (req==='date')  {                            
                            input.value = dateFormat(Date.now()).slice(0,10);
                        } else {
                            input.value = '';                        
                        }
                    } else {
                        if (arrReq[req].synonum==='Owner') { 
                            resRef = await postOnServer({'id': col[req], 'textId':req.split('.')[1]}, '/getref');
                            if (resRef.length===1) {
                                input.value = resRef[0].name;                                
                                input.setAttribute("eva-id", resRef[0].id);
                            }
                        } else {
                            if (req==='number') {
                                const number = await postOnServer({owner:textId},'/getnumber');
                                const textNumber = '00000000'+String(number);
                                input.value = textNumber.slice(-9);
                            } else {
                                input.value = '';
                            }
                        }
                    }
                } else if (createMode===false) {
                    if (type.dataType === 'boolean') {
                        input.checked = col[req];
                    } else if (type.dataType === 'timestamp with time zone') {
                        const date = col[req];                                               
                        if (date) input.value = date.slice(0, 10);
                    } else  if (type.dataType === 'numeric') {
                        const val = col[req]; 
                        if (val) input.value = new Intl.NumberFormat('ru', {minimumFractionDigits: type.numScale}).format(val); 
                    } else {
                        if (req.split('.').length > 1) {
                            const textIdArr = req.split('.');
                            resRef = await postOnServer({'id': col[req], 'textId':textIdArr[1]}, '/getref');
                            if (resRef.length===1) {
                                if (textIdArr[0]==='Reference') {
                                    input.value = resRef[0].name;                                
                                } else {
                                    const d = new Date(resRef[0].date);                                    
                                    input.value = textIdArr[1]+' №'+resRef[0].number+' from '+new Intl.DateTimeFormat('ru').format(d);                                
                                }
                                input.setAttribute("eva-id", resRef[0].id);
                            } else {
                                input.value = '';
                                input.setAttribute("eva-id", 0);
                            }
                        } else {
                            input.value = col[req];
                        }
                    }                    
                    if (copyMode===true&&input.name==="id") {
                        input.value = '';
                    }
                }                
             
                div.appendChild(input); 
                if (req.split('.').length > 1) div.appendChild(btn);
        }        
    } 
}
function closeTabRef(id) {
    console.log('>>closeTabRef()...');  

    const refForm = document.getElementById("nav-ref-form");
    const ul = refForm.querySelector("#eva-nav-tabs");   

    let navItem = ul.getElementsByClassName("nav-item");    
    const evaLink = document.getElementById(id);   
    if (evaLink) {   
        if (navItem.length > 1) {                              
            evaLink.parentElement.remove();  
            const refName = navItem[navItem.length-1].getAttribute("name");                              
            const name    = navItem[navItem.length-1].getAttribute("eva-name");  
            openRef(refName, name);
        } else {
            const Desktop = document.getElementById("Desktop");
            if (Desktop) { 
                evaLink.parentElement.remove();
                Desktop.click();
            }
        }
    }
}
function openTabRef(id, refName) {
    console.log('>>openTabRef()...');  
      
    const evaLink = document.getElementById(id);   
    if (evaLink) {    
        const name = evaLink.parentElement.getAttribute("eva-name");
        openRef(refName, name);
    }
}
function buildTable(refName, refType) {
    console.log('>>buildTable()...');  

    const evaForm = document.querySelector('#eva-ref-form'); 
    const name    = evaForm.getAttribute("name");

    const refForm = document.getElementById("nav-ref-form");
    refForm.setAttribute("eva-textId", refName);

    const ul = refForm.querySelector("#eva-nav-tabs");   
    let evaLink = ul.querySelector("#eva-item-"+refName);   
    
    if (!evaLink) {                                   
        const li = document.createElement("li");        
        li.setAttribute("class","nav-item d-flex justify-content-end");                      
        li.setAttribute("id", "eva-item-"+refName);  
        li.setAttribute("name", refName);  
        li.setAttribute("eva-name", name); 
            const a = document.createElement("a");
            a.setAttribute("class","nav-link active p-1 pe-4");                                
            a.setAttribute("href","#");                    
            a.setAttribute("name", refName);              
            a.setAttribute("id", "eva-link-"+refName);                                               
            a.setAttribute("onclick", "openTabRef(id,name)");   
            a.innerText = name+'s '; 
            const button = document.createElement("button");
            button.setAttribute("type","button");
            button.setAttribute("class","btn-close position-absolute p-2");                
            button.setAttribute("href","#");                          
            button.setAttribute("id", "eva-btn-"+refName);            
            button.setAttribute("onclick", "closeTabRef(id)");                                     
        li.appendChild(a);                             
        li.appendChild(button); 
        ul.appendChild(li);          
    }

    const refFormLabel = refForm.querySelector("#refFormLabel"); 
    refFormLabel.innerText = name+'s';
    
    const btnToolbar = refForm.querySelector(".btn-toolbar");     
    const evaAdd  = btnToolbar.querySelector(".eva-add");
    const evaEdit = btnToolbar.querySelector(".eva-edit");
    const evaCopy = btnToolbar.querySelector(".eva-copy");
    const evaDel  = btnToolbar.querySelector(".eva-del");
    const evaRefresh = btnToolbar.querySelector(".eva-refresh");
    evaRefresh.setAttribute("name", refName);  
    evaRefresh.setAttribute("id", "eva-link-"+refName);   
    if (refType==='Reference'||refType==='Document') {           
        evaAdd .setAttribute("onclick","refModal()");
        evaEdit.setAttribute("onclick","refEditModal(false)");
        evaCopy.setAttribute("onclick","refEditModal(true)");
        evaDel .setAttribute("onclick","refDelete()");
        evaRefresh.setAttribute("onclick","openTabRef(id,name)");
    }

    resTbl = buildTabpanel(refForm, "208");
    return resTbl;
}
async function showConstTable() {
    console.log('>>showConstTable()...');     
    
    let formTbl = document.getElementById("nav-const-form");    

    resTbl = buildTabpanel(formTbl, "210");

    const tmp = {'textId': 'Constant'}
    result = await postOnServer(tmp, '/getrefs');   
   
    let data = [];
    let colType = {};
    for (let row of result) {
        let refName = row.type.split('.');
        if (refName[0]==='Reference'&&row.value>0) {            
            ref = await postOnServer({'id':row.value, 'textId':refName[1]}, '/getref');                       
            data.push(Object.assign(row,{'value':ref[0].name}));            
        } else {
            data.push(row);
        }
    }
    
    const col  = {'id':'Id', 'name':'Name', 'value':'Value', 'type':'Type'} 
    const hide = ['id','type'];          
    
    await showTable(resTbl, hide, col, data, colType);
}
async function showRefTable(refName, refType, refId) {
    console.log('>>showRefTable()...', refName, refType, refId);   

    refTbl = buildTable(refName, refType);
    
    const tmp = {'textId': refName}
    const data = await postOnServer(tmp, '/getrefs');

    const evaForm = document.querySelector('#eva-ref-form');        
    arrSyn = await getSynonyms(evaForm);     
    
    res = await postOnServer(tmp, '/getrefcol');  
    let col = {};   
    let colType = {};           
    for (elem of res) {
        const colName  = elem.column_name;            
        const dataType = elem.data_type;            
        const synom    = arrSyn[colName];
        if (synom) {
            col[colName] = synom;  
        } else {          
            col[colName] = colName;            
        } 
        colType[colName] = dataType;
    }

    let hide = [];  
    if (refType==='Document') { hide = ['id'] }

    if (refId) {
        res = await postOnServer({'id': refId},'/getobject');        
        if (res) {
            const strJson  = res.data;          
            const Elements = await JSON.parse(strJson);                                         
            if (Elements.hideId===true) { hide = ['id'] }                  
        } 
    }

    showTable(refTbl, hide, col, data, colType);
}
async function showTabTable(refForm, refName) {
    console.log('>>showTabTable()...', refName);   

    resTbl = buildTabpanel(refForm, "295");

    const ownerForm = document.querySelector("#create-ref-form")
    const id = ownerForm.getAttribute("eva-id");        

    const tmp = {'textId': refName, 'owner': id}
    const data = await postOnServer(tmp, '/getrefs');

    const tabId = refForm.getAttribute("eva-tabId");
    
    arrReq = await getTabPartSyns(tabId);      
    
    const res = await postOnServer(tmp, '/getrefcol');  
    let col = {};   
    let colType = {};           
    for (elem of res) {
        const colName  = elem.column_name;            
        const dataType = elem.data_type;            
        const synom    = arrReq[colName].synonum;
        if (synom) {
            col[colName] = synom;  
        } else {          
            col[colName] = colName;            
        } 
        colType[colName] = dataType;
    }

    const hide = ['id','owner']; 

    showTable(resTbl, hide, col, data, colType);
}
async function showOwnerTable(refForm, owner, refName) {
    console.log('>>showOwnerTable()...', refName);   

    resTbl = buildTabpanel(refForm, "295");

    const ownerForm = document.querySelector("#create-ref-form")
    const id = ownerForm.getAttribute("eva-id");        

    const tmp = {'textId':refName, 'id':id, 'owner':owner}     
    const data = await postOnServer(tmp, '/getownerrefs');

    const evaForm = document.querySelector('#eva-ref-form');        
    arrSyn = await getSynonyms(evaForm);  
    
    const res = await postOnServer({'textId':refName}, '/getrefcol');  
    let col = {};   
    let colType = {};           
    for (elem of res) {
        const colName  = elem.column_name;            
        const dataType = elem.data_type;            
        const synom    = arrSyn[colName];
        if (synom) {
            col[colName] = synom;  
        } else {          
            col[colName] = colName;            
        } 
        colType[colName] = dataType;
    }

    let hide = ['id', owner]; 

    showTable(resTbl, hide, col, data, colType);
}
function addTabPane(name) {
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
    li.appendChild(a[name]);     
    navTab.appendChild(li);      

    addTabPane(name);
}
function navHiddenItem(navTab, name) {    
    const li = document.createElement("li");        
        li.setAttribute("class","nav-item");
        li.setAttribute("hidden","hidden");
            const a = document.createElement("a");
            a.setAttribute("class","nav-link eva-link-"+name);
            a.setAttribute("id",name+"-form");
            a.setAttribute("data-bs-toggle","tab");
            a.setAttribute("data-bs-target","#nav-"+name+"-form");
            a.setAttribute("role","tab");
            a.setAttribute("aria-controls","nav-"+name+"-form");
            a.setAttribute("aria-selected","false");
        li.appendChild(a);    
    navTab.appendChild(li);               
}
function navLink(nav, name, id, type, textId) {
    console.log('>>navLink()...', type);
    const li = document.createElement('div');
        const a = document.createElement('a');
        a.setAttribute("class","icon-link eva-link p-1");
        a.setAttribute("id", textId);           
        a.setAttribute("eva-id", id);  
        a.setAttribute("eva-type", type);
        a.setAttribute("name", name);
        a.innerText = name+'s';
        a.href="#";
        a.setAttribute("style","color: grey;font-size: 19px;");          
        a.setAttribute("onclick", "openRef(id, name)");  
    li.appendChild(a);           
    nav.appendChild(li);     
}
function collapseLink(div, nav, name, n) {

    const a = document.createElement('div');
    a.setAttribute("class","icon-link");    
    a.setAttribute("style","color: #555555;font-size: 19px;");     
    a.setAttribute("data-bs-toggle","collapse"); 
    a.setAttribute("data-bs-target","#collapse-link-"+n);     
    a.href="#";
    a.innerText = name;
        const i = document.createElement("i");
        i.setAttribute("class","fa fa-caret-down");
        i.setAttribute("aria-hidden","true");    
    a.appendChild(i);
    div.appendChild(a);  

    nav[n] = document.createElement('nav');       
    nav[n].setAttribute("class","collapse show container-fluid");    
    nav[n].setAttribute("id","collapse-link-"+n); 
    a.appendChild(nav[n]);   

    return nav;
}
async function tabDesk() {
    console.log('>>tabDesk()...');
    const div = document.querySelector("#nav-Desktop");
    
    const a = document.createElement('a');
    a.setAttribute("class","link icon-link");    
    a.setAttribute("style","color: #555555;font-size: 19px;");  
    a.href="#";  
    a.innerText = 'Constants';
    a.setAttribute("id", "Constants");           
    a.setAttribute("eva-id", "Constants");  
    a.setAttribute("onclick", "openConst()");  
    div.appendChild(a);  

    let nav = [];
    nav = collapseLink(div, nav, 'References', 0);
    nav = collapseLink(div, nav, 'Documents' , 1);
    
    let data = await getOnServer('/getconfig');
    for (const row of data) {
        const id       = row.id;
        const strJson  = row.data; 
        const elements = await JSON.parse(strJson);  
        let name = elements.textId;
        if (elements.objectRep) name = elements.objectRep;    

        if (row.state===0 && elements.typeId==='Reference') {                                                   
            navLink(nav[0], name, id, elements.typeId, elements.textId);                                  
        } else if (row.state===0 && elements.typeId==='Document') {    
            navLink(nav[1], name, id, elements.typeId, elements.textId);                               
        }
    }        
}
async function tabRef() {
    console.log('>>tabRef()...');
    const div = document.querySelector("#nav-References");
    let data = await getOnServer('/getconfig');
    for (const row of data) {
        const id       = row.id;
        const strJson  = row.data;         
        const elements = await JSON.parse(strJson);
        let name = elements.textId;
        if (elements.objectRep) name = elements.objectRep;   
        if (row.state===0 && elements.typeId==='Reference') {                    
            const nav = document.createElement('nav');
            nav.setAttribute("class","nav flex-column");                 
                navLink(nav, name, id, elements.typeId, elements.textId);                    
            div.appendChild(nav);          
        }
    }        
}
async function tabSubsys(div, nameSub) {
    console.log('>>tabSubsys()...');

    let data = await getOnServer('/getconfig');
    for (let row of data) {
        const id       = row.id;
        const strJson  = row.data;         
        const elements = await JSON.parse(strJson);
        let name = elements.textId;
        if (elements.objectRep) name = elements.objectRep;   
        if (row.state===0 && (elements.typeId==='Document'||elements.typeId==='Reference') && elements.subsysName===nameSub) {                    
            const nav = document.createElement('nav');
            nav.setAttribute("class","nav flex-column");                 
                navLink(nav, name, id, elements.typeId, elements.textId);                    
            div.appendChild(nav);          
        }
    }        
}
async function header() {
    console.log('>>header()...');

    navTab = document.getElementById("eva-nav");   
    //HIDDEN
    navHiddenItem(navTab,'const');   
    navHiddenItem(navTab,'ref');  
          
    //MAIN
    navItem(navTab, 'Desktop'); 
    navItem(navTab, 'References');         
    navItem(navTab, 'Reports');    

    //DYNAMIC    
    data = await getOnServer('/subsystems');    
    for (row of data) {        
        navItem(navTab, row.name);           
    }      
   
    tabDesk();  
    tabRef();  
 
    //Subsystems
    for (row of data) {     
        // console.log('name', row.name);           
        div = document.querySelector("#nav-"+row.name);
        tabSubsys(div, row.name);
    }  
}
/////////////////////////////////////////////////////////////////////////////
function appContent() {

    const app = document.getElementById('eva-app');
    app.setAttribute("class","col tab-content p-3 eva-subsys");    
    app.style="height:calc(100vh - 95.5px); border: 1px solid #00ff92";

    setStatus('>Onload...');  
}
function init() {
    
    const content = document.querySelector('.content');
    const mode   = content.dataset.mode;
    const logged = content.dataset.logged;      
    if (mode==='false'&&logged==='true') {                          
        appContent();
        header();                                           
    } 
}
       
document.addEventListener('DOMContentLoaded', init());