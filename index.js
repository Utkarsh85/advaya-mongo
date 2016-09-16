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

	return {
		api: modelApi,
		connect: db.connect,
		initialize: initialize
	}
}
