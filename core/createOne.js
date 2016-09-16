
module.exports= function (modelName,obj) {
	var db = require( '../db' ).getDb();

	return db.collection( modelName ).insertOne(obj)
	.then(function (docs) {
		return docs.ops[0];
	});
}