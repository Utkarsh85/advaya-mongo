var db= require('../../db');
var test = require('assert');
var ObjectId= require('mongodb').ObjectId;
var _=require('lodash');

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

	describe('Stress Testing on findEmbeded',function () {

		// it('Projection',function (done) {
		// 	var payload= new Date().getTime();

		// 	create('findOne',[{p1:payload}])
		// 	.then(function () {
		// 		return findOne('findOne',{p1:payload},{_id:0});
		// 	})
		// 	.then(function (r) {
		// 	    test.equal(false, r.hasOwnProperty('_id'));
		// 	    test.equal(payload, r.p1);
		// 	    done();
		// 	})
		// 	.catch(function (err) {
		// 		done(err);
		// 	});
		// });

		it('Stress findEmbeded',function (done) {
			this.timeout(50000);
			var payload= new Date().getTime();

			var arr= [];

			for(var i=0;i<10000;i++)
			{
				arr.push({
					a:payload,
					embededProperty:[
					{
						_id: new ObjectId(),
						b:payload,
						c:i
					}]
				});
			}

			console.time('Creating');
			create('findEmbeded',arr)
			.then(function (cft) {
				console.timeEnd('Creating');
				console.time("maptime");
				kft= _.map(cft,x => x.embededProperty[0]._id);
				// kft= cft.map(x => x.embededProperty[0]._id);
				console.timeEnd("maptime");
				// console.log(cft[0]);
				console.time('Findind');
				return findEmbeded('embededProperty',{_id:{$in:kft}},{},'findEmbeded',null);
			})
			.then(function (r) {
				console.timeEnd('Findind');
				// console.log(r);
			    test.equal( r.length,arr.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});
		});


		it('Stress find',function (done) {
			this.timeout(50000);
			var payload= new Date().getTime();

			var arr= [];

			for(var i=0;i<10000;i++)
			{
				arr.push({
					a:payload
				});
			}

			console.time('Creating');
			create('find',arr)
			.then(function (cft) {
				console.timeEnd('Creating');
				kft= cft.map(x => x._id);
				// console.log(kft);
				console.time('Findind');
				return find('find',{_id:{$in:kft}}).toArray();
			})
			.then(function (r) {
				console.timeEnd('Findind');
				// console.log(r);
			    test.equal( r.length,arr.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});
		});

	});
});



			