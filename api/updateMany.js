var autoUpdatedAt= require('../utils/autoUpdatedAt');

//dbCore
var update= require('../core/update');
var updateEmbeded= require('../core/updateEmbeded');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (input) {
	var model= input.model;
	model.updateMany= function (selector,obj) {
		delete obj._id;

		if(!model.schema.hasOwnProperty('embeded'))
		{
			return input.validate(model.schema,obj)
			.then(autoUpdatedAt(model))
			.then(function (obj) {
				return update(model.modelName,selector,obj,projectionUtil(model,{}));
			});
		}
		else
		{
			return input.validate(model.schema,obj)
			.then(autoUpdatedAt(model))
			.then(function (obj) {
				return updateEmbeded(model.modelName,selector,obj,model.schema.embeded,projectionUtil(model,{}));
			});
		}
	};

	return input;
}