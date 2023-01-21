var lg_lg  = 'ru-ru';

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
    loguot             : '/',
    logo               : './image/logo192.png',
    image              : './image/astronautSpace.png',
    name               : 'EVA',
    Ent                : 'Enterprise',
    Dev                : 'Developer',
    about_program      : 'About program...',
    Version            : '1.0.0',

    //root
    lang               : root.$_code,
    button_close       : root.$_button_close,

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
    text_api               : column_left.$_text_api,
    text_attribute         : column_left.$_text_attribute,
    text_attribute_group   : column_left.$_text_attribute_group,
    text_backup            : column_left.$_text_backup,
    text_banner            : column_left.$_text_banner,
    text_catalog           : column_left.$_text_catalog,
    text_category          : column_left.$_text_category,
    text_country           : column_left.$_text_country,
    //column_left.$_text_coupon               ,
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
    //text_sale              : column_left.$_text_sale,
    text_setting           : column_left.$_text_setting,
    text_seo_url           : column_left.$_text_seo_url,
    text_statistics        : column_left.$_text_statistics,
    text_stock_status      : column_left.$_text_stock_status,
    text_system            : column_left.$_text_system,
    //text_tax               : column_left.$_text_tax,
    //text_tax_class         : column_left.$_text_tax_class,
    //column_left.$_text_tax_rate,
    //column_left.$_text_translation,
    text_theme             : column_left.$_text_theme,
    text_upload            : column_left.$_text_upload,
    text_user              : column_left.$_text_user,
    text_users             : column_left.$_text_users,
    text_user_group        : column_left.$_text_user_group,
    //column_left.$_text_voucher,
    //column_left.$_text_voucher_theme,
    //column_left.$_text_weight_class,
    //column_left.$_text_length_class,
    text_zone              : column_left.$_text_zone,
    text_recurring         : column_left.$_text_recurring,
    // column_left.$_text_order_recurring,
    // column_left.$_text_openbay_extension,
    // column_left.$_text_openbay_dashboard,
    // column_left.$_text_openbay_orders       ,
    // column_left.$_text_openbay_items        ,
    // column_left.$_text_openbay_ebay         ,
    // column_left.$_text_openbay_amazon       ,
    // column_left.$_text_openbay_amazonus     ,
    // column_left.$_text_openbay_etsy         ,
    // column_left.$_text_openbay_settings     ,
    // column_left.$_text_openbay_links        ,
    // column_left.$_text_openbay_report_price ,
    // column_left.$_text_openbay_order_import ,
    // column_left.$_text_paypal               ,
    // column_left.$_text_paypal_search        ,
    text_complete_status   : column_left.$_text_complete_status,
    text_processing_status : column_left.$_text_processing_status,
    text_other_status      : column_left.$_text_other_status,

    //dashboard
    heading_title  : dashboard.$_heading_title,    
    error_install  : dashboard.$_error_install,

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