var ObjectId= require('mongodb').ObjectId;
var _= require('lodash');

//dbCore
var find= require('../core/find');
var findEmbeded= require('../core/findEmbeded');

//Projection utility
var projectionUtil= require('../utils/projectionUtil');

module.exports= function (input) {
	var model= input.model;
	var allModels= input.allModels;
	input.model.populate= function (obj,fields) {
		if(model.schema.hasOwnProperty('reference') && typeof(model.schema.reference)==="object")
		{
			if(!Array.isArray(obj))
			{
				obj=[obj];
			}

			// if no fields defined just set it all the fields
			if(!fields || !Array.isArray(fields))
				fields=Object.keys(model.schema.reference);

			var allFields=Object.keys(model.schema.reference);
			var fields=_.difference(allFields,_.difference(allFields,fields));

			var allIds= fields.map(function (field) {
				return{
					referenceField: field,
					reference: model.schema.reference[field].model,
					referenceIds: _.uniq( obj
						.filter(x=> {if(x.hasOwnProperty(field)) return true;})
						.map(x=>x[field])
						).map( x => new ObjectId(x))
				}
			});


			var allIdsPromise= allIds.map(function (allId) {

				if(!allModels[allId.reference].schema.hasOwnProperty('embeded'))
					return find(
							allId.reference,
							{_id:{$in:allId.referenceIds}},
							projectionUtil(allModels[allId.reference],{})
						).toArray();
				else
					return findEmbeded(
							allId.reference,
							{_id:{$in:allId.referenceIds}},
							projectionUtil(allModels[allId.reference],{}),
							allModels[allId.reference].schema.embeded
						);
			});

			var PromiseResolved= Promise.all(allIdsPromise)
			.then(function (allResults) {
				return allResults.map(function(result){
					return result.map(function (x) {
						x._id= x._id.toString();
						return x;
					});
				})
			})
			.then(function (allResults) {
				return allResults.map(function(result){
					return _.groupBy(result,'_id');
				})
			})
			.then(function (allResults) {
				// console.log(JSON.stringify(allResults,null,2));
				var newObj;
				fields.map(function (field,ind) {
					newObj= obj.map(function (individual) {
						if(allResults[ind].hasOwnProperty(individual[field]))
							individual[field]= allResults[ind][ individual[field] ];
						else if(typeof(individual[field]) !="undefined" )
							individual[field]= null;
						return individual;
					});
				});

				return newObj;
			});

			return PromiseResolved;
		}
		else
		{
			return new Promise(function (resolve,reject) {
				return resolve(obj);
			});
		}
	};

	return input;
}
