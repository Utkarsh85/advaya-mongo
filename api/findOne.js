//dbCore
var findOne= require('../core/findOne');
var findOneEmbeded= require('../core/findOneEmbeded');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (input) {
	var model= input.model;
	input.model.findOne= function (query,projection) {
		if(!query)
		{
			throw 'Query Undefined';
		}
		if(projection && typeof(projection)!=="object")
		{
			throw 'Projection should be an object';
		}
		
		if(!model.schema.hasOwnProperty('embeded'))
		{
			return findOne(model.modelName,query,projectionUtil(model,projection));
		}
		else
		{
			return findOneEmbeded(model.modelName,query,projectionUtil(model,projection),model.schema.embeded);
		}
	};

	return input;
}