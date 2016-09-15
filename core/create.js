var db = require( '../db' ).getDb();

module.exports= function (modelName,obj) {

	return db.collection( modelName ).insertMany(obj)
	.then(function (docs) {
		return docs.ops;
	});
}