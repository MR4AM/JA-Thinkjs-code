# 基于nodejs、thinkjs、koa2搭建node轻量级服务
> thinkjs官网 https://thinkjs.org/doc/index.html
## 项目搭建
- $ npm install -g think-cli 全局安装think官方脚手架
- thinkjs new [project_name] 创建项目
- npm install 在项目目录下安装依赖
- npm start 启动服务

## 框架介绍
- thinkjs是一款基于node和koa2.x的轻量级node服务框架
## 系统服务启动进程思路
- 执行packge.json 对应的脚本命令运行对应文件，实例化 ThinkJS 里的 Application 类，执行 run 方法
- 根据不同的环境（Master 进程、Worker 进程、命令行调用）处理不同的逻辑
- 处理不同的进程过程中，先加载配置文件，生成 think.config 和 think.logger 对象
- socket监听文件修改触发编译，杀掉进程重新fork
## 处理逻辑及用户请求
- 请求到达 webserver（如：nginx），通过反向代理将请求转发给 node 服务。如果直接通过端口访问 node 服务，那么就没有这一步了。
- node 服务接收用户请求，Master 进程将请求转发给对应的 Worker 进程
- Worker 进程通过注册的 middleware 中间件来处理用户的请求
- meta 来处理一些通用的信息，如：设置请求的超时时间、是否发送 ThinkJS 版本号、是否发送处理的时间等。
- resource 处理静态资源请求，静态资源都放在 www/static/ 下，如果命中当前请求是个静态资源，那么这个 middleware 处理完后提前结束，不再执行后面的 middleware。
- payload 处理用户上传的数据，包含：表单数据、文件等。解析完成后将数据放在 request.body 对象上，方便后续读取
- router 解析路由，解析出请求处理对应的 Controller 和 Action，放在 ctx.controller 和 ctx.action 上，方便后续处理。如果项目是多模块结构，那么还有 ctx.module。
- logic 根据解析出来的 controller 和 action，调用 logic 里对应的方法。
- controller 根据解析出来的 controller 和 action，调用 controller 里的对应的方法。
## 文件目录介绍及踩坑点
- 该项目以模块划分，在一个线程中可能运行多模块功能，模块思路可参考https://www.jianshu.com/p/59c302ca365c
- 其中控制器controller下的服务模块的要对应view层的html视图输出，否则会报template not found
- 对于用户api类的请求，thinkjs底层已作了一层对接数据库增删查改的rest api的封装，但是对于项目运用而言，这一层处理用户api类请求的功能是无法满足开发的，因此需要我们在服务模块中自定义api类的action模块(简称url地址类的接口)
- 在thinkjs中，我们定义一个Action 代表一个要执行的操作，也就是一个url接口。如果接口url为服务器域名地址+/home/article/detail，那服务启动后，解析后的功能模块为/home，模块对应控制器（在thinkjs中，一个控制器代表一个js文件，一个控制器下可以存在多个Action）为 article， Action为 detail，那么执行的 Action 就是文件 src/home/controller/aritcle 里的 detailAction (url接口的具体实现逻辑)方法
- 跨域支持，对于一般的服务而言，前端ajax请求牵手后端服务（不同源情况下且服务设置了请求拦截）就会存在跨域问题。这个时候前后端交互就存在跨域问题，跨域在前后端都有解决方案。但对于后端服务而言，跨域就是设置允许对方服务器访问的权限，也就是访问白名单。对于thinkjs而言，可通过koa-cor模块处理跨域访问的问题，只需在src/config/middleware 中间件中允许用户请求即可解决跨域问题
