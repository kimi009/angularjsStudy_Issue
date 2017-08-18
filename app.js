const jsonServer = require('json-server');
const bodyParse = require('body-parser');
const low = require('lowdb');
const storage = require('lowdb/file-async');

//创建express 服务器
const serve = jsonServer.create();
//使用 json-server 默认选择中间件 logger static cors no-cache
serve.use(jsonServer.defaults());
//使用body-parser
serve.use(bodyParse.json());
//数据文件
const dbfile = process.env.prod === '1' ? 'db.json' : '_db.json';
//创建一个lowdb实例
const db = low(dbfile,{storage});
//路由配置
const router = jsonServer.router(dbfile);
serve.use('/api',router);

//启动服务 
serve.listen(5000,()=>{
	console.log('server is running at ',5000,dbfile);
})

