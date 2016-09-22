var db= require('../../db');
var test = require('assert');
var create;
var createEmbeded;
var createOne;
var createOneEmbeded;

var destroy;
var destroyEmbeded;
var destroyOne;
var destroyOneEmbeded;

describe('core',function () {

	before(function (done) {
		db.connect(function () {
			create= require('../../core/create');
			createEmbeded= require('../../core/createEmbeded');
			createOne= require('../../core/createOne');
			createOneEmbeded= require('../../core/createOneEmbeded');

			destroy= require('../../core/destroy');
			destroyEmbeded= require('../../core/destroyEmbeded');
			destroyOne= require('../../core/destroyOne');
			destroyOneEmbeded= require('../../core/destroyOneEmbeded');
			done();		
		});
	});

	describe('destroy',function () {
		it('destroy on many documents',function (done) {
			var payload= new Date().getTime();

			create('destroy',[{a:payload},{a:payload}])
			.then(function () {
				return destroy('destroy',{a:payload});
			})
			.then(function (r) {
			    test.equal(true, r[0].hasOwnProperty('a'));
			    test.equal(true, r[1].hasOwnProperty('a'));
			    test.equal(2, r.length);
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('destroyOne on single document',function (done) {
			var payload= new Date().getTime();

			create('destroyOne',[{a:payload},{a:payload}])
			.then(function () {
				return destroyOne('destroyOne',{a:payload});
			})
			.then(function (r) {
			    test.equal(true, r.hasOwnProperty('a'));
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('destroyEmbeded on multi documents',function (done) {
			var payload= new Date().getTime();

			create('destroyEmbeded',[
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
				return destroyEmbeded('embededProperty',{b:payload},'destroyEmbeded');
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

		it('destroyEmbeded on single document with multi embeded Fields',function (done) {
			var payload= new Date().getTime();

			create('destroyEmbededSingle',[
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
			])
			.then(function () {
				return destroyEmbeded('embededProperty',{b:payload},'destroyEmbededSingle');
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

		it('destroyOneEmbeded on single document',function (done) {
			var payload= new Date().getTime();

			create('destroyOneEmbeded',[
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
			])
			.then(function () {
				return destroyOneEmbeded('embededProperty',{b:payload},'destroyOneEmbeded');
			})
			.then(function (r) {
			    test.equal(true, r.hasOwnProperty('b'));
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

		it('destroyOneEmbeded on multi document',function (done) {
			var payload= new Date().getTime();

			create('destroyOneEmbededMulti',[
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
				return destroyOneEmbeded('embededProperty',{b:payload},'destroyOneEmbededMulti');
			})
			.then(function (r) {
			    test.equal(true, r.hasOwnProperty('b'));
			    done();
			})
			.catch(function (err) {
				done(err);
			});

		});

	});


});



			