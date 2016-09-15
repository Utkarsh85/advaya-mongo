var models= require('path').resolve('./advaya').models;
var api= require('require-all')({
  dirname     :  __dirname+'/api',
  excludeDirs :  /^\.(git|svn)$/,
  recursive   : true
});

module.exports= Object.keys(models)
.map(function (key) {
	return models[key];
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
.reduce(function (modelObj,model) {
	modelObj[model.modelName]= model;
	return modelObj;
},{});
