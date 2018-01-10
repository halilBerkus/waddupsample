'use strict';
//var ProductMgr = require('dw/catalog/ProductMgr');
var guard = require('app_sitegenesis_controllers/cartridge/scripts/guard');
var app = require('app_sitegenesis_controllers/cartridge/scripts/app');

var FileWriter = require('dw/io/FileWriter');
var File = require('dw/io/File');
var CSVStreamWriter = require('dw/io/CSVStreamWriter');
var Locale = require('dw/util/Locale');
var Countries = require('app_sitegenesis_core/cartridge/scripts/util/Countries');
var ProductSearchModel = require('dw/catalog/ProductSearchModel');
var SearchModel = require('dw/catalog/SearchModel');
var ProductVariationModel = require('dw/catalog/ProductVariationModel');

function productsToXML() {
	var productSearchModel: ProductSearchModel = new ProductSearchModel();
	var rootXML: XML = new XML(<products></products>);
	var pXML: XML = new XML(<product></product>);
	// execute the product search
	productSearchModel.setCategoryID('root');
	productSearchModel.search();
	var products = productSearchModel.getProducts();
	//var catalog = CatalogMgr.getCatalog('root');

	while (products.hasNext()) {
		var product = products.next();
		var variationModel: ProductVariationModel = product.variationModel;

		var productID = product.getID();

		// current locale country short code
		var countryCode;
		countryCode = Countries.getCurrent({
			CurrentRequest: {
				locale: request.locale
			}
		}).countryCode;

		var rightNow = new Date();



		var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
		var file: File = new File("Temp/Test/productList-of" + "-" + countryCode + "-" + res + ".xml");
		var fileWriter: FileWriter = new FileWriter(file, "UTF-8");

		//searchModel.setOrderableProductsOnly(true);

		// If the target was not a master, simply use the product ID.
		if (product.isMaster()) {
			var primaryCategoryId = product.getPrimaryCategory();
			var productImages = product.getImages('large');
			if (primaryCategoryId) {
				pXML.breadcrumb = product.getPrimaryCategory().ID + '-' + product.priceModel.minPrice + '-' + product.priceModel.maxPrice;
			}
			else {
				pXML.breadcrumb = product.priceModel.minPrice + '-' + product.priceModel.maxPrice;
			}

			pXML.image = product.getImages('large')[0].httpsURL;
			var variationURL = variationModel.url('Product-Show');
			var urlto = variationURL.siteHost();
			pXML.URL = urlto;
			// In the case of a variation master, the master is the representative for
			// all its variants. If there is only one variant, return the variant's
			// product ID.
			var iter = productSearchModel.getProductSearchHits();
			if (iter.hasNext()) {
				var productSearchHit = iter.next();
				if (productSearchHit.getRepresentedProducts().size() === 1) {
					productID = productSearchHit.getFirstRepresentedProductID();
				}

			}
			rootXML.product += pXML;
		}

	}
	fileWriter.write(rootXML);
	fileWriter.close();


	/*var it : Iterator = searchModel.products;
	//var it : Iterator = ProductSearchModel.getProducts(); 
	
	while(it.hasNext()) 
	{ 
		var product : Product = it.next(); 
		pXML.breadcrumb = product.getManufacturerName(); 
		pXML.name = product.getName(); 
		pXML.id = product.getID(); 
		rootXML.product+=pXML; 
	} */

}

function productsToCSV() {
	// var localeStr = Locale.toString();
	// Date format
	var rightNow = new Date();
	var countryCode;
	countryCode = Countries.getCurrent({
		CurrentRequest: {
			locale: request.locale
		}
	}).countryCode;

	var res = rightNow.toISOString().slice(0, 10).replace(/-/g, "");
	var file: File = new File("Temp/Test/productList-of" + "-" + countryCode + "-" + res + ".csv");
	var fileWriter: FileWriter = new FileWriter(file, "UTF-8");

	var csvStreamWriter: CSVStreamWriter = new CSVStreamWriter(fileWriter);
	var it: SeekableIterator = ProductMgr.queryAllSiteProducts();

	while (it.hasNext()) {
		var strArray = new Array();
		var product: Product = it.next();
		// var lineString = product.getBrand() + ',' + product.getName() + ',' +
		// product.getID();
		strArray.push(product.getManufacturerName());
		strArray.push(product.getName());
		strArray.push(product.getID());
		csvStreamWriter.writeNext(strArray);
	}
	csvStreamWriter.close();
	fileWriter.close();
}
// exports
exports.productsToXML = productsToXML;
exports.productsToCSV = productsToCSV;

//exports.productsToXML = guard.ensure(['get'], productsToXML);

