var find= require('./find');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,findProjection) {
	var db = require( '../db' ).getDb();
	var TobeDeleted;

	if(!selector)
			selector={};

	var selectObj= queryHelper._id(selector);

	return find(modelName,selector,findProjection)
	.toArray()
	.then(function (docs) {
		TobeDeleted=docs;
		return db.collection( modelName ).deleteMany(selectObj);
	})
	.then(function (docs) {
		if(docs.result.ok && docs.result.n>=1)
			return TobeDeleted;
		else
			return [];
	});
}