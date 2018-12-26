/**
 * Create Author:SuJunHui
 * Create Time  :2017-11-15 15:00
 * Description  :M端聚合分享
 */

(function () {
    var title = '智能展厅',
        desc = '视界新体验，真就不一样',
        wxShareUrl = window.location.href,
        nativeShareUrl = window.location.href,
        shareLogo = 'https://x.autoimg.cn/dealer/vr/Resources/img/share-pano-200-200.png';
        shareSuccessCallBack=null;
        nativeTitle=document.title;

        if(typeof(__shareInfo)!="undefined"){
            title=__shareInfo.title;
            desc=__shareInfo.desc;
            shareLogo=__shareInfo.shareLogo;
            wxShareUrl=__shareInfo.wxShareUrl;
            nativeShareUrl=__shareInfo.nativeShareUrl;
            shareSuccessCallBack=__shareInfo.shareSuccessCallBack;
            nativeTitle=__shareInfo.nativeTitle;
        }

    try {
        $.ajax({
            type: 'GET',
            data: {url: location.href.split('#')[0]},
            url: "/vrcarm/weichat/shared",
            dataType: "json",
            success: function (data) {
                if (data) {
                    wx.config({
                        debug: false,
                        appId: data.appId,
                        timestamp: data.timestamp,
                        nonceStr: data.nonceStr,
                        signature: data.signature,
                        jsApiList: [
                            'onMenuShareTimeline',
                            'onMenuShareAppMessage',
                            'onMenuShareQQ',
                            'onMenuShareWeibo',
                            'onMenuShareQZone'
                        ]
                    });
                }
            }
        });
    }catch(ex){
        console.log(ex);
    }

    wx.ready(function () {
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: wxShareUrl, // 分享链接
            imgUrl: shareLogo, // 分享图标
            success: function (res) {
                typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
            }
        });

        //分享给朋友
        wx.onMenuShareAppMessage({
            title: title,
            desc: desc,
            link: wxShareUrl,
            imgUrl: shareLogo,
            success: function (res) {
                typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
            }
        });

        //分享到QQ
        wx.onMenuShareQQ({
            title: title,
            desc: desc,
            link: wxShareUrl,
            imgUrl: shareLogo,
            success: function (res) {
                typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
            }
        });

        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: title,
            desc: desc,
            link: wxShareUrl,
            imgUrl: shareLogo,
            success: function (res) {
                typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
            }
        });

        //分享到QQ空间
        wx.onMenuShareQZone({
            title: title,
            desc: desc,
            link: wxShareUrl,
            imgUrl: shareLogo,
            success: function (res) {
                typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
            }
        });
    });

    window.nativeShare=function(){
        if(__isAutoHome==false && __isAutoPrice==false){
            return;
        }

        try {
            AHAPP.invokeNative('actionbarinfo', {
                title: nativeTitle,
                addmenulist: [],
                stablemenulist: ["share"],
                success: function (result) {
                    log(JSON.stringify(result)); //打印客户端返回的参数内容
                },
                fail: function (result) {
                    log(JSON.stringify(result));
                }
            });

        } catch (ex) { console.log(ex); }

        try {
            AHAPP.setNativeShareInfo({
                platform: 'all',
                url: nativeShareUrl ,
                title: title,
                content: desc,
                imgurl: shareLogo,
                success: function (result) {
                    typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
                    log(JSON.stringify(result)); //打印客户端返回的参数内容
                },
                fail: function (result) {
                    log(JSON.stringify(result));
                }
            });

            AHAPP.setNativeShareFinish({
                success: function (result) {
                    typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
                    log(JSON.stringify(result)); //打印客户端返回的参数内容
                },
                fail: function (result) {
                    log(JSON.stringify(result));
                }
            });
        } catch (ex) { console.log(ex);}
    };

    window.h5ToNativeShare=function(params){//h5唤起原生分享
        AHAPP.invokeNative('h5share', {
            platform: 'all',
            url: params.nativeShareUrl,
            title: params.title,
            content: params.desc,
            imgurl: params.shareLogo,
            success: function (result) {
                typeof (shareSuccessCallBack) != "undefined" && shareSuccessCallBack && shareSuccessCallBack();
            },
            fail: function (result) {
                log("fail" + JSON.stringify(result));
            }
        });
    }

    function getCookie(name, defval) {
        var nameEQ = name + "=";
        var result = "";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) result = unescape(c.substring(nameEQ.length, c.length));
        }

        if (result && result != "" && result != null) {
            return result;
        } else {
            return typeof defval == "undefined" ? null : defval;
        }
    }

    var __appkey = getCookie("app_key");
    window.__isAutoHome=false;
    window.__isAutoPrice=false;

    if (__appkey == "auto_iphone" || __appkey == "auto_android") {
        __isAutoHome = true;
    }
    else if (__appkey == "price_ios" || __appkey == "price_android") {
        __isAutoPrice = true;
    }

    if(__isAutoHome==true || __isAutoPrice==true){
        loadScript("//x.autoimg.cn/app/scripts/ahapp-2.0.js",function(){
            setTimeout('nativeShare()',3000);
        })
    }
})();

