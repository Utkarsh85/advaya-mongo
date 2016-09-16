var queryHelper= require('./utils/queryHelper');

module.exports= function (model,query,projection,embeded,sort,limit,skip,embededId) {
	var db = require( '../db' ).getDb();

	return new Promise(function (resolve,reject) {

		if(!query)
			query={};
		var queryObj=queryHelper.dot_id(query,model);
		var projectObj= queryHelper.project_dot_id(projection,model);

		if(embededId)
		{
			queryObj["_id"]=queryHelper._id(embededId)._id;
		}
		// console.log(queryObj);

		var $model= "$"+model;
		var $_query={"_id":"$_id"};
		$_query[model]= {"$push":$model};

		// console.log($_query);

		var queryParams=[
		 	{"$match":queryObj},
		 	{"$unwind":$model},
		 	{"$match": queryObj},
		];
		


		var additionalParams=[];
		if(sort && typeof(sort)==="object")
		{
			additionalParams.push({"$sort" : queryHelper.dot_id(sort,model)});
		}

		if(skip && !isNaN(parseInt(skip)) && parseInt(skip) >=0)
		{
			additionalParams.push({"$skip" : parseInt(skip)});
		}

		if(limit && !isNaN(parseInt(limit))  && parseInt(limit) >0 )
		{
			additionalParams.push({"$limit" : parseInt(limit)});
		}

		if(additionalParams.length>0)
		{
			additionalParams.map(function (val) {
				queryParams.push(val);
			});
		}

		queryParams.push({"$group":$_query});

		if(projection && Object.keys(projection).length>0)
		{
		 	queryParams.push({"$project":projectObj});
		}

		db.collection( embeded )
		.aggregate(queryParams,function (err,docs) {
			if(err)
				return reject(err);
			var arr=[];
			
			docs.map(function (val) {
				arr=arr.concat(val[model]);
			});
			return resolve(arr);
		});
	});

}