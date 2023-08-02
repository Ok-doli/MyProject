package MyProject.mobile.controller;

import java.io.BufferedReader;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import MyProject.LogUtil;
import MyProject.RequestUtil;
import MyProject.mobile.service.MobileService;

import java.awt.Dimension;
import java.awt.DisplayMode;
import java.awt.GraphicsDevice;
import java.awt.GraphicsEnvironment;

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
//		HttpServletResponse response) throws Exception {
//
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
//		redirectView.setUrl(view);
//	
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

	@RequestMapping(value = "/TabletPosHome2.do")
	public String TabletPosHome2(HttpServletRequest request, ModelMap model) throws Exception {
		return "TabletPos/TabletPosHome2";
	}

	@RequestMapping(value = "/postReateHome.do")
	public String postReateHome(HttpServletRequest request, ModelMap model) throws Exception {
		return "reate/reateHome";
	}

	public String DeviceCheck(HttpServletRequest req) {
		String userAgent = req.getHeader("User-Agent").toUpperCase();
		String Device;
		String IS_MOBILE = "MOBILE";
		String IS_PHONE = "PHONE";
		String IS_TABLET = "TABLET";
		String IS_PC = "PC";

//	    if(userAgent.indexOf(IS_MOBILE) > -1) {
//	        if(userAgent.indexOf(IS_PHONE) == -1)
//		    return IS_MOBILE;
//		else
//		    return IS_TABLET;
//	    } else
//	return IS_PC; 
//		Device = (userAgent.indexOf(IS_MOBILE) > -1) ? (userAgent.indexOf(IS_PHONE) == -1) ? IS_PHONE :  IS_TABLET	: IS_PC;
		Device = (userAgent.indexOf(IS_MOBILE) > -1) ? (userAgent.indexOf(IS_PHONE) == -1) ? IS_PHONE : IS_PHONE
				: IS_PC;

		return Device;
	}

	@RequestMapping(value = "/notice_Select.do", method = RequestMethod.POST)
	public ResponseEntity<JSONObject> notice_Select(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		JSONObject obj = new JSONObject();
		HttpStatus status = HttpStatus.OK;
		int resultCode = 0;
		int imgCode = 0;

		try {
			List<Map> dashboard_notices_data = null;
			String json = RequestUtil.readJSONStringFromRequestBody(request);
			JSONObject param = RequestUtil.convertStrToObj(json); // 오브젝트 파람

			dashboard_notices_data = mobileService.notice_Select(param);
			if (resultCode == 0) {

				for (int i = 0; i < dashboard_notices_data.size(); i++) {
					Map map = (Map) dashboard_notices_data.get(i);
					StringBuffer strOut = new StringBuffer();

					if (map.get("content") instanceof java.sql.Clob) {

						String str = "";
						java.sql.Clob clob = (java.sql.Clob) map.get("content");
						BufferedReader br = new BufferedReader(clob.getCharacterStream());

						while ((str = br.readLine()) != null) {
							strOut.append(str);
						}

					}
					map.put("contentTxt", strOut);
					map.remove("content");
				}
				if (dashboard_notices_data.size() > 0) {
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
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping(value = "/EntrpsNm_Select.do", method = RequestMethod.POST)
	public void EntrpsNm_Select(HttpServletRequest request, HttpServletResponse response) throws Exception {
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