//dbCore
var destroy= require('../core/destroy');
var destroyEmbeded= require('../core/destroyEmbeded');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (input) {
	var model= input.model;
	input.model.destroyMany= function (selector) {
		
		if(!model.schema.hasOwnProperty('embeded'))
		{
			return destroy(model.modelName,selector,projectionUtil(model,{}));
		}
		else
		{
			return destroyEmbeded(model.modelName,selector,model.schema.embeded,projectionUtil(model,{}));
		}
	};

	return input;
}