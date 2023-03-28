package MyProject;
import java.io.BufferedReader;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import com.fasterxml.jackson.databind.ObjectMapper;

import MyProject.common.Properties;

public class RequestUtil {

	/* input name이 한개인 경우 -> HashMap(String키,String값) */
	public static HashMap<String, Object> getParameter(
			HttpServletRequest request) {
		HashMap<String, Object> returnHm = new HashMap<String, Object>();
		Enumeration<?> enumeration1 = request.getParameterNames();
		while (enumeration1.hasMoreElements()) {
			String name = (String) enumeration1.nextElement();
			try {
				if ((String) request.getParameter(name) != null) {
					returnHm.put(name, (String) request.getParameter(name));
				}
			} catch (Exception e) {
			}
		}

		return returnHm;
	}
	
	/* input name이 한개인 경우 -> HashMap(String키,String값) */
	public static JSONObject getParameterToJson(
			HttpServletRequest request) {
		JSONObject obj = new JSONObject();
		Enumeration<?> enumeration1 = request.getParameterNames();
		while (enumeration1.hasMoreElements()) {
			String name = (String) enumeration1.nextElement();
			try {
				if ((String) request.getParameter(name) != null) {
					String decodeStr = URLDecoder.decode((String) request.getParameter(name), "UTF-8");
					obj.put(name, decodeStr);
				}
			} catch (Exception e) {
			}
		}

		return obj;
	}

	/* input name이 한개인 경우 -> HashMap(String키,String값) */
	public static HashMap<String, Object> getDataParameter(
			HttpServletRequest request) {
		HashMap<String, Object> returnHm = new HashMap<String, Object>();
		Enumeration<?> enumeration1 = request.getParameterNames();
		while (enumeration1.hasMoreElements()) {
			String name = (String) enumeration1.nextElement();

			try {
				if ((String) request.getParameter(name) != null) {
					String value = (String) request.getParameter(name);
					name = name.replaceAll("data\\[", "");
					name = name.replaceAll("\\]", "");
					returnHm.put(name, value);
				}
			} catch (Exception e) {
			}
		}

		return returnHm;
	}

	/* input name이 여러개인 경우 -> HashMap(String키,String[]값) */
	public static HashMap<String, Object[]> getParameterValues(
			HttpServletRequest request) {
		HashMap<String, Object[]> returnHm = new HashMap<String, Object[]>();
		Enumeration<?> enumeration1 = request.getParameterNames();
		while (enumeration1.hasMoreElements()) {
			String name = (String) enumeration1.nextElement();
			try {
				if ((String[]) request.getParameterValues(name) != null) {
					returnHm.put(name,
							(Object[]) request.getParameterValues(name));
				}
			} catch (Exception e) {
			}
		}
		return returnHm;
	}
	
	public static JSONArray convertListToArray(List<?> list) {
		JSONArray array = new JSONArray();
		try {
			for(int i = 0; i < list.size(); i++) {
				ObjectMapper mapper = new ObjectMapper();
				
				JSONParser parser = new JSONParser();
				JSONObject obj = (JSONObject) parser.parse(mapper.writeValueAsString(list.get(i))); 
				
				array.add(obj);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return array;
	}
	
	public static String readJSONStringFromRequestBody(HttpServletRequest request){
	    StringBuffer json = new StringBuffer();
	    String line = null;
	 
	    try {
	        BufferedReader reader = request.getReader();
	        while((line = reader.readLine()) != null) {
	            json.append(line);
	        }
	        
	    }catch(Exception e) {
	        System.out.println("Error reading JSON string: " + e.toString());
	    }
	    return json.toString();
	}
	
	public static JSONObject convertStrToObj(String str) {
		JSONObject jsonObj = new JSONObject();
		
		try {
			if(str.length() == 0) {
				return jsonObj; 
			}
			JSONParser parser = new JSONParser();
			Object obj = parser.parse( str );


			jsonObj = (JSONObject) obj;
			
		} catch (Exception e) {
			e.printStackTrace();
		}

		return jsonObj;
	}
	
	public static JSONObject getCookieObject(HttpServletRequest request) {
		JSONObject jsonObj = new JSONObject();
		Cookie[] cookies = request.getCookies() ;
        try {
        	if(cookies != null){
	             
	            for(int i=0; i < cookies.length; i++){
	                Cookie c = cookies[i] ;
	                 
	                // 저장된 쿠키 이름을 가져온다
	                String cName = c.getName();
	                // 쿠키값을 가져온다
	                String cValue = c.getValue() ;
	                
	                ObjectMapper mapper = new ObjectMapper();
					
					if(cName.equals("loginData")) {
						String deString = URLDecoder.decode(cValue);
						jsonObj.put(cName, deString);
						
						
					} 
	            }
	        }
		} catch (Exception e) {
			e.printStackTrace();
		}
	        
        return jsonObj;
	}
	
	public void setLoginDataCookie(HttpServletResponse res,String name, String list) throws UnsupportedEncodingException{
		try {
			String mode = Properties.getActive().toString();
			Cookie cookie = new Cookie(name, URLEncoder.encode(list)); // 쿠키 이름 지정하여 생성( key, value 개념)
		    cookie.setMaxAge(60*60*24*365); //쿠키 유효 기간: 1년
		    cookie.setPath("/"); //모든 경로에서 접근 가능하도록 설정
		    if(mode.equals("real")) {
		    	cookie.setSecure(true);	// 운영서버 https 전용
		    }else {
		    	cookie.setSecure(false);	
		    }
		    res.addCookie(cookie); //response에 Cookie 추가
		    
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	
	}
	
	
	public void deleteAllCookies(HttpServletRequest req,HttpServletResponse res) {
	    Cookie[] cookies = req.getCookies(); // 모든 쿠키의 정보를 cookies에 저장
	    if (cookies != null) { // 쿠키가 한개라도 있으면 실행
	        for (int i = 0; i < cookies.length; i++) {
	            cookies[i].setMaxAge(0); // 유효시간을 0으로 설정
	            res.addCookie(cookies[i]); // 응답에 추가하여 만료시키기.
	        }
	    }
	}


}
