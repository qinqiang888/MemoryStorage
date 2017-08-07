/*
* Created with WebStorm.
* User: QQ
* Date: 2017/7/15
* Time: 11:42
* To change this template use File | Settings | File Templates.
*/
define([], function(){

    var YHU = YHU || {};


    /************** 本地存储 **************/
    YHU.storage = {
        // 临时存储
        session: function(name, val){    // 存储、读取
            var len = arguments.length;

            if(len > 1){
                if(!name || !val){ return false; }
                try {
                    sessionStorage.setItem(name, val);
                }catch(e){
                    YHU.cookie.setCookie(name,val,'d1');//cookie存365天（永久）
                }
            }
            else {
                if(!name) { return false;}
                var dataStr;
                try {
                    sessionStorage.setItem('cookieTest', 'test');//看是否支持存储
                    dataStr = sessionStorage.getItem(name);
                }catch(e){
                    dataStr = YHU.cookie.getCookie(name);
                }
                return dataStr;
            }
        },

        retSessionObj: function(name){    // 将值转成对象，如果不存在返回false
            if(!name) { return false; }
            var dataStr = sessionStorage.getItem(name);
            if(dataStr){
                return JSON.parse(dataStr);
            }
            else{
                return false;
            }
        },

        clearSession: function(name){    // 删除
            if(!name) { return false;}
            try{
                sessionStorage.setItem('cookieTest', 'test');//看是否支持存储
                sessionStorage.removeItem(name);
            }catch(e){
                YHU.cookie.delCookie(name);
            }
        },

        // 永久存储
        local: function(name, val){    // 存储、读取
            var len = arguments.length;

            if(len > 1){
                try{
                    localStorage.setItem(name, val);
                }catch(e){
                    YHU.cookie.setCookie(name,val,'d365');//cookie存365天（永久）
                }

            }
            else {
                var dataStr='';
                try{
                    localStorage.setItem('cookieTest', 'test');//看是否支持存储
                    dataStr = localStorage.getItem(name);
                }catch(e){
                    dataStr = YHU.cookie.getCookie(name)
                }

                return dataStr;
            }
        },

        retLocalObj: function(name){    // 将值转成对象，如果不存在返回false
            if(!name) { return false; }
            var dataStr='';
            try{
                localStorage.setItem('cookieTest', 'test');//看是否支持存储
                dataStr =localStorage.getItem(name);
            }catch(e){
                dataStr =unescape(YHU.cookie.getCookie(name))

            }

            //alert(dataStr)
            if(dataStr&&dataStr!='null'){
                var result="";
               try{
                    result=JSON.parse(dataStr);
                }catch(e){
                   result=false
                }
               // alert(dataStr)
                return   result
            }
            else{
                return false;
            }
        },

        clearLocal: function(name){    // 删除
            if(!name) { return false;}
            try{
                localStorage.setItem('cookieTest', 'test');//看是否支持存储
                localStorage.removeItem(name);
            }catch(e){
                YHU.cookie.delCookie(name);
            }

        },

        // 存储所有
        clearAll: function(){
            sessionStorage.clear();
            localStorage.clear();
        }
    }

    /************** cookie **************/
    YHU.cookie= {
        //读取cookies
        getCookie:function(name)
        {
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                if(!arr[2]){
                     return null ;
                }else if(arr[2] !='null'){
                     return unescape(arr[2]) ;
                }else{
                     return null ;
                };
            }else{
                return null;
            }

        },
        //删除cookies
        delCookie: function(name)
        {
            document.cookie = name + "=" + null + ";expires=" + 0+";path=/";
        },
        //设置Cookie
        setCookie: function(name, value, time){
            var strsec = this.getsec(time);
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec * 1);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()+";path=/";
        },
        //时间转换
        getsec:function(str) {
            var str1 = str.substring(1, str.length) * 1;
            var str2 = str.substring(0, 1);
            if (str2 == "s") {
                return str1 * 1000;
            } else if (str2 == "h") {
                return str1 * 60 * 60 * 1000;
            } else if (str2 == "d") {
                return str1 * 24 * 60 * 60 * 1000;
            }
        }
    }

    return {
        yhu: YHU
    }

})
