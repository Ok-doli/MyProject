class CookieManager {
	
	// 로그인 쿠키
	setLoginData(param){
		var cookie = $.cookie('loginData');
		$.cookie('loginData', JSON.stringify(param),{expires : 3650, path :'/'});	//개발
//		$.cookie('loginData', JSON.stringify(param),{expires : 3650, path :'/', secure : true});	//운영
	}
	
	getLoginDataCookie(){
		return $.cookie('loginData') ? JSON.parse($.cookie('loginData')):null;
	}
	
	
	clearLoginCookie() {
		$.removeCookie('loginData', { path: '/' });
	}
	
	getDeviceCookie() {
		return $.cookie('device');
	}
	
	
	
}

