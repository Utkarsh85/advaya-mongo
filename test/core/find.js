var db= require('../../db');
var test = require('assert');
var create;
var createEmbeded;
var createOne;
var createOneEmbeded;

var find;
var findEmbeded;
var findOne;
var findOneEmbeded;

describe('core',function () {

	before(function (done) {
		db.connect(function () {
			create= require('../../core/create');
			createEmbeded= require('../../core/createEmbeded');
			createOne= require('../../core/createOne');
			createOneEmbeded= require('../../core/createOneEmbeded');

			find= require('../../core/find');
			findEmbeded= require('../../core/findEmbeded');
			findOne= require('../../core/findOne');
			findOneEmbeded= require('../../core/findOneEmbeded');
			done();		
		});
	});

	describe('find',function () {
		it('find',function (done) {
			var payload= new Date().getTime();

			create('find',[{p1:payload}])
			.then(function () {
				return find('find',{p1:payload}).toArray();
			})
			.then(function (r) {
			    test.equal(1, r.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('findOne',function (done) {
			var payload= new Date().getTime();

			create('findOne',[{p1:payload}])
			.then(function () {
				return findOne('findOne',{p1:payload});
			})
			.then(function (r) {
			    test.equal(payload, r.p1);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('Projection',function (done) {
			var payload= new Date().getTime();

			create('findOne',[{p1:payload}])
			.then(function () {
				return findOne('findOne',{p1:payload},{_id:0});
			})
			.then(function (r) {
			    test.equal(false, r.hasOwnProperty('_id'));
			    test.equal(payload, r.p1);
			    done();
			})
			.catch(function (err) {
				done(err);
			});
		});

		it('findEmbeded',function (done) {
			var payload= new Date().getTime();
			create('findEmbeded',[
				{
					a:payload,
					embededProperty:[
					{
						b:payload,
						c:1
					}]
				},
				{
					a:payload,
					embededProperty:[
					{
						b:payload,
						c:2
					}]
				}
			])
			.then(function () {
				return findEmbeded('embededProperty',{b:payload},{},'findEmbeded');
			})
			.then(function (r) {
				// console.log(r);
			    test.equal( r.length,2);
			    done();
			})
			.catch(function (err) {
				done(err);
			});
		});

		it('findOneEmbeded',function (done) {
			var payload= new Date().getTime();

			create('findOneEmbeded',[
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
			.then(function () {
				return findOneEmbeded('embededProperty',{b:payload},{},'findOneEmbeded');
			})
			.then(function (r) {
			    test.equal(payload, r.b);
			    done();
			})
			.catch(function (err) {
				console.log(err);
				done(err);
			});
		});

	});
});



			