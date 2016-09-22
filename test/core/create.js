var db= require('../../db');
var test = require('assert');
var create;
var createEmbeded;
var createOne;
var createOneEmbeded;

describe('core',function () {

	before(function (done) {
		db.connect(function () {
			create= require('../../core/create');
			createEmbeded= require('../../core/createEmbeded');
			createOne= require('../../core/createOne');
			createOneEmbeded= require('../../core/createOneEmbeded');
			done();		
		});
	});

	describe('create',function () {
		it('Create with many items',function (done) {

			create('create',[{a:1}, {a:2}])
			.then(function (r) {
			    test.equal(2, r.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('Create with single item',function (done) {

			create('create',[{a:1}])
			.then(function (r) {
			    test.equal(1, r.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});
			
		});

		it('CreateOne with single item',function (done) {

			createOne('createOne',{a:1})
			.then(function (r) {
			    test.equal(1, r.a);
			    done();
			})
			.catch(function (err) {
				done(err);
			});
			
		});

		it('Create Embeded with many items',function (done) {

			createOne('createEmbeded',{a:1})
			.then(function (r) {
				return createEmbeded('embededProperty',[{a:1}, {a:2}],'createEmbeded',r._id);
			})
			.then(function (r) {
			    test.equal(2, r.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('CreateOne Embeded with single item',function (done) {

			createOne('createEmbeded',{a:1})
			.then(function (r) {
				return createOneEmbeded('embededProperty',{a:1},'createEmbeded',r._id);
			})
			.then(function (r) {
				// test.equal(true, r.hasOwnProperty('_id'));
			    test.equal(1, r.a);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});
	});
});



			