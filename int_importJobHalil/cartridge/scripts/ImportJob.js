'use strict';
importPackage( dw.system );
importPackage( dw.object );


var Logger = require('dw/system/Logger');
var json = require('./generated.json');
var CustomObjectMgr = require('dw/object/CustomObjectMgr');

function importJob() {
	for (i = 0; i < json.length; i++) { 
        var object = CustomObjectMgr.createCustomObject("test", json[i]._id);   

		//let  object = CustomObjectMgr.createCustomObject("test", json[i]._id + "'");
		object.custom.email = json[i].email;
		object.custom.name = json[i].name;

		Logger.info("The object created successfully and the e-mail is : {0} and the name is {1}",object.custom.email, object.custom.name);
	}
}; 
exports.importJob = importJob;