var validate= require('path').resolve('./advaya').validation;
var autoCreatedAt= require('../utils/autoCreatedAt');
var autoUpdatedAt= require('../utils/autoUpdatedAt');

//dbCore
var create= require('../core/create');
var createEmbeded= require('../core/createEmbeded');
var createOne= require('../core/createOne');
var createOneEmbeded= require('../core/createOneEmbeded');

module.exports= function (model) {
	model.create= function (obj,embedParentId) {

		//if obj is an array of length greater than one, then treat it with create and createEmbeded
		if(Array.isArray(obj) )//&& obj.length>1)
		{
			obj=obj.map(function (val) {
				delete val._id;
				return val;
			});
			// delete obj.parentId;

			if(!model.schema.hasOwnProperty('embeded'))
			{
				return validate(model.schema,obj)
				.then(autoCreatedAt(model))
				.then(autoUpdatedAt(model))
				.then(function (obj) {
					return create(model.modelName,obj);
				});
			}
			else
			{
				return validate(model.schema,obj)
				.then(autoCreatedAt(model))
				.then(autoUpdatedAt(model))
				.then(function (obj) {
					return createEmbeded(model.modelName,obj,model.schema.embeded,embedParentId);
				});
			}
		}
		//if obj is an array of length equal to one or just a simple object then treat it with createOne and createOneEmbeded
		else
		{
			// if(Array.isArray(obj) && obj.length===1)
			// 	obj=obj[0];

			delete obj._id;
			// delete obj.parentId;

			if(!model.schema.hasOwnProperty('embeded'))
			{
				return validate(model.schema,obj)
				.then(autoCreatedAt(model))
				.then(autoUpdatedAt(model))
				.then(function (obj) {
					return createOne(model.modelName,obj);
				});
			}
			else
			{
				return validate(model.schema,obj)
				.then(autoCreatedAt(model))
				.then(autoUpdatedAt(model))
				.then(function (obj) {
					return createOneEmbeded(model.modelName,obj,model.schema.embeded,embedParentId);
				});
			}
		}
			
	};

	return model;
}