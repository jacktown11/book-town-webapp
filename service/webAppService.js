var fs = require('fs');

exports.get_test_data = function(){
	var content = fs.readFileSync('./mock/test.json', 'utf-8');
	return content;
};

exports.get_index_data = function(){
	var content = fs.readFileSync('./mock/home.json', 'utf-8');
	return content;
};
exports.get_book_data = function(bookId){
	var id = bookId || 10234;
	var content = fs.readFileSync('./mock/book/'+ id +'.json', 'utf-8');
	return content;
};
exports.get_male_data = function(){
	var content = fs.readFileSync('./mock/channel/male.json', 'utf-8');
	return content;
};
exports.get_female_data = function(){
	var content = fs.readFileSync('./mock/channel/female.json', 'utf-8');
	return content;
};
exports.get_bookbacket_data = function(){
	var content = fs.readFileSync('./mock/bookbacket.json', 'utf-8');
	return content;
};
exports.get_category_data = function(){
	var content = fs.readFileSync('./mock/category.json', 'utf-8');
	return content;
};
exports.get_rank_data = function(){
	var content = fs.readFileSync('./mock/rank.json', 'utf-8');
	return content;
};


exports.get_search_data = function(start, end, keyword){
	return function(cb){
		//http是node中自带的模块
		var http = require('http');
		//将对象转换为http请求的查询参数
		var qs = require('querystring');
		var data = {
			s: keyword,
			start: start,
			end: end
		};
		var content = qs.stringify(data);
		var http_request = {
			hostname: 'dushu.xiaomi.com',
			port: 80,
			path: '/store/v0/lib/query/onebox?' + content
		};
		var req_obj = http.request(http_request, function(_res){
			var content = '';
			_res.setEncoding('utf-8');
			_res.on('data', function(chunk){
				content += chunk;
			});
			_res.on('end', function(){
				cb(null, content);
			});
		});

		req_obj.on('error', function(){

		});

		req_obj.end();
	};
};