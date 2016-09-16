var findEmbeded= require('./findEmbeded');
var ObjectID= require('mongodb').ObjectID;

module.exports= function (modelName,obj,embeded,embedParentId) {
	var db = require( '../db' ).getDb();

	if(!embedParentId)
	{
		throw {err:"Embeded Parent ID required"};
	}
	
	obj= obj.map(function (val) {
		val._id= new ObjectID();
		return val;
	});

	var createObj={};
	createObj[modelName]={};
	createObj[modelName]['$each']=obj;

	return db.collection(embeded)
	.updateMany(
	   { _id : embedParentId },
	   { $push : createObj }
    )
	.then(function () {
		return obj;
	});
}