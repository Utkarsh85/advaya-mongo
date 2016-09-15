module.exports= function (model) {
	model.native= function () {
		var native = require( '../db' ).getDb().collection(model.modelName);
		return native;
	};

	return model;
}