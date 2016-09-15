var db = require( '../db' ).getDb();
var find= require('./find');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,obj,findProjection) {

	if(!selector)
			selector={};

	var selectObj= queryHelper._id(selector);

	return db.collection( modelName )
	.updateMany(selectObj,{'$set':obj})
	.then(function (docs) {
		if(docs.result.ok && docs.result.nModified>=1)
			return find(modelName,selector,findProjection).toArray();
		else
			return [];
	})
	.then(function (docs) {
		return docs;
	});
}