package MyProject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.Socket;
import java.net.URL;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.codec.binary.Hex;
import org.json.simple.parser.JSONParser;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JSONSerializer;

public class CommonUtil {
	
	
	protected final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	
	

	
	/**
	 * 그리드 데이터 JSONArray로 변환
	 * 
	 * @return
	 */
	public static JSONArray parseGridToJArr(HttpServletRequest request) {
		JSONArray grids = new JSONArray();
		try {
			String griddata = request.getParameter("data");
			if (griddata == null) {
				return grids;
			}
			griddata = griddata.replace("&quot;", "'");
			grids = JSONArray.fromObject(JSONSerializer.toJSON(griddata));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return grids;
	}

	/**
	 * 그리드 데이터 JSONArray로 변환
	 * 
	 * @return
	 */
	public static JSONArray parseGridToJArr(HttpServletRequest request, String key) {
		JSONArray grids = new JSONArray();

		try {
			String griddata = request.getParameter(key);
			if (griddata == null) {
				return grids;
			}
			griddata = griddata.replace("&quot;", "'");
			grids = JSONArray.fromObject(JSONSerializer.toJSON(griddata));
		} catch (Exception e) {
			e.printStackTrace();
		}

		return grids;
	}

	public static HashMap<String, Object> jsonToMap(JSONObject json) throws JSONException {
		HashMap<String, Object> retMap = new HashMap<String, Object>();

		if (!json.isNullObject()) {
			retMap = toMap(json);
		}
		return retMap;
	}

	public static HashMap<String, Object> toMap(JSONObject object) throws JSONException {
		HashMap<String, Object> map = new HashMap<String, Object>();

		Iterator<String> keysItr = object.keys();
		while (keysItr.hasNext()) {
			String key = keysItr.next();
			Object value = object.get(key);

			if (value instanceof JSONArray) {
				value = toList((JSONArray) value);
			}

			else if (value instanceof JSONObject) {
				value = toMap((JSONObject) value);
			}
			map.put(key, value);
		}
		return map;
	}

	public static List<Object> toList(JSONArray array) throws JSONException {
		List<Object> list = new ArrayList<Object>();
		for (int i = 0; i < array.size(); i++) {
			Object value = array.get(i);
			if (value instanceof JSONArray) {
				value = toList((JSONArray) value);
			}

			else if (value instanceof JSONObject) {
				value = toMap((JSONObject) value);
			}
			list.add(value);
		}
		return list;
	}

	/**
	 * SHA256 해쉬 암호화 //@param String
	 * 
	 * @return String
	 * @exception Exception
	 */
	public static String toSha256(String inString) throws Exception {
		String SHA = "";
		try {
			MessageDigest sh = MessageDigest.getInstance("SHA-256");
			sh.update(inString.getBytes());
			byte byteData[] = sh.digest();
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < byteData.length; i++) {
				sb.append(Integer.toString((byteData[i] & 0xff) + 0x100, 16).substring(1));
			}
			SHA = sb.toString();
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
			SHA = null;
		}
		return SHA;
	}

	public static HashMap<String, Object> sliceHashMapKey(HashMap<String, Object> target, String replaceString) {
		HashMap<String, Object> temp = new HashMap<String, Object>();
		for (String key : target.keySet()) {
			if (key.substring(key.length() - replaceString.length()).equals(String.valueOf(replaceString))) {
				temp.put(key.substring(0, key.length() - replaceString.length()), target.get(key));
			} else {
				temp.put(key, target.get(key));
			}
		}
		return temp;
	}

	/**
	 * 년 월 일 날짜 더하기
	 *
	 * @param dt(날짜) , y(년) , m(월), d(일)
	 * @Exam addDate("20180910",1,12,1) -->20200911
	 * @return String
	 */
	public static String addDate(String dt, int y, int m, int d) throws Exception {
		SimpleDateFormat format = new SimpleDateFormat("yyyyMMdd");

		Calendar cal = Calendar.getInstance();
		Date date = format.parse(dt);
		cal.setTime(date);
		cal.add(Calendar.YEAR, y); // 년 더하기
		cal.add(Calendar.MONTH, m); // 년 더하기
		cal.add(Calendar.DATE, d); // 년 더하기

		return format.format(cal.getTime());

	}

	public static String convert36t10(long num10) { // 10진수를 36진수로 변환
		return Long.toString(num10, 36);
	}

	public static long convert10t36(String str36) { // 36진수를 10진수로 변환.
		return Long.parseLong(str36, 36);
	}

	private static final long base = 62; // 62진수로 표현위해 나누는 변수 값

	/**
	 * 10진수를 62진수로 변환.
	 * 
	 * @param num10  long type의 10진수.
	 * @param length 결과 값의 길이.
	 * @return 변환된 62진수 String.
	 */
	public static String convert62t10(long num10, int length) { // 10진수를 62진수로 변환
		long modofresult = 0;
		StringBuilder result62 = new StringBuilder();

		do {
			modofresult = num10 % base;
			if (modofresult <= 9) {
				result62.insert(0, modofresult);
			} else if (modofresult <= 35) {
				result62.insert(0, (char) (65 + (modofresult - 10)));
			} else if (modofresult <= 61) {
				result62.insert(0, (char) (97 + (modofresult - 36)));
			}

			num10 /= base;

		} while (num10 > 0);

		for (int i = result62.length(); i < length; i++) {
			result62.insert(0, "0");
		}

		return result62.toString();
	}

	/**
	 * 10진수를 62진수로 변환.
	 * 
	 * @param num10 long type의 10진수.
	 * @return 변환된 62진수 String.
	 */
	public static String convert62t10(long num10) { // 10진수를 62진수로 변환
		return convert62t10(num10, 0);
	}

	public static String make62string() {
		long v = new Random().nextInt(1000000000) + 100000000;
		return convert62t10(v, 0);
	}

	public static int change10(String bbsDepth) {
		if (bbsDepth == null || bbsDepth.length() != 30) {
			return 0;
		}

		double decimalValue = 0;
		for (int i = 30; i > 0; i -= 5) {
			String depth = bbsDepth.substring(i - 5, i);
			int value = 0;
			if (!depth.equals("zzzzz")) {
				for (int j = 4; j >= 0; j--) {
					char oneChar = depth.charAt(j);
					if (Character.isDigit(oneChar)) {
						value = Integer.parseInt(String.valueOf(depth.charAt(j)));
						decimalValue = decimalValue + (value * Math.pow(62, 4 - j));
					} else {
						byte a = (byte) (oneChar);
						if (a <= 90) {
							value = (a - 65) + 10;
						} else if (a <= 122) {
							value = (a - 97) + 36;
						}
						decimalValue = decimalValue + (value * Math.pow(62, 4 - j));
					}
				}
				break;
			} else {
				continue;
			}
		}
		return (int) decimalValue;
	}

	public static long convert10t62(String base62) {
		if (base62 == null || base62.length() < 1) {
			return 0;
		}

		int len = base62.length();
		double decimalValue = 0;
		int value = 0;

		for (int i = len - 1; i >= 0; i--) {
			char oneChar = base62.charAt(i);
			if (Character.isDigit(oneChar)) {
				value = Integer.parseInt(String.valueOf(base62.charAt(i)));
				decimalValue = decimalValue + (value * Math.pow(62, (len - 1) - i));
			} else {
				byte a = (byte) (oneChar);
				if (a <= 90) {
					value = (a - 65) + 10;
				} else if (a <= 122) {
					value = (a - 97) + 36;
				}
				decimalValue = decimalValue + (value * Math.pow(62, (len - 1) - i));
			}
		}

		return (long) decimalValue;
	}

	public static String plusOneFor62(String base62) {
		String ret = null;
		ret = convert62t10(convert10t62(base62) + 1);
		if (base62.startsWith("0")) {
			ret = "0000000000000000" + ret;
			ret = ret.substring(ret.length() - base62.length());
		}
		return ret;
	}

	// 프로시저 결과 해쉬맵의 out만 추려서 반환
	public static HashMap<String, Object> makeOutMap(HashMap<String, Object> target) {
		HashMap<String, Object> temp = new HashMap<String, Object>();
		for (String key : target.keySet()) {
			if (key.substring(0, 2).toUpperCase().equals("O_")) {
				temp.put(key, target.get(key));
			}
		}
		return temp;
	}

	/**
	 * 엑셀 다운로드 //@param hashMap
	 * 
	 * @return ExcelFile
	 * @exception Exception
	 */
	@RequestMapping(value = "/exceldown.do", method = RequestMethod.POST)
	public String excelDownload(ModelMap model, HttpServletRequest request) throws Exception {

		String griddata = request.getParameter("postData");
		griddata = griddata.replace("&quot;", "'");
		JSONObject jsonObj = JSONObject.fromObject(JSONSerializer.toJSON(griddata));
		System.out.println("===================================================");
		System.out.println(jsonObj);
		System.out.println("===================================================");
		model.addAttribute("JsonData", jsonObj);
		return "ExcelDownload";
	}

	/**
	 * 
	 * @param input
	 * @param length
	 * @param padString
	 * @return
	 */
	public static String lpad(String input, int length, String padString) {

		if (input == null || input.trim().equals("")) {
			input = "";
		}
		if (input.length() >= length) {
			return input;
		}

		int len = length - input.length();

		for (int i = 0; i < len; i++) {
			input = padString + input;
		}
		return input;
	}

	/**
	 * null인 경우 길이 없는 값으로 처리
	 * 
	 * @param input
	 * @return
	 */
	public static String null2Void(String input) {

		if (input == null || input.trim().equals("")) {
			input = "";
		}
		return input;
	}

	/**
	 * null인 경우 길이 0으로 처리
	 * 
	 * @param input
	 * @return
	 */
	public static String null2Zero(String input) {

		if (input == null || input.trim().equals("")) {
			input = "0";
		}
		return input;
	}

	/**
	 * null인경우 치환하는 경우
	 * 
	 * @param input
	 * @return
	 */
	public static String null2Replace(String input, String replaceStr) {

		if (input == null || input.trim().equals("")) {
			input = replaceStr;
		}
		return input;
	}

	/**
	 * 토큰 처리
	 * 
	 * @param input
	 * @param splitStr
	 * @return
	 */
	public static String[] split(String input, String deliWord) {

		String[] returnList = null;

		if (input == null || input.trim().equals("")) {
			return null;
		}
		try {
			returnList = input.split("\\" + deliWord);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnList;
	}

	/**
	 * 스트링 배열을 Array로 변환
	 * 
	 * @return
	 */
	public static List<String> convertArray(String[] input) {
		List<String> rList = new ArrayList<String>();

		if (input == null || input.length <= 0) {
			return rList;
		}

		for (int i = 0; i < input.length; i++) {
			rList.add(input[i]);
		}
		return rList;
	}

	/**
	 * 스트링에 특정값을 토큰하여 Array로 변환
	 * 
	 * @return
	 */
	public static List<String> convertArray(String input, String splitStr) {
		List<String> rList = new ArrayList<String>();

		String[] splitList = split(input, splitStr);
		if (splitList == null || splitList.length <= 0) {
			return rList;
		}
		for (int i = 0; i < splitList.length; i++) {
			rList.add(splitList[i]);
		}
		return rList;
	}

	// 서버에서 로드벨런싱을 사용하는경우 실제 클라이언트IP 취득을 위함.
	public static String getClientIP(HttpServletRequest request) {
		String ip = request.getHeader("X-Forwarded-For");
		if (ip == null) {
			ip = request.getHeader("Proxy-Client-IP");
		}
		if (ip == null) {
			ip = request.getHeader("WL-Proxy-Client-IP");
		}
		if (ip == null) {
			ip = request.getHeader("HTTP_CLIENT_IP");
		}
		if (ip == null) {
			ip = request.getHeader("HTTP_X_FORWARDED_FOR");
		}
		if (ip == null) {
			ip = request.getRemoteAddr();
		}
		return ip;
	}

	/**
	/**
	 * json을 string으로 변환(null체크)
	 * 
	 * @param obj
	 * @param id
	 * @return
	 */
	public static String convertJsonToString(JSONObject obj, String id) {

		if (obj.get(id) == null) {
			return null;
		} else if (JSONNull.getInstance().equals(obj.get(id))) {
			return null;
		}

		String resultStr = (String) obj.get(id);

		return resultStr;
	}
	
	public static String sendREST(String sendUrl, String authKey, String jsonValue) throws IllegalStateException {
		String inputLine = null;
		StringBuffer outResult = new StringBuffer();

		  try{
//			   LOGGER.debug("REST API Start");
			URL url = new URL(sendUrl);
			HttpURLConnection conn = (HttpURLConnection) url.openConnection();
			conn.setDoOutput(true);
			conn.setRequestMethod("POST");
			conn.setRequestProperty("Content-Type", "application/json");
			conn.setRequestProperty("Accept-Charset", "UTF-8"); 
			conn.setRequestProperty ("Authorization", authKey);
			conn.setConnectTimeout(10000);
			conn.setReadTimeout(10000);
		      
			OutputStream os = conn.getOutputStream();
			os.write(jsonValue.getBytes("UTF-8"));
			os.flush();
		    
			// 리턴된 결과 읽기
			BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream(), "UTF-8"));
			while ((inputLine = in.readLine()) != null) {
				outResult.append(inputLine);
			}
		    
			conn.disconnect();
//			LOGGER.debug("REST API End");        
		  }catch(Exception e){
//			  LOGGER.error(e.getMessage(), e);
		      e.printStackTrace();
		  }	
		  
		  return outResult.toString();
		}
	
	


	public static String makeLockerSocketTxt(int M_B_Cnt, int F_B_Cnt, int Total_Cnt, String Man_locker)
    {
		String sendLockerText = "";
        int sendDataLength = 29;

        if (M_B_Cnt > 0)
        {
            sendDataLength = sendDataLength + 8;
            sendLockerText = sendLockerText + String.format("%05d", M_B_Cnt);
            if (Man_locker.equals("A"))
            {
                sendLockerText = sendLockerText + "000";
            }
            else
            {
                sendLockerText = sendLockerText + "200";
            }
        }

        if (F_B_Cnt > 0)
        {
            sendDataLength = sendDataLength + 8;
            sendLockerText = sendLockerText + String.format("%05d", F_B_Cnt);
            if (Man_locker.equals("A"))
            {
                sendLockerText = sendLockerText + "200";
            }
            else
            {
                sendLockerText = sendLockerText + "000";
            }
        }

        String sendTxt = "pA    " +  String.format("%05d", sendDataLength);
        sendTxt = sendTxt + "PS01001234              " + String.format("%05d", Total_Cnt);
        sendTxt = sendTxt + sendLockerText;

        return sendTxt;
    }
	

	

	// server to server 통신
	public static String connectToServer(String data, String reqUrl) throws Exception {
		HttpURLConnection conn = null;
		BufferedReader resultReader = null;
		PrintWriter pw = null;
		URL url = null;

		int statusCode = 0;
		StringBuffer recvBuffer = new StringBuffer();
		try {
			url = new URL(reqUrl);
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("POST");
			conn.setConnectTimeout(3000);
			conn.setReadTimeout(5000);
			conn.setDoOutput(true);

			pw = new PrintWriter(conn.getOutputStream());
			pw.write(data);
			pw.flush();

			statusCode = conn.getResponseCode();
			resultReader = new BufferedReader(new InputStreamReader(conn.getInputStream(), "utf-8"));
			for (String temp; (temp = resultReader.readLine()) != null;) {
				recvBuffer.append(temp).append("\n");
			}

			if (!(statusCode == HttpURLConnection.HTTP_OK)) {
				throw new Exception();
			}

			return recvBuffer.toString().trim();
		} catch (Exception e) {
			return "9999";
		} finally {
			recvBuffer.setLength(0);

			try {
				if (resultReader != null) {
					resultReader.close();
				}
			} catch (Exception ex) {
				resultReader = null;
			}

			try {
				if (pw != null) {
					pw.close();
				}
			} catch (Exception ex) {
				pw = null;
			}

			try {
				if (conn != null) {
					conn.disconnect();
				}
			} catch (Exception ex) {
				conn = null;
			}
		}
	}

	/*
	 * 랜덤한 문자열을 원하는 길이만큼 반환합니다.
	 *
	 * @param length 문자열 길이
	 * @return 랜덤문자열
	 */
	public static String getRandomString(int length)
	{
	  StringBuffer buffer = new StringBuffer();
	  Random random = new Random();
	  String chars[] = "a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z".split(",");
	 
	  for (int i=0 ; i<length ; i++)
	  {
	    buffer.append(chars[random.nextInt(chars.length)]);
	  }
	  return buffer.toString();
	};
			
	public final static String getyyyyMMddHHmmss() {
		SimpleDateFormat yyyyMMddHHmmss = new SimpleDateFormat("yyyyMMddHHmmss");
		return yyyyMMddHHmmss.format(new Date());
	}
	public final static String getyyyyMMdd() {
		SimpleDateFormat yyyyMMdd = new SimpleDateFormat("yyyyMMdd");
		return yyyyMMdd.format(new Date());
	}
	
	// JSON String -> HashMap 변환
	public static HashMap jsonStringToHashMap(String str) throws Exception {
		HashMap dataMap = new HashMap();
		JSONParser parser = new JSONParser();
		try {
			Object obj = parser.parse(str);
			org.json.simple.JSONObject jsonObject = (org.json.simple.JSONObject) obj;

			Iterator<String> keyStr = jsonObject.keySet().iterator();
			while (keyStr.hasNext()) {
				String key = keyStr.next();
				Object value = jsonObject.get(key);

				dataMap.put(key, value);
			}
		} catch (Exception e) {

		}
		return dataMap;
	}
	

	// SHA-256 형식으로 암호화
	public static class DataEncrypt {
		MessageDigest md;
		String strSRCData = "";
		String strENCData = "";
		String strOUTData = "";

		public DataEncrypt() {
		}

		public String encrypt(String strData) {
			String passACL = null;
			MessageDigest md = null;
			try {
				md = MessageDigest.getInstance("SHA-256");
				md.reset();
				md.update(strData.getBytes());
				byte[] raw = md.digest();
				passACL = encodeHex(raw);
			} catch (Exception e) {
				System.out.print("암호화 에러" + e.toString());
			}
			return passACL;
		}

		public String encodeHex(byte[] b) {
			char[] c = Hex.encodeHex(b);
			return new String(c);
		}
	}

	public boolean validationDate(String checkDate) {

		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
			dateFormat.setLenient(false);
			dateFormat.parse(checkDate.replaceAll("-", ""));
			return true;

		} catch (ParseException e) {
			return false;
		}
	}

	public boolean validationYYMM(String checkDate) {
		try {
			SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMM");
			dateFormat.setLenient(false);
			dateFormat.parse(checkDate.replaceAll("-", ""));
			return true;
		} catch (ParseException e) {
			return false;
		}
	}
	
	public static String socketSend(String host, int port, String sendText) {
		System.out.println("socketSend >>> host["+host+"] port["+port+ "] sendText["+sendText+"]");
		String returnMsg = "";
		try {
			Socket socket = new Socket(host, port); // 소켓 서버에 접속
			socket.setSoTimeout(10000);
			
			System.out.println("socket 서버에 접속 성공!");
			
            // OutputStream - 클라이언트에서 Server로 메세지 발송
            OutputStream out = socket.getOutputStream(); 
            // socket의 OutputStream 정보를 OutputStream out에 넣은 뒤 
            PrintWriter writer = new PrintWriter(out, true); 
            // PrintWriter에 위 OutputStream을 담아 사용

            System.out.println("sendText >> " + sendText);
            writer.println(sendText); 
            // 클라이언트에서 서버로 메세지 보내기
            
            // InputStream - Server에서 보낸 메세지 클라이언트로 가져옴
            InputStream input = socket.getInputStream();
            
            byte[] byteArr = new byte[100];
            int readByteCount = input.read(byteArr);
            returnMsg= new String(byteArr, 0, readByteCount, "UTF-8");
            System.out.println("returnMsg >> " + returnMsg);
            
            // 서버에서 온 메세지 확인
            System.out.println("CLIENT SOCKET CLOSE");
            socket.close(); // 소켓 종료

		} catch (IOException e) {
			System.out.println("e.getMessage() >> " + e.getMessage()); 
		} 	
		return returnMsg;
	    
		
	}
	
	public static String getNowDateStr() {
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		Date time = new Date();
		String today = format.format(time);
		return today;
	}
	
}