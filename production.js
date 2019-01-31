const path = require('path');
const Application = require('thinkjs');

//实例化 ThinkJS 里的 Application 类，执行 run 方法
const instance = new Application({
  ROOT_PATH: __dirname,
  APP_PATH: path.join(__dirname, 'app'),
  proxy: true, // use proxy
  env: 'production'
});

instance.run();
