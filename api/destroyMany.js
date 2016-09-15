var validate= require('path').resolve('./advaya').validation;

//dbCore
var destroy= require('../core/destroy');
var destroyEmbeded= require('../core/destroyEmbeded');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (model) {
	model.destroyMany= function (selector) {
		
		if(!model.schema.hasOwnProperty('embeded'))
		{
			return destroy(model.modelName,selector,projectionUtil(model,{}));
		}
		else
		{
			return destroyEmbeded(model.modelName,selector,model.schema.embeded,projectionUtil(model,{}));
		}
	};

	return model;
}