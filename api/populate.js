var ObjectId= require('mongodb').ObjectId;

//dbCore
var find= require('../core/find');
var findEmbeded= require('../core/findEmbeded');

//Projection utility
var projectionUtil= require('../utils/projectionUtil');
var models= require('path').resolve('./advaya').models;

module.exports= function (model) {
	model.populate= function (obj,fields) {
		if(model.schema.hasOwnProperty('reference') && typeof(model.schema.reference)==="object")
		{
			if(!fields || !Array.isArray(fields))
				fields=Object.keys(model.schema.reference);

			var filterReference=Object.keys(model.schema.reference)
			.filter(function (val) {
				if(fields.indexOf(val)>=0)
					return true;
			});
			// console.log('\nfilterReference\n',filterReference,model.schema.reference);

			if(!Array.isArray(obj))
				obj=[obj];

			var allIds= filterReference.map(function (reference) {
				return {
					referenceField: reference,
					reference: model.schema.reference[reference],
					referenceIds: obj.map(function (val) {
						return new ObjectId(val[reference]);
					})
				};
			});

			// console.log('\nallIds\n',allIds);

			var allIdsPromise= allIds.map(function (reference) {
				if(!models[reference.reference].schema.hasOwnProperty('embeded'))
					return find(
							reference.reference,
							{_id:{$in:reference.referenceIds}},
							projectionUtil(models[reference.reference],{})
						).toArray();
				else
					return findEmbeded(
							reference.reference,
							{_id:{$in:reference.referenceIds}},
							projectionUtil(models[reference.reference],{}),
							models[reference.reference].schema.embeded
						);
			});

			return Promise.all(allIdsPromise)
			.then(function (allFounds) {
				allIds.forEach(function (reference,allIdsIndex) {
					foundIds= allFounds[allIdsIndex].map(function(x) { return x._id.toString()});
					obj.map(function (val) {
						if(foundIds.indexOf(val[reference.referenceField]) >=0)
						{
							index= foundIds.indexOf(val[reference.referenceField]);

							val[reference.referenceField]= allFounds[allIdsIndex][index];
						}
						else
						{
							val[reference.referenceField]= null;
						}
						return val;
					});
				});

				if(obj.length==1)
					obj=obj[0];
				return obj;
			});


		}
		else
		{
			return new Promise(function (resolve,reject) {
				return resolve(obj);
			});
		}
	};

	return model;
}