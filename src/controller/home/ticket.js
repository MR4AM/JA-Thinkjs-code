const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {
    async test(){
        console.log('请求进来了')
        let obj={
            aa:'aa',
            bb:'bbb'
        }
        return this.success(obj);
    }
    indexAction() {
        let arr = new Array();
        arr[0] = "名字";
        arr[1] = "地址";
        arr[2] = "手机";
        this.assign('arr',arr);
        return this.display();
    }
};
