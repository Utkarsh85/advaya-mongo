var db = require( '../db' ).getDb();
var findOne= require('./findOne');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,findProjection) {
	var TobeDeleted;

	if(!selector)
			selector={};

	var selectObj= queryHelper._id(selector);

	return findOne(modelName,selector,findProjection)
	.then(function (docs) {
		TobeDeleted=docs;
		return db.collection( modelName ).deleteOne(selectObj);
	})
	.then(function (docs) {
		if(docs.result.ok && docs.result.n>=1)
			return TobeDeleted;
		else
			return null;
	});
}