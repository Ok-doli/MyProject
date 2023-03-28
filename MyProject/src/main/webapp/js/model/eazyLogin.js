
$(document).ready(function() {
	var cookie = new CookieManager();
	var model = new EazyLoginModel(cookie);
	var presenter = new EazyLoginPresenter(model);
	var view = new EazyLoginView(presenter);
	presenter.registerView(view);
	LoadNaviIcon();
});


/**
 * 데이터만 처리
 */
class EazyLoginModel {
	
	constructor(cookie){
        this.cookie = cookie;
        this.mode = "";
        this.chkFailCnt = 0;
    }
	
	process(data) {
	}
	
	setMode(mode) {
		this.mode = mode;
	}
	
	getMode(){
		this.mode;
	}
	
	getCookieManager() {
		return this.cookie;
	}
	
	setPinCode(code) {
		this.cookie.setAuthPinTypeCookie("on");
		this.cookie.setPinCodeCookie(code);
	}
	
	getChkFailCnt() {
		return this.chkFailCnt;
	}
	
	countChkFailCnt() {
		this.chkFailCnt += 1;
	}
}

/**
 * view 만 처리
 */
class EazyLoginView{
    constructor(presenter){
        this.presenter = presenter;
        this.doc = document;
        this.initEvent();
        
        // 디바이스 정보를 가져와서 각 native 모듈 구분하여 이용
        let device = this.presenter.model.getCookieManager().getDeviceCookie();
        this.native = new NativeViewManager(device);
    }
    
    // event 초기화
    initEvent() {

		var cnt = $("#easyPw").val().length;
		if(cnt != 4){
			$("#num_line"+cnt).addClass('eazy_login_inputNum_ck');
		}else{
			$("#num_line"+$("#easyPwCh").val().length).addClass('eazy_login_inputNum_ck');
		}
    	
    	this.doc.getElementById('btn_back').addEventListener("click", (e)=>{
    		if(this.presenter.model.mode != "setting"
    			&& this.presenter.model.mode != "settingCheck") {
    			this.presenter.model.getCookieManager().clearLoginCookie();
        		document.location.replace("/Login");
    		} else {
    			history.back();
    		}
    		
    	});


    	var t = document.getElementById("table");
    	var trs = t.getElementsByTagName("tr");
    	var tds = null;

    	for (var i=0; i<trs.length; i++)
    	{
    	    tds = trs[i].getElementsByTagName("td");
    	    for (var n=0; n<tds.length;n++)
    	    {
    	    	/* 버튼 클릭시 생기는 이벤트 */				
    	    	tds[n].addEventListener("click", (e)=>{
    	        	e.preventDefault();
    				$(this).addClass('eazy_tdColor');
    		   		$(".eazy_login_tdColor").show();
    				var target  = e.target;
    				var colorsize = $(".eazy_login_tdColor").width();
    				var tdsize = $("td").width();
    				
    				var tdheight = $("td").height();
    				var colorheight = $(".eazy_login_tdColor").height();
    				
    				var clientRect = target.getBoundingClientRect();
    				var select = $(".eazy_login_tdColor");
    				var position = select.offset();	
    				
    				position.top = clientRect.top;
    				position.top += ((tdheight/2)-(colorheight/2)); 
    				
    				position.left = clientRect.left;
    				position.left += ((tdsize/2)-(colorsize/2)); 
    				
    				select.offset(position);

    			 	setTimeout(() => {
    						 $(".eazy_login_tdColor").hide();
    					     $(this).removeClass('eazy_tdColor');
    					}, 100);

    				
    				this.setPw(target.outerText);
    	    	});
    	    }
    	}
    	
    	window.addEventListener("keyup", e => {
		  const key = e.key;
		  if(key == 0
			|| key == 1
			|| key == 2
		  	|| key == 3
	  		|| key == 4
  			|| key == 5
			|| key == 6
			|| key == 7
			|| key == 8
			|| key == 9
				  ) {
			  this.setPw(key);
		  }
		  
		});
		
    }
    
    setTitle(txt){
    	$('.login_title')[0].innerHTML = txt;
    }
    
    setSubTitle(txt){
    	$('.login_sub_title')[0].innerHTML = txt;
    }
    
    
    addText() {
		$("#easyPw").val('');
		$("#easyPwCh").val('');
		this.setTitle('간편번호 등록');
		if(this.presenter.model.mode == 'add'|| this.presenter.model.mode == 'addSetting' 
			){
			this.setSubTitle('사용하실 간편번호를 입력해주세요.');
		}else if(this.presenter.model.mode == 'check'|| this.presenter.model.mode == 'setting'){
			this.setTitle('간편번호');
			this.setSubTitle('기존 간편번호를 입력해주세요');
			$('.eazy_login_other_btn').show();
		}else{
			const $input = $("#easyPwCh");
			this.presenter.checkPincode($input.val());
			this.clearPinCode();
		}
	}
    
    
    checkText(){
    	this.presenter.model.mode = this.presenter.model.mode+'Check';
		$("#easyPwCh").val('');
		this.setTitle('간편번호 등록');
		this.setSubTitle('간편번호를 한번 더 입력해주세요');
		this.clearPinCode();
	}


    // 입력된 핀코드 초기화
    clearPinCode(){
		$.each($('.eazy_login_inputNum_area') ,function (index,item){
			$(item).removeClass('eazy_login_inputNum_ck');
			$(item).addClass('eazy_login_inputNum');
		});
		$('.eazy_login_inputNum_area').find('.eazy_login_inputVal').removeClass('eazy_login_inputVal');
		$('#num_line0').addClass('eazy_login_inputNum_ck');
	}
    
    
    CheckEasyPw(){
    	this.presenter.checkAddPass();
    	
	}
    
    
    setPw(pwText){
    	var cnt;
    	var $input;
    	if(this.presenter.model.mode == 'add' || this.presenter.model.mode == 'setting' || this.presenter.model.mode == 'addSetting'){
			$input = $("#easyPw");
		}
		else if(this.presenter.model.mode == 'addCheck' || this.presenter.model.mode == 'settingCheck' || this.presenter.model.mode == 'addSettingCheck'){
			$input = $("#easyPwCh");
		}
		else if(this.presenter.model.mode == 'check'){
			$input = $("#easyPw");
		}
		cnt = $input.val().length;

		if(pwText!=""&&pwText<10){
			if(cnt<4) {
				if (cnt >= 4) {
					return false;
				}
				// $("#num" + cnt).addClass('eazy_login_inputVal');
				// $("#num" + cnt).removeClass('eazy_login_inputNum');
				// $("#num" + cnt).css('border-bottom', '0px solid #7acc12');

				$('#num_line'+cnt).removeClass('eazy_login_inputNum');
				$('#num_line'+cnt).removeClass('eazy_login_inputNum_ck');
				$('#num'+cnt).addClass('eazy_login_inputVal');

				var pw = $input.val() + pwText;
				$input.val(pw);
				cnt += 1;
				//$("#num" + cnt).css('border-bottom', '2px solid #7acc12');
				$('#num_line'+cnt).addClass('eazy_login_inputNum_ck');

				if(cnt == 4){
					if(this.presenter.model.mode == 'add' || this.presenter.model.mode == 'addSetting'){
						this.checkText();
					}
					else if(this.presenter.model.mode == 'addCheck' || this.presenter.model.mode == 'settingCheck' || this.presenter.model.mode == 'addSettingCheck'){
						this.CheckEasyPw();
					}
					else if(this.presenter.model.mode == 'check' || this.presenter.model.mode == 'setting'){
						// pincode 체크
						
						this.presenter.checkPincode($input.val());
					} 
				}
			}
		}else {
			if (cnt < 4) {
				if (pwText == '취소') {
//					alert(this.presenter.model.mode);
					//$('.eazy_key_pad').removeClass('eazy_key_pad_view');
					//$("#num" + cnt).css('border-bottom', '2px solid #ccc');
					if(this.presenter.model.mode != "setting"
		    			&& this.presenter.model.mode != "settingCheck"
	    				&& this.presenter.model.mode != "addSetting"
    					&& this.presenter.model.mode != "addSettingCheck"
		    				) {
						setTimeout(() => {
							this.presenter.model.getCookieManager().clearLoginCookie();
			        		document.location.replace("/Login");
						}, 100);
		    			
		    		} else {
		    			this.backSetting();
		    		}
					return false;
				}

				$('#num_line'+cnt).addClass('eazy_login_inputNum');
				$('#num_line'+cnt).removeClass('eazy_login_inputNum_ck');
				cnt -= 1;
				$("#num" + cnt).removeClass('eazy_login_inputVal');
				$('#num_line'+cnt).addClass('eazy_login_inputNum_ck');
				$('#num_line'+cnt).addClass('eazy_login_inputNum');

				$input.val($input.val().substr(0, ($input.val().length - 1)));

				if ($input.val().length == 0) {
					$input.val("");
					$('#num_line0').addClass('eazy_login_inputNum_ck');
				} else {
					$('#num_line'+cnt).addClass('eazy_login_inputNum');
					$('#num_line'+cnt).addClass('eazy_login_inputNum_ck');
				}
			}
		}
	}
   
    showMsg(msg){
    	showMsg(msg);
    }
    
    /**
	 * home 화면으로 이동
	 */
    postHome() {
    	this.presenter.postLoginInfo().then(response => {
    		response.json().then(result => {
    			this.presenter.model.getCookieManager().setAuthDataCookie(result.authData);
    			
    			document.location.replace("/Home");
    		});
    		
    		
    	});
    }
    
    /**
	 * Setting 화면으로 이동
	 */
    postSetting() {
    	history.back();
    }
    
    hideBackBtn() {
    	if(this.presenter.model.mode != "setting"
    		&& this.presenter.model.mode != "settingCheck") {
//    		this.doc.getElementById("backComment").innerHTML = "뒤로가기";
    		this.doc.getElementById("btnBack").style.visibility = "hidden";
    	}
    }
    
    backSetting() {
    	
		const reffer = this.doc.getElementById("reffer").value
		document.location.replace("/Setting?menu=Y&reffer="+reffer);
    }
}

/**
 * 로직만 처리
 */
class EazyLoginPresenter {
	constructor(model){
      this.model = model;
	}
	
    registerView(view){
    	this.view = view;
    	this.initViewProcess();
    }
    
    
    // password셋팅성공시
    passSetSuccess(code) {
    	
	    	this.view.showMsg("간편번호가 등록되었습니다.");
	    	this.setPinCode(code);
	    	if(this.model.mode == "addCheck") {
	    		
	    		this.view.postHome();
	    	} else if(this.model.mode == "addSettingCheck") {
	    		this.view.postSetting();
	    	}
	    
    	
    }
    
    postLoginInfo() {
    	
    	return fetch("/api/updateLoginCount", {
	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	        credentials: 'same-origin', // include, *same-origin, omit
	        headers: {
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
	        redirect: 'follow', // manual, *follow, error
	        referrer: 'no-referrer'
	    });
    }
    
    /**
	 * view 등록시 view 기능 초기화
	 */
    initViewProcess() {
    	// 공통기능
    	checkOnLoad();
    	
		let mode = document.getElementById("mode").value;
		this.model.setMode(mode);
		this.view.addText();
		
		
		this.view.hideBackBtn();
    }
    
    setPinCode(code) {
    	this.model.setPinCode(code);
    }
    
    
    checkPincode(pinCode) {
    	let cPinCoode = this.model.getCookieManager().getPinCodeCookie();
    	
    	if(pinCode == cPinCoode) {
    		
			// 성공(화면이동)
    		if(this.model.mode == "setting") {
    			this.view.clearPinCode();
    			this.model.setMode("addSetting");
    			this.view.addText();
        	} else {
        		this.view.postHome();
        	}
    		
    		
    	} else {
    		this.model.countChkFailCnt();
    		this.checkPw();
    		this.view.showMsg("간편번호가 일치하지 않습니다.("+this.model.getChkFailCnt()+"/"+"5"+")\n다시 시도해주세요.");
    		
    		if(this.model.getChkFailCnt()==5) {
    			this.view.showMsg("간편번호가 일치하지 않습니다.(5/5)\n처음부터 다시 시도해주세요.");

    			if(this.model.mode == "setting") {
    				this.model.getCookieManager().setAuthPinTypeCookie("off");
    				this.view.backSetting();
    			} else {
    				this.model.getCookieManager().clearLoginCookie();
        			
        			setTimeout(function () {
        				document.location.replace("/Login");
    	            }, 1000);
        			// 화면이동 처음으로
    			}
    			
    			
    		} else {
    			this.view.clearPinCode();
    		}
    	}
    	
    }
    
    checkAddPass() {
    	let code = $('#easyPw').val();
		if(code == $('#easyPwCh').val()){
			if(this.model.mode == "addCheck") {
				this.view.setSubTitle('간편번호가 등록되었습니다.');
				this.passSetSuccess(code);
			} else if(this.model.mode == "addSettingCheck") {
				this.view.setSubTitle('간편번호가 등록되었습니다.');
				this.passSetSuccess(code);
			}
		}else{
			this.model.countChkFailCnt();
			this.view.showMsg("간편번호가 일치하지 않습니다.("+this.model.getChkFailCnt()+"/"+"5"+")\n다시 시도해주세요.");
    		
    		if(this.model.getChkFailCnt()==5) {
    			this.view.showMsg("간편번호가 일치하지 않습니다.(5/5)\n처음부터 다시 시도해주세요.");
    			
    			
    			if(this.model.mode == "addSettingCheck") {
    				this.model.getCookieManager().setAuthPinTypeCookie("off");
    				this.view.backSetting();
    			} else {
    				this.model.getCookieManager().clearLoginCookie();
        			
        			
        			setTimeout(function () {
        				document.location.replace("/Login");
    	            }, 1000);
        			// 화면이동 처음으로
    			}
    			
    		} else {
//    			$("#easyPw").val('');
    			$("#easyPwCh").val('');
    			this.view.clearPinCode();
    		}
			
		}
    }
    
    checkPw() {
    	if(this.model.mode == "setting") {
    		
    	} else {
    		this.model.setMode("check");
		}
    	
    	this.view.addText();
    }

}