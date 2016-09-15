var db = require( '../db' ).getDb();
var findOneEmbeded= require('./findOneEmbeded');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,embeded,findProjection) {

	var TobeDeleted;

	if(!selector)
			selector={};

	var selector= queryHelper._id(selector);
	
	return findOneEmbeded(modelName,selector,findProjection,embeded)
	.then(function (docs) {
		TobeDeleted=docs;

		var selectObj={};

		selectObj[modelName]= selector;

		return db.collection(embeded)
		.updateOne(
		   {},
		   { $pull : selectObj }
		);
	})
	.then(function (docs) {
		if(docs.result.ok && docs.result.n>=1)
			return TobeDeleted;
		else
			return null;
	});
}