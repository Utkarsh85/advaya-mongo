var findOneEmbeded= require('./findOneEmbeded');
var ObjectID= require('mongodb').ObjectID;

module.exports= function (modelName,obj,embeded,embedParentId) {
	var db = require( '../db' ).getDb();

	// console.log('arguments',modelName,obj,embeded,embedParentId);
	if(!embedParentId)
	{
		throw {err:"Embeded Parent ID required"};
	}

	obj._id=new ObjectID();

	var createObj={};
	createObj[modelName]=obj;

	return db.collection(embeded)
	.updateOne(
	   { _id : new ObjectID(embedParentId) },
	   { $push : createObj }
    )
	.then(function (docs) {
		if(docs.result.ok===1 && docs.result.nModified>=1)
			return obj;
		else
			return null;
	});
}