var db= require('../../db');
var test = require('assert');
var create;
var createEmbeded;
var createOne;
var createOneEmbeded;

var update;
var updateEmbeded;
var updateOne;
var updateOneEmbeded;

describe('core',function () {

	before(function (done) {
		db.connect(function () {
			create= require('../../core/create');
			createEmbeded= require('../../core/createEmbeded');
			createOne= require('../../core/createOne');
			createOneEmbeded= require('../../core/createOneEmbeded');

			update= require('../../core/update');
			updateEmbeded= require('../../core/updateEmbeded');
			updateOne= require('../../core/updateOne');
			updateOneEmbeded= require('../../core/updateOneEmbeded');
			done();		
		});
	});

	describe('update',function () {
		it('update on many documents',function (done) {
			var payload= new Date().getTime();

			create('update',[{a:payload},{a:payload}])
			.then(function () {
				return update('update',{a:payload},{b:payload});
			})
			.then(function (r) {
			    test.equal(true, r[0].hasOwnProperty('b'));
			    test.equal(true, r[1].hasOwnProperty('b'));
			    test.equal(2, r.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('updateOne on many documents would update only one',function (done) {
			var payload= new Date().getTime();

			create('updateOne',[{a:payload},{a:payload}])
			.then(function () {
				return updateOne('updateOne',{a:payload},{b:payload});
			})
			.then(function (r) {
			    test.equal(true, r.hasOwnProperty('b'));
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('updateOne on single document',function (done) {
			var payload= new Date().getTime();

			createOne('updateOne',{a:payload})
			.then(function () {
				return updateOne('updateOne',{a:payload},{b:payload});
			})
			.then(function (r) {
			    test.equal(true, r.hasOwnProperty('b'));
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('updateEmbeded on many documents',function (done) {
			var payload= new Date().getTime();

			create('updateEmbeded',[
				{
					a:payload,
					embededProperty:[
					{
						b:payload
					}]
				},
				{
					a:payload,
					embededProperty:[
					{
						b:payload
					}]
				}
			])
			.then(function (r) {
				return updateEmbeded('embededProperty',{b:payload},{c:payload},'updateEmbeded');
			})
			.then(function (r) {
				// console.log(r);
				return r.filter(function (val) {
					if(val.hasOwnProperty('c'))
						return val;
				});
			})
			.then(function (r) {
			    test.equal(r.length, 2);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		//currently not supported by mongo
		it('updateEmbeded on single document with many embeded fields would fail',function (done) {
			var payload= new Date().getTime();

			createOne('updateEmbededSingle',
				{
					a:payload,
					embededProperty:[
						{
							b:payload
						},
						{
							b:payload
						},
					]
				}
			)
			.then(function (r) {
				return updateEmbeded('embededProperty',{b:payload},{c:payload},'updateEmbededSingle');
			})
			.then(function (r) {
				// console.log(r);
				return r.filter(function (val) {
					if(val.hasOwnProperty('c'))
						return val;
				});
			})
			.then(function (r) {

			    test.equal(r.length, 1);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('updateOneEmbeded on many documents does not work',function (done) {
			var payload= new Date().getTime();

			create('updateOneEmbeded',[
				{
					a:payload,
					embededProperty:[
					{
						b:payload
					}]
				},
				{
					a:payload,
					embededProperty:[
					{
						b:payload
					}]
				}
			])
			.then(function (r) {
				return updateOneEmbeded('embededProperty',{b:payload},{c:payload},'updateOneEmbeded');
			})
			.then(function (r) {
			    test.equal(r.b, payload);
			    test.equal(r.c, payload);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('updateOneEmbeded on single document but with many embeded documents',function (done) {
			var payload= new Date().getTime();

			createOne('updateOneEmbededSingle',
				{
					a:payload,
					embededProperty:[
						{
							b:payload
						},
						{
							b:payload
						}
					]
				}
			)
			.then(function (r) {
				return updateOneEmbeded('embededProperty',{b:payload},{c:payload},'updateOneEmbededSingle');
			})
			.then(function (r) {
			    test.equal(r.b, payload);
			    test.equal(r.c, payload);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});
	});


});



			