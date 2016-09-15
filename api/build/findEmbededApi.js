var findEmbeded= require('../../core/findEmbeded');

var findEmbededApi= function (modelName,query,projection,embeded) {
	this.modelName= modelName;
	this.embeded= embeded;
	this.query= query;
	this.projection= projection;
}

findEmbededApi.prototype.limit = function(limit) {
	if(limit && !isNaN(parseInt(limit))  && parseInt(limit) >0 )
	{
		this.limitVal= parseInt(limit);
	}
	return this;
};

findEmbededApi.prototype.sort = function(sort) {
	if( sort.constructor=== Object || Array.isArray(sort))
	{
		this.sortVal= sort;
	}
	return this;
};

findEmbededApi.prototype.skip = function(skip) {
	if( skip && !isNaN(parseInt(skip))  && parseInt(skip) >0 )
	{
		this.skipVal= parseInt(skip);
	}
	return this;
};

findEmbededApi.prototype.embededId = function(id) {
	this.embededParentId= id;
	return this;
};

findEmbededApi.prototype.toArray = function() {
	return findEmbeded(this.modelName,this.query,this.projection,this.embeded,this.sortVal,this.skipVal);
};

module.exports=findEmbededApi;