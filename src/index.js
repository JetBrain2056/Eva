const lg_lg = process.env.LANGUAGE||'en-en'; 

//language
const { root }        = require('./language/'+lg_lg+'/root.js');
const { login }       = require('./language/'+lg_lg+'/common/login.js');
const { header }      = require('./language/'+lg_lg+'/common/header.js');
const { column_left } = require('./language/'+lg_lg+'/common/column_left.js');
const { dashboard }   = require('./language/'+lg_lg+'/common/dashboard.js');
const { footer }      = require('./language/'+lg_lg+'/common/footer.js');
const { app }         = require('./language/'+lg_lg+'/common/app.js');
 
let content = {
    home                   : '/',
    logout                 : '/',
    logo                   : './image/logo192.png',
    image                  : './image/astronautSpace.png',
    shortIcon              : './image/astronautSpace.ico',
    name                   : 'EVA',
    Ent                    : 'Enterprise',
    Dev                    : 'Developer', 
    Version                : '1.0.0',
    Information            : 'Information',    

    //root
    lang                   : root.$_code,
    button_close           : root.$_button_close,
    button_add             : root.$_button_add,
    button_delete          : root.$_button_delete,
    button_edit            : root.$_button_edit,
    button_copy            : root.$_button_copy,
    button_update          : root.$_button_update,
    button_etc             : root.$_button_etc,
    button_save            : root.$_button_save,
    button_select          : root.$_button_select,

    //login    
    text_heading           : login.$_text_heading,
    text_login             : login.$_text_login,
    text_forgotten         : login.$_text_forgotten,
    entry_username         : login.$_entry_username,    
    entry_password         : login.$_entry_password,
    button_login           : login.$_button_login,
    error_login            : login.$_error_login,
    error_token            : login.$_error_token,

    //header
    About_program          : header.$_about_program,
    Help                   : header.$_text_help,
    text_profile           : header.$_text_profile,
    text_store             : header.$_text_store,
    text_help              : header.$_text_help,
    text_homepage          : header.$_text_homepage,
    text_support           : header.$_text_support,
    text_documentation     : header.$_text_documentation,
    text_logout            : header.$_text_logout,
    text_config            : header.$_text_config,
    text_administration    : header.$_text_administration,
    text_roles             : header.$_text_roles,
    text_log               : header.$_text_log,
    text_users             : header.$_text_users,

    //column_left
    asideList              : [{href : '#', title : column_left.$_title_1 },
                              {href : '#', title : column_left.$_title_2 },
                              {href : '#', title : column_left.$_title_3 },
                              {href : '#', title : column_left.$_title_4 },
                              {href : '#', title : column_left.$_title_5 },    
                              {href : '#', title : column_left.$_title_6 },
                              {href : '#', title : column_left.$_title_7 },
                              {href : '#', title : column_left.$_title_8 },   
                              {href : '#', title : column_left.$_title_9 }],
    text_configmenu        : column_left.$_text_configmenu,

    //dashboard    
    dashboard              : dashboard,

    //footer
    text_footer            : footer.$_text_footer,
    text_version           : footer.$_text_version,    

    //app
    app                    : app
}

module.exports = { content }