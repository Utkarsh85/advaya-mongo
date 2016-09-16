var queryHelper= require('./utils/queryHelper');
module.exports= function (modelName,query,projection) {
	var db = require( '../db' ).getDb();
	
	var fullQuery;
	
	if(!query)
		query={};

	var queryObj= queryHelper._id(query);

	if(projection)
	{
		fullQuery= db.collection( modelName ).find(queryObj,projection);
	}
	else
	{
		fullQuery= db.collection( modelName ).find(queryObj);
	}

	return fullQuery;
}