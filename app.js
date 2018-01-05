var koa = require('koa');

var controller = require('koa-route');	//koa路由中间件
var views = require('co-views');	//koa模板渲染中间件
var koa_static = require('koa-static-server'); //koa静态资源访问支持中间件

var service = require('./service/webAppService.js');	//为项目编写的服务层代码

var querystring = require('querystring');	//node自带的用于请求参数处理的依赖包

var app = koa();

var render = views('./view', {map: {
	html: 'ejs'
}});

// 对访问静态文件的支持
app.use(koa_static({
	rootDir: './static', //项目文件系统的路径
	rootPath: '/static/', //这个路径代表在浏览器导航栏输入的路径
	maxage: 0
}));

// 路由实现页面访问
app.use(controller.get('/route_test', function*(){
	// 不缓存
	this.set('Cache-Control', 'no-cache');
	// 这里的body是指请求返回的内容主体(不是指html的body)
	this.body = 'hello koa!';
}));

// 模板的访问
app.use(controller.get('/ejs_test', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('test', {title: 'title_test'});
}));

// 访问mock的模拟数据
app.use(controller.get('/api_test', function(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_test_data();	
}));

/*==========
各个页面的访问路由设置
===========*/
app.use(controller.get('/', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('index', {title: '书城首页'});
}));

app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male', {title: 'male'});
}));
app.use(controller.get('/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('female', {title: 'female'});
}));
app.use(controller.get('/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('rank', {title: 'rank'});
}));
app.use(controller.get('/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('category', {title: 'category'});
}));
app.use(controller.get('/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('male', {title: 'male'});
}));
app.use(controller.get('/book', function*(){
	var id = querystring.parse(this.req._parsedUrl.query).id;
	this.set('Cache-Control', 'no-cache');
	this.body = yield render('book', {title: id});
}));


/*==========
各个页面的数据请求接口
==========*/
app.use(controller.get('/ajax/index', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_index_data();
}));
app.use(controller.get('/ajax/book', function*(){
	var id = querystring.parse(this.req._parsedUrl.query).id || 10234;
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_book_data(id);
}));
app.use(controller.get('/ajax/male', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_male_data();
}));
app.use(controller.get('/ajax/female', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_female_data();
}));
app.use(controller.get('/ajax/bookbacket', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_bookbacket_data();
}));
app.use(controller.get('/ajax/category', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_category_data();
}));
app.use(controller.get('/ajax/rank', function*(){
	this.set('Cache-Control', 'no-cache');
	this.body = service.get_rank_data();
}));

// 在线http查询接口(这是在线存在的真实数据)
app.use(controller.get('/ajax/search', function*(){
	this.set('Cache-Control', 'no-cache');
	var params = querystring.parse(this.req._parsedUrl.query);
	var start = params.start;
	var end = params.end;
	var keyword = params.keyword;
	this.body = yield service.get_search_data(start, end, keyword);
}));



//监听端口，从而最终实现一个简单的web server
app.listen(3000);
console.log('koa server is started at 3000!');
