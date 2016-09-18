module.exports= function (models) {
	return function () {
		var db = require('./db').getDb();

		return new Promise(function (resolve,reject) {

			var indexPromiseArr= Object.keys(models)
			.map(function (modelName) {
				return models[modelName];
			})
			.filter(function (model) {
				if(model.schema.hasOwnProperty('index') && Array.isArray(model.schema.index))
					return true;
			})
			.map(function (model) {
				if(model.schema.hasOwnProperty('embeded'))
				{
					var transformIndex= model.schema.index.map(function (index) {
						var keyObj={}
						Object.keys(index.key)
						.map(function (key) {
							keyObj[model.modelName+'.'+key]=index.key[key];
						});
						index.key= keyObj;
						return index;
					});

					var idUnique={ key: {  }, unique: true };
					idUnique.key[model.modelName+'._id']=1;

					transformIndex.push(idUnique);
					// console.log(transformIndex);
					return  db.collection(model.schema.embeded).createIndexes(transformIndex);
				}
				else
				{
					return  db.collection(model.modelName).createIndexes(model.schema.index);
				}
			})

			resolve(Promise.all(indexPromiseArr));
		});
	}
}