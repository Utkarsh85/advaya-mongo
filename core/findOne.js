var queryHelper= require('./utils/queryHelper');

module.exports= function (modelName,query,projection,sort,skip) {
	var db = require( '../db' ).getDb();
	
	var fullQuery;

	if(!query)
		query={};

	var queryObj= queryHelper._id(query);

	if(projection)
	{
		fullQuery= db.collection( modelName ).findOne(queryObj,projection);
	}
	else
	{
		fullQuery= db.collection( modelName ).findOne(queryObj);
	}

	return fullQuery;
}