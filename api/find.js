var validate= require('path').resolve('./advaya').validation;

//dbCore
var find= require('../core/find');
var findEmbededApi= require('./build/findEmbededApi');
//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (model) {
	model.find= function (query,projection) {
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
			return find(model.modelName,query,projectionUtil(model,projection));
		}
		else
		{
			return new findEmbededApi(model.modelName,query,projectionUtil(model,projection),model.schema.embeded);
		}
	};

	return model;
}