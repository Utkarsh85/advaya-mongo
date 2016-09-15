var validate= require('path').resolve('./advaya').validation;
var autoUpdatedAt= require('../utils/autoUpdatedAt');

//dbCore
var updateOne= require('../core/updateOne');
var updateOneEmbeded= require('../core/updateOneEmbeded');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (model) {
	model.update= function (selector,obj) {
		delete obj._id;

		if(!model.schema.hasOwnProperty('embeded'))
		{
			return validate(model.schema,obj)
			.then(autoUpdatedAt(model))
			.then(function (obj) {
				return updateOne(model.modelName,selector,obj,projectionUtil(model,{}));
			});
		}
		else
		{
			return validate(model.schema,obj)
			.then(autoUpdatedAt(model))
			.then(function (obj) {
				return updateOneEmbeded(model.modelName,selector,obj,model.schema.embeded,projectionUtil(model,{}));
			});
		}
	};

	return model;
}