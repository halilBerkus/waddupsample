'use strict';

/**
 * Controller example for a product review form.
 */

/* Script Modules */
var app = require('app_sitegenesis_controllers/cartridge/scripts/app');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var ISML = require('dw/template/ISML');
var URLUtils = require('dw/web/URLUtils');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');
var CustomerMgr = require('dw/customer/CustomerMgr');

function start() {
	app.getView({
	    ContinueURL: URLUtils.https('HelloForm-HandleForm')
	    }).render('hello/helloform');
}

function handleForm() {
    app.getForm('helloform').handleAction({
        cancel: function () { 
            app.getForm('helloform').clear();
            response.redirect(URLUtils.https('HelloForm-HandleForm'));
        },
        submit: function (formgroup) {
          var validationResult = validateFields(formgroup);

            if (validationResult) {
                //app.getController('COCustomer').Start();
                dw.system.Transaction.wrap(function () {
                	var mycust = createCustomObject();
                    //formgroup.copyTo(mycust.custom);
                   var boolCopyHook = dw.system.HookMgr.hasHook("copyHook");

                	var newCustomObject = dw.system.HookMgr.callHook('copyHook', 'copyAttr', formgroup, mycust.custom._id);
                	   var ranstring = dw.system.HookMgr.callHook('extractXML', 'extract');
                    //mycust.custom.email = formgroup.email.value;
                    //mycust.custom.nickname = formgroup.nickname.value;
                    //mycust.custom.isActive = true;
                	//mycust.custom = newCustomObject.custom;
                });
        	app.getView().render('hello/helloformresult');
            } 
              else{
                  Logger.warn("You should enter values for each of the fields: {0}, {1}, {2}", formgroup.email.label, formgroup.nickname.label, formgroup.phone.label)
              }
        },
        returnHome: function () {
            app.getForm('helloform').clear();
            response.redirect(URLUtils.https('HelloForm-Start'));
        },
    });
}

/*function returnToHome() {
    app.getForm('helloform').handleAction({
        returnToHome: function () {
            app.getForm('helloform').clear();
                start();
        },
    });
}*/

function retrieveCustomerByLogin(login) {
    var customerByLogin = CustomerMgr.getCustomerByLogin(login);
    if (customerByLogin === null) {
        return null;
    }
    return customerByLogin;
};

function createCustomObject() {
    var customObject = CustomObjectMgr.createCustomObject("test", calculate());   
    if (customObject === null) {
        return null;
    }
    return customObject;
}

function calculate() {
   var bool = dw.system.HookMgr.hasHook("testHook");
   var ranstring = dw.system.HookMgr.callHook('testHook', 'createUnique');
   return ranstring;
}

function validateFields(formgroup){
    if(formgroup.nickname.value && formgroup.email.value && formgroup.phone.value){
        return true;
    }
    else return false;
}

/** Displays the template page. */
exports.Start = guard.ensure(['get'], start);
exports.HandleForm = guard.ensure(['post'], handleForm);