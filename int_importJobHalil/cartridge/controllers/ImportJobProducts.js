'use strict';
var ProductMgr = require('dw/catalog/ProductMgr');
var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Locale = require('dw/util/Locale');
var Countries = require('app_sitegenesis_core/cartridge/scripts/util/Countries');


function productsToXML() {
    //current locale country short code
	var countryCode;
	 countryCode = Countries.getCurrent({
	        CurrentRequest: {
	            locale: request.locale
	        }
		}).countryCode;

	var rightNow = new Date();
	//var localeStr = Locale.toString();

	var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
	var file : File = new File("Temp/Test/productList-of"+ "-"+ countryCode + "-"+res+".xml");
	var fileWriter : FileWriter = new FileWriter(file, "UTF-8");

	var it : SeekableIterator = ProductMgr.queryAllSiteProducts(); 
	var rootXML : XML = new XML(<products></products>); 
	var pXML : XML = new XML(<product></product>); 
	while(it.hasNext()) { 
		var product : Product = it.next(); 
		pXML.mn = product.getManufacturerName(); 
		pXML.name = product.getName(); 
		pXML.id = product.getID(); 
		rootXML.product+=pXML; 
	} 
	fileWriter.write(rootXML);
	fileWriter.close();
}

function productsToCSV() {
	//var localeStr = Locale.toString();
    // Date format
	var rightNow = new Date();
	var countryCode;
	countryCode = Countries.getCurrent({
		   CurrentRequest: {
			   locale: request.locale
		   }
	   }).countryCode;

	var res = rightNow.toISOString().slice(0,10).replace(/-/g,"");
	var file : File = new File("Temp/Test/productList-of"+ "-" + countryCode + "-" + res + ".csv");
	var fileWriter : FileWriter = new FileWriter(file, "UTF-8");

	var csvStreamWriter : CSVStreamWriter = new CSVStreamWriter(fileWriter);
	var it : SeekableIterator = ProductMgr.queryAllSiteProducts(); 

	while(it.hasNext()) { 
		var strArray = new Array();
		var product : Product = it.next(); 
    //var lineString = product.getBrand() + ',' + product.getName() + ',' + product.getID();
		strArray.push(product.getManufacturerName()); 
		strArray.push(product.getName()); 
		strArray.push(product.getID()); 
		csvStreamWriter.writeNext(strArray);
	}
	csvStreamWriter.close(); 
	fileWriter.close();
}
//exports
exports.productsToXML = productsToXML;
exports.productsToCSV = productsToCSV;