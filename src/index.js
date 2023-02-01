let lg_lg  = 'ru-ru';

//language
const { root }        = require('./language/'+lg_lg+'/root.js');
const { login }       = require('./language/'+lg_lg+'/common/login.js');
const { header }      = require('./language/'+lg_lg+'/common/header.js');
const { column_left } = require('./language/'+lg_lg+'/common/column_left.js');
const { dashboard }   = require('./language/'+lg_lg+'/common/dashboard.js');
const { footer }      = require('./language/'+lg_lg+'/common/footer.js');
const { security }    = require('./language/'+lg_lg+'/common/security.js');
 
let content = {
    home               : '/',
    logout             : '/',
    logo               : './image/logo192.png',
    image              : './image/astronautSpace.png',
    shortIcon          : './image/astronautSpace.ico',
    name               : 'EVA',
    Ent                : 'Enterprise',
    Dev                : 'Developer',
    about_program      : 'About program...',
    Version            : '1.0.0',

    //root
    lang               : root.$_code,
    button_close       : root.$_button_close,
    button_add         : root.$_button_add,
    button_delete      : root.$_button_delete,
    button_edit        : root.$_button_edit,
    button_copy        : root.$_button_copy,
    button_update      : root.$_button_update,
    button_etc         : root.$_button_etc,
    button_save        : root.$_button_save,

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
    text_profile           : header.$_text_profile,
    text_store             : header.$_text_store,
    text_help              : header.$_text_help,
    text_homepage          : header.$_text_homepage,
    text_support           : header.$_text_support,
    text_documentation     : header.$_text_documentation,
    text_logout            : header.$_text_logout,

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
    text_api               : column_left.$_text_api,
    text_attribute         : column_left.$_text_attribute,
    text_attribute_group   : column_left.$_text_attribute_group,
    text_backup            : column_left.$_text_backup,
    text_banner            : column_left.$_text_banner,
    text_catalog           : column_left.$_text_catalog,
    text_category          : column_left.$_text_category,
    text_country           : column_left.$_text_country,    
    text_currency          : column_left.$_text_currency,
    text_customer          : column_left.$_text_customer,
    text_customer_group    : column_left.$_text_customer_group,
    text_customer_online   : column_left.$_text_customer_online,
    text_customer_approval : column_left.$_text_customer_approval,
    $_text_custom_field    : column_left.$_text_custom_field,
    text_dashboard         : column_left.$_text_dashboard,
    text_design            : column_left.$_text_design,
    text_download          : column_left.$_text_download,
    text_log               : column_left.$_text_log,
    text_event             : column_left.$_text_event,
    text_extension         : column_left.$_text_extension,
    text_filter            : column_left.$_text_filter,
    //text_geo_zone          : column_left.$_text_geo_zone,
    text_information       : column_left.$_text_information,
    text_installer         : column_left.$_text_installer,
    $_text_language        : column_left.$_text_language,
    text_language_editor   : column_left.$_text_language_editor,
    text_layout            : column_left.$_text_layout,
    text_localisation      : column_left.$_text_localisation,
    text_location          : column_left.$_text_location,
    text_contact           : column_left.$_text_contact,
    text_marketing         : column_left.$_text_marketing,
    text_marketplace       : column_left.$_text_marketplace,
    text_maintenance       : column_left.$_text_maintenance,
    text_menu              : column_left.$_text_menu,
    text_modification      : column_left.$_text_modification,
    text_manufacturer      : column_left.$_text_manufacturer,
    text_navigation        : column_left.$_text_navigation,
    text_option            : column_left.$_text_option,
    text_order             : column_left.$_text_order,
    text_order_status      : column_left.$_text_order_status,
    text_online            : column_left.$_text_online,
    text_product           : column_left.$_text_product,
    text_reports           : column_left.$_text_reports,
    text_review            : column_left.$_text_review,
    text_return            : column_left.$_text_return,
    text_return_action     : column_left.$_text_return_action,
    text_return_reason     : column_left.$_text_return_reason,
    text_return_status     : column_left.$_text_return_status,
    text_setting           : column_left.$_text_setting,
    text_seo_url           : column_left.$_text_seo_url,
    text_statistics        : column_left.$_text_statistics,
    text_stock_status      : column_left.$_text_stock_status,
    text_system            : column_left.$_text_system,
    text_theme             : column_left.$_text_theme,
    text_upload            : column_left.$_text_upload,
    text_user              : column_left.$_text_user,
    text_users             : column_left.$_text_users,
    text_user_group        : column_left.$_text_user_group,
    text_zone              : column_left.$_text_zone,
    text_recurring         : column_left.$_text_recurring,
    text_complete_status   : column_left.$_text_complete_status,
    text_processing_status : column_left.$_text_processing_status,
    text_other_status      : column_left.$_text_other_status,
    text_configmenu        : column_left.$_text_configmenu,

    //dashboard
    heading_title  : dashboard.$_heading_title,    
    error_install  : dashboard.$_error_install,
    text_addusers  : dashboard.$_text_addusers,

    //footer
    text_footer    : footer.$_text_footer,
    text_version   : footer.$_text_version,    
}

//if (content.logged == true){        
//    content.heading_title = header.$_heading_title;
//}else{    
//    content.heading_title = login.$_heading_title;
//} 

module.exports = { content }