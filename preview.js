
function checkEquipment(){
    if(/AppleWebKit.*Mobile/i.test(navigator.userAgent) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(navigator.userAgent))){
        if(window.location.href.indexOf("?mobile")<0){
            try{
                if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
                    //手机
                    //console.log("手机设备");
                    return "phone";
                }else if(/iPad/i.test(navigator.userAgent)){
                    //pad
                    //console.log("pad设备");
                    return "pad";
                }else{
                    //其他设备
                    //console.log("其他设备");
                    return "other";
                }
            }catch(e){}
        }
    }else{
        //电脑
        //console.log("电脑");
        return "pc";
    }
};

//该代码只在PC端执行
//如果在电脑端，执行该方法
$(function(){
		//加入自定义的样式
        var pcHTMLFun = function (picsHTML) {
            var mainHtml = '<div class="pc-qrcode">\
								<p>扫一扫，分享给朋友！</p>\
								<p id="qrcode_c"></p>\
								<div style="float:left; margin-top:20px; width:200px; font-size:12px; background:#fff; border-radius:5px; padding:5px;color:#666;">'+window.location.href+'</div>\
							</div>\
							<div class="view-box">'+ picsHTML +'</div>';


            var pc_body =$('<div class="pc-body">' + mainHtml + '</div>');

            $("body").append(pc_body);

        };
		
		
        $.ajax({
            url: 'getPriviewImgUrl.json',
            type: 'get',
            dataType: 'json',
            data: {},
            success:function(msg) {
                if("0000" == msg.code) {
                    var list = msg.data.imgUrlList;
                    var strHtml = '';
                    $.each(list, function (index, item) {
                        strHtml += '<div class="per-pic"><img src=""/></div>'             /*<img src="'+ item +'"/>*/
                    });
                    if(checkEquipment() == "pc") {      // pc
                    	$("body").css('background', '#fcf');
                        pcHTMLFun(strHtml);
                    } else {                            // 移动
                        var mobileBody = $('<div class="view-box">'+ strHtml +'</div>');
                        $("body").append(mobileBody);
                    };
                    loadImgs(list);
                    // $('#loading').css('display', 'none');
                };
            }
        });


        // 图片加载完成之后 隐藏加载提示
        function loadImgs(imgList) {
            if(!(imgList instanceof Array)) return;
            var count = 0;

            var getImgs = $('.view-box').find('.per-pic img');
            for (var i=0; i<imgList.length; i++) {
                (function (i) {
                    var imgObj = new Image();
                    imgObj.src = imgList[i];
					
					// 不能加载完第一张图片之后，隐藏加载提示，而是加载完所有图片后，再隐藏加载提示
                    // imgObj.onload = (function (i) {
                    //     if (i == 0) {
                    //         $('#loading').css('display', 'none');
                    //     };
                    // })(i);

                    imgObj.onload = function () {
                        if (count == imgList.length -1) {
                            $('#loading').css('display', 'none');
                        };
                        ++count;
                    };

                    getImgs.eq(i).attr('src', imgList[i]);
                })(i);
            };
        };

});



