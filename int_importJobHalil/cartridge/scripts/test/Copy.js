/**
* Script file for use in the Script pipelet node.
* To define input and output parameters, create entries of the form:
*
* @<paramUsageType> <paramName> : <paramDataType> [<paramComment>]
*
* where
*   <paramUsageType> can be either 'input' or 'output'
*   <paramName> can be any valid parameter name
*   <paramDataType> identifies the type of the parameter
*   <paramComment> is an optional comment
*
* For example:
*
*-   @input ExampleIn : String This is a sample comment.
*-   @output ExampleOut : Number
*
*/
var CustomObjectMgr = require('dw/object/CustomObjectMgr');


exports.copyAttr = function (formgroup, _id) {
	var newCustomObject = CustomObjectMgr.getCustomObject("test", _id);
	newCustomObject.custom.email = formgroup.email.htmlValue;
	newCustomObject.custom.name = formgroup.nickname.htmlValue;
	newCustomObject.custom.isActive = true;

	return newCustomObject;
}