
module.exports= function (modelName,obj) {
	var db = require( '../db' ).getDb();

	return db.collection( modelName ).insertMany(obj)
	.then(function (docs) {
		return docs.ops;
	});
}