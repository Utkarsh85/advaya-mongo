var queryHelper= require('./utils/queryHelper');
var merge= require('deepmerge');

module.exports= function (modelName,query,projection,embeded) {
	var db = require( '../db' ).getDb();
	
	var queryObj={};
	var projectionObj={};

	if(!query)
		query={};

	if(!projection)
		projection={};
		
	queryObj[modelName]={ "$elemMatch" : queryHelper._id(query) };
	projectionObj[modelName]={ "$elemMatch" : queryHelper._id(query) };
	projectionObj= merge(queryHelper.project_dot_id(projection,modelName),projectionObj);

	
	return new Promise(function (resolve,reject) {
		db.collection( embeded ).find(queryObj,projectionObj).limit(1).toArray(function (err,docs) {
			if(err)
				return reject(err);

			if(docs.length>0)
				return resolve(docs[0][modelName][0]);
			else
				return resolve(null);

		});
	});
}