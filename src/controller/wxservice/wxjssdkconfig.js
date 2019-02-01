const wxrequest=require('superagent');
const PUBLIC_API=require('../../utils/wxapi');
const apiResult=require('../../utils/apiResult');
const wxsignature=require('../../utils/wxsignature');
const Base=require('../base');
module.exports=class extends Base{
    indexAction() {
        return this.display();
    }
    //获取微信公众号调用token
    //接口url 'wxservice/wxjssdkconfig/wxpublictoken'
    async wxpublictokenAction(){
       let result;
       //私有化上层this，防止在异步回调或promise中this指针发生变化
       let that=this;
       let apirest=wxrequest.get(PUBLIC_API.PUBLIC_ACCESSTOKEN).end((req1,res)=>{
            if(res!==undefined){
                console.log(res.body,that,'请求微信接口');
                result=apiResult(200,res.body,'返回成功',null);
                return that.json(result);
            }else{
                console.log(res)
                result=apiResult(500,null,'系统错误，请稍后重试','系统错误，请稍后重试');
                return that.json(result);
            }
        });
        await apirest;
    }
    async callbackAction() {
        console.log('callbackAction.....');
        return 'callback';
    }
}