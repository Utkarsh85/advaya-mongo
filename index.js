var ObjectID = require('mongodb').ObjectID;

var db= require('./db');
var initialize= require('./initialize');

var api= require('require-all')({
  dirname     :  __dirname+'/api',
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});


module.exports = function (models,validation) {

	var modelApi= Object.keys(models)
	.map(function (key) {
		return {model:models[key],validate:validation,allModels:models};
	})
	.map(api.modelFunctions)
	.map(api.find)
	.map(api.findOne)
	.map(api.create)
	.map(api.updateMany)
	.map(api.update)
	.map(api.destroyMany)
	.map(api.destroy)
	.map(api.native)
	.map(api.populate)
	.reduce(function (modelObj,obj) {
		modelObj[obj.model.modelName]= obj.model;
		return modelObj;
	},{});

	//Api static methods
	modelApi.id2bson = function (id) {
			return new ObjectID(id);
	};

	modelApi.generateId = function () {
		return new ObjectID();
	};

	modelApi.ObjectID = function () {
		return ObjectID;
	};

	return {
		api: modelApi,
		connect: db.connect,
		initialize: initialize(models)
	}
}
