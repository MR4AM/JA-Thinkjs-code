const Base = require('../base');
module.exports = class extends Base {
    indexAction() {
        return this.display();
    }

    async detailAction() {
        console.log('cabbbbbbb');
        let arr = new Array();
        arr[0] = "名字";
        arr[1] = "地址";
        arr[2] = "手机";
        this.assign('arr', arr);
        console.log(this,'检测测试接口的this指针')
        return this.success(arr);
    }
    async callbackAction() {
        console.log('callbackAction.....');
        return 'callback';
    }
}