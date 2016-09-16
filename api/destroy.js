//dbCore
var destroyOne= require('../core/destroyOne');
var destroyOneEmbeded= require('../core/destroyOneEmbeded');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (input) {
	var model= input.model;
	input.model.destroy= function (selector) {

		if(!model.schema.hasOwnProperty('embeded'))
		{
			return destroyOne(model.modelName,selector,projectionUtil(model,{}));
			//modelName, selector, findProjection
		}
		else
		{
			return destroyOneEmbeded(model.modelName,selector,model.schema.embeded,projectionUtil(model,{}));
			//modelName, selector, embeded, findProjection
		}
	};

	return input;
}