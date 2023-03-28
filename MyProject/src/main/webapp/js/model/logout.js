/**
 * 
 */  
$(document).ready(function() {
		var cookie = new CookieManager();
		var model = new MenuModel(cookie);
		
    	showMsg("로그인 데이터가 변경되어 로그아웃 됩니다.");
		this.model.getCookieManager().clearLoginCookie();
		
		
		setTimeout(function () {
			document.location.replace("/Login");
        }, 1000);
});
