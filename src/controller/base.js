module.exports = class extends think.Controller {
  //跨域设置
  async __before() {
    // this.header("Access-Control-Allow-Origin", this.header("origin") || "*");
    // this.header("Access-Control-Allow-Headers", "x-requested-with");
    // this.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,PUT,DELETE");
    // this.header('Access-Control-Allow-Credentials',true);
    // let method = this.http.method.toLowerCase();
    // if(method === "options"){
    //   this.end();
    //   return;
    // }
    // let isLogin = await this.session('userInfo');
    // if(!isLogin){
    //   this.fail('AUTH_FAILED');
    // }
  }
};
