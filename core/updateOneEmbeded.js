var db = require( '../db' ).getDb();
var findOneEmbeded= require('./findOneEmbeded');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,obj,embeded,findProjection) {
	// console.log('Arguments=',arguments);

	if(!selector)
			selector={};
		
	var selectObj=queryHelper.dot_id(selector,modelName);

	var updateObj=queryHelper.dot$dot(obj,modelName);

	return db.collection( embeded )
	.updateOne(selectObj,{'$set':updateObj})
	.then(function (docs) {
		if(docs.result.ok && docs.result.nModified>=1)
			return findOneEmbeded(modelName,selector,findProjection,embeded);
		else
			return null;
	})
	.then(function (docs) {
		return docs;
	});
}