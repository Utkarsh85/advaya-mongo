var findOne= require('./findOne');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,obj,findProjection) {
	var db = require( '../db' ).getDb();

	if(!selector)
			selector={};

	var selectObj= queryHelper._id(selector);

	return db.collection( modelName )
	.updateOne(selectObj,{'$set':obj})
	.then(function (docs) {
		if(docs.result.ok && docs.result.nModified>=1)
			return findOne(modelName,selector,findProjection)
		else
			return null;
	})
	.then(function (docs) {
		return docs;
	});
}