module.exports= function (input) {
	var model= input.model;
	input.model.native= function () {
		var native = require( '../db' ).getDb().collection(model.modelName);
		return native;
	};

	return input;
}