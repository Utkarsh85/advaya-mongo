var db = require( '../db' ).getDb();
var findEmbeded= require('./findEmbeded');
var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,selector,embeded,findProjection) {

	var TobeDeleted;

	if(!selector)
			selector={};

	var selector= queryHelper._id(selector);
	
	return findEmbeded(modelName,selector,findProjection,embeded)
	.then(function (docs) {
		TobeDeleted=docs;

		var selectObj={};

		selectObj[modelName]= selector;

		return db.collection(embeded)
		.updateMany(
		   {},
		   { $pull : selectObj },
		   { multi: true }
		);
	})
	.then(function (docs) {
		if(docs.result.ok && docs.result.n>=1)
			return TobeDeleted;
		else
			return [];
	});
}