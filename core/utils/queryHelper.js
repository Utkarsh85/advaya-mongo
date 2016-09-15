var ObjectID = require('mongodb').ObjectID;
var query ={};

query._id= function (id) {

	var queryObj={};
	if( ObjectID.isValid(id) )
	{
		queryObj._id= new ObjectID(id);
		return queryObj;
	}
	else if (typeof(id)==="string") {
		queryObj._id=id;
		return queryObj;
	}
	else if(typeof(id)==="object")
	{
		if(id.hasOwnProperty('_id') && ObjectID.isValid(id._id))
			id._id= new ObjectID(id._id);
		return id;
	}
}

query.dot_id= function (id,model) {

	var queryObj={};
	if( ObjectID.isValid(id) )
	{
		queryObj[model+'._id'] = new ObjectID(id);
		return queryObj;
	}
	else if (typeof(id)==="string") {
		queryObj[model+'._id'] =id;
		return queryObj;
	}
	else if(typeof(id)==="object")
	{
		for(var key in id)
		{
			queryObj[model+'.'+key]=id[key];
		}

		if(id.hasOwnProperty('_id') && ObjectID.isValid(id._id))
		{
			queryObj[model+'._id'] = new ObjectID(id._id);
		}

		return queryObj;
	}
}

query.project_dot_id= function (obj,model) {

	var queryObj={};
	
	if(typeof(obj)==="object")
	{
		for(var key in obj)
		{
			queryObj[model+'.'+key]=obj[key];
		}

		return queryObj;
	}
	else
		return {};
}

query.dot$dot= function (obj,model) {
	var updateObj={};

	for(var key in obj)
	{
		updateObj[model+'.$.'+key]=obj[key];
	}

	return updateObj;
}

module.exports= query;