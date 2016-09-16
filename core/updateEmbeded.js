var findEmbeded= require('./findEmbeded');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,obj,embeded,findProjection) {
	var db = require( '../db' ).getDb();

	if(!selector)
			selector={};
		
	var selectObj=queryHelper.dot_id(selector,modelName);

	var updateObj=queryHelper.dot$dot(obj,modelName);

	return db.collection( embeded )
	.updateMany(selectObj,{'$set':updateObj},{multi:true})
	.then(function (docs) {
		if(docs.result.ok && docs.result.nModified>=1)
			return findEmbeded(modelName,selector,findProjection,embeded);
		else
			return [];
	})
	.then(function (docs) {
		return docs;
	});
}