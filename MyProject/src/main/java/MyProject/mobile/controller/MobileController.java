package MyProject.mobile.controller;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.RandomStringUtils;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

import MyProject.LogUtil;
import MyProject.RequestUtil;
import MyProject.mobile.AuthVO;
import MyProject.mobile.service.MobileService;

/**
 * @FileName : MyProject.mobile.controller |_ MobileController.java
 * 
 * @Project : MyProject
 * @Date : 2021. 3. 26.
 * @작성자 : cfeelg
 * @변경이력 :
 * @프로그램 설명 :
 */
@Controller
public class MobileController extends LogUtil {

	final static Logger LOGGER = LoggerFactory.getLogger(MobileController.class);

	MobileController() {
		super(LOGGER);
	}

	@Autowired
	private MobileService mobileService;

	/**
	 * @Method Name : Main
	 * @작성일 : 2021. 3. 26.
	 * @작성자 : cfeelg
	 * @변경이력 :
	 * @Method 설명 : 로그인
	 * @param request
	 * @param model
	 * @param redirectAttributes
	 * @return
	 * @throws Exception
	 */

//	@RequestMapping(value = { "/", "/CheckAuth" })
//	public RedirectView Root(HttpServletRequest request, ModelMap model, RedirectAttributes redirectAttributes,
//			HttpServletResponse response) throws Exception {
//		RedirectView redirectView = new RedirectView();
//		JSONObject cookie = RequestUtil.getCookieObject(request);
//		JSONParser parser = new JSONParser();
//		
//		String view = "/Login";
//		
//		String loginData =  (String) cookie.get("loginData");
//		JSONObject obj = null; 
//		
//		if(loginData !=null) {
//			obj = (JSONObject) parser.parse( loginData );
//			view = "/WaterHome.do?first=ok";
//			
//		}
//		
//		String device = (String) cookie.get("device") == null ? "" : (String) cookie.get("device");
//
//
//		redirectView.setUrl(view);
//
//		return redirectView;
//	}
	@RequestMapping(value = "/")
	public String myHome(HttpServletRequest request, ModelMap model) throws Exception {

		return "main/myHome";
	}

	@RequestMapping(value = "/Setting.do")
	public String SettingDo(HttpServletRequest request, ModelMap model) throws Exception {

		return "main/Setting";
	}
	@RequestMapping(value = "/BlueOneHome.do")
	public String postBlueOne(HttpServletRequest request, ModelMap model) throws Exception {
		
		return "blueOne/blueOneHome";
	}
	@RequestMapping(value = "/TabletPosHome.do")
	public String TabletPosHome(HttpServletRequest request, ModelMap model) throws Exception {
		
		return "TabletPos/TabletPosHome";
	}



	@RequestMapping(value = "/notice_Select.do", method = RequestMethod.POST)
	public ResponseEntity<JSONObject> notice_Select(HttpServletRequest request,  HttpServletResponse response) throws Exception {
		JSONObject obj = new JSONObject();
		HttpStatus status = HttpStatus.OK;
		int resultCode = 0;
		int imgCode = 0;
		
		
		
		try {
			List<Map> dashboard_notices_data = null;
			String json = RequestUtil.readJSONStringFromRequestBody(request);
			JSONObject param = RequestUtil.convertStrToObj(json); //오브젝트 파람
			
			
			dashboard_notices_data = mobileService.notice_Select(param);
			if(resultCode == 0) {
				
				for(int i = 0; i < dashboard_notices_data.size(); i++) {
					Map map = (Map)dashboard_notices_data.get(i);
					StringBuffer strOut = new StringBuffer();


					if(map.get("content") instanceof java.sql.Clob) {
						
						String str = "";
						java.sql.Clob clob = (java.sql.Clob)map.get("content");
						BufferedReader br = new BufferedReader(clob.getCharacterStream());
						
						while((str = br.readLine()) != null ) {
							strOut.append(str);
						}
						
						
					}
					map.put("contentTxt", strOut);
					map.remove("content");
				}
				if(dashboard_notices_data.size() > 0) {
					obj.put("Notices", RequestUtil.convertListToArray(dashboard_notices_data));
					
				}
			}
		
			
		} catch (Exception e) {
			status = HttpStatus.EXPECTATION_FAILED;
			resultCode = -1;
			e.printStackTrace();
		}
		
		
		response.setContentType("application/json; charset=UTF-8");

		
		
		obj.put("code", resultCode);
		obj.put("status", status.value());
		obj.put("statusText", status);
		
		obj.put("message", status);

		
		
		return new ResponseEntity<JSONObject>(obj, status);
	}
	

	
	/**
	 * 로그인 가맹점명 조회 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/EntrpsNm_Select.do", method = RequestMethod.POST)
	public void EntrpsNm_Select(HttpServletRequest request,  HttpServletResponse response) throws Exception {
		net.sf.json.JSONArray jsonArray = new net.sf.json.JSONArray();
		HashMap<String, Object> param = RequestUtil.getParameter(request);
		List<?> list = mobileService.EntrpsNm_Select(param);
		jsonArray = net.sf.json.JSONArray.fromObject(list);
		response.setContentType("application/json; charset=UTF-8");
		PrintWriter out = response.getWriter();
		out.print(jsonArray);
		out.flush();
		out.close();
	}
	

}