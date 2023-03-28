package MyProject;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import MyProject.mobile.service.MobileService;
import net.sf.json.JSONArray;


public class CommonInterceptor extends HandlerInterceptorAdapter {
	protected final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private MobileService mobileService;
	
	
	
// @Override
// @ResponseBody
// public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
//     throws Exception {
//
//		String webRoot = request.getContextPath();
//		long startTime = System.currentTimeMillis();
//		request.setAttribute("startTime", startTime);
////		logger.info("                                                                              ");
////		logger.info("===========================          START         ===========================");
//		JSONObject cookie = RequestUtil.getCookieObject(request);
//		RequestUtil requestUtil = new RequestUtil();
//		
//		// 이동하는 url이 예외url 일경우
//		if (excludeUrl(request)) {
////			logger.info("======= call url is no login check =======");
//		} else {
////			isAjaxRequest(request);
//			JSONParser parser = new JSONParser();
//			String loginData = (String) cookie.get("loginData");
//			JSONObject obj = null; 
//			JSONObject comp1 = new JSONObject(); 
//			JSONObject comp2 = new JSONObject(); 
//			
//			if(loginData !=null) {
//				obj = (JSONObject) parser.parse( loginData );
////				logger.info("loginData cookie ok!");
//			}else {
////				logger.info("Not loginData cookie!");
//			}
//			
//			List<?> list = mobileService.loginData_Select(obj);
//			
//			if(list.isEmpty()) {
//				requestUtil.deleteAllCookies(request, response);
//				logger.info("사용자 정보가 없습니다.");
//				response.sendRedirect("/Login");
//			}else {
//				JSONArray jsonArray =  JSONArray.fromObject(list);
//				net.sf.json.JSONObject jsonObj = jsonArray.getJSONObject(0);
//				
//				comp1.put("userNm", jsonObj.get("userNm"));				
//				comp1.put("authCd", jsonObj.get("authCd"));				
//				comp1.put("mobile", jsonObj.get("mobile"));				
//				comp1.put("useYn", jsonObj.get("useYn"));				
//				comp1.put("userId", jsonObj.get("userId"));		
//				
//				comp2.put("userNm", obj.get("userNm"));				
//				comp2.put("authCd", obj.get("authCd"));				
//				comp2.put("mobile", obj.get("mobile"));				
//				comp2.put("useYn", obj.get("useYn"));				
//				comp2.put("userId", obj.get("userId"));		
//				
//				
//				//기존 쿠키 데이터와 DB 데이터를 비교
//				if(comp1.toString().equals(comp2.toString())) {
//					requestUtil.setLoginDataCookie(response,"loginData",loginData);
////					logger.info("DB loginData ok!");
//				
//				// DB데이터가 변경되었을경우	
//				}else {
//					requestUtil.deleteAllCookies(request, response);
//					logger.info((String) obj.get("userNm")+"님의 사용자 정보가 변경되었습니다.");
//					response.sendRedirect("/Login");
//				}
//				
//			}
//			
//		}
//		return super.preHandle(request, response, handler);
// }

// 
// @Override
// public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
//     ModelAndView modelAndView) throws Exception {
////		logger.info("===========================          END           ===========================");
// }
// 
//@Override
// public void afterCompletion(HttpServletRequest request,HttpServletResponse response, Object handler, Exception ex) throws Exception {
//		long startTime = (Long) request.getAttribute("startTime");
//		logger.info("Request ClientIP :" + CommonUtil.getClientIP(request) + " - URL ("+request.getMethod()+") : " + request.getRequestURL().toString() + " - Time : " + (System.currentTimeMillis() - startTime) + "ms");
//		
// }
// private boolean excludeUrl(HttpServletRequest request) {
//		String uri = request.getRequestURI().toString().trim();
//		if (uri.indexOf("/Login") > -1 
//				|| uri.indexOf("/LoginMsg.do") > -1 
//				|| uri.indexOf("/StoreList.do") > -1 
//				|| uri.indexOf("/memberYN_Select.do") > -1
//				|| uri.indexOf("/LoginMsgCheck.do") > -1
//				|| uri.indexOf("/MemberJoin.do") > -1
//				|| uri.indexOf("/joinYN_Select.do") > -1
//				|| uri.indexOf("/CscenterTel_Select.do") > -1){
//			return true;
//		} else
//			return false;
// }
//  
// private boolean isAjaxRequest(HttpServletRequest req) {
//		boolean ajaxCheck = "XMLHttpRequest".equals(req.getHeader("x-requested-with"));
//		return ajaxCheck;
// }

}

