
const OM_ADMIN = "OM_ADMIN"; // 관리자
const OM_CENTER = "OM_CENTER";	 // 본부영업사원
const OM_SALES = "OM_SALES";	//MT영업사원
const OM_GTSALES = "OM_GTSALES";	 //GT영업사원


class CodeManager {
	getCode(data) {
		return fetch("/api/common", {
	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	        credentials: 'same-origin', // include, *same-origin, omit
	        headers: {
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
	        redirect: 'follow', // manual, *follow, error
	        referrer: 'no-referrer', // no-referrer, *client
	        body: JSON.stringify(data), // body data type must match "Content-Type" header
	    });
	}
	
	getCommonCode(type, param) {
		// check validation 
		
		// save checkbox value
		this.model.getCookieManager().setCheckBoxCookie(this.view.getSaveIdValue(),this.view.getIdValue());
		
		
		this.getCode({
			type : type
			,param : param
		})
		.then(response => {
			if(response.status == 200) {
		    	response.json().then(result => {
		    		if(result.code == 0) {
		    			return result.commonData;
		    		}
		    	});
	    		
			} else {
				return null;
			}
			
		});
	}
	
}

