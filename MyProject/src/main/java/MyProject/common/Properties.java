package MyProject.common;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class Properties {
	public static String active;

	public static String getActive() {
		return active;
	}

	@Value("${spring.profiles.active}")
	public  void setActive(String active) {
		Properties.active = active;
	}
	
//	private String type;
//	private String apprUrl;
//	private String apprTastingUrl;
//	private String sopApprUrl;
//	private String shortcutsUrl;
//	private String uploadPath;
//	private String replacePath;
//
//	public String getType() {
//		return type;
//	}
//
//	
//	public String getApprUrl() {
//		return apprUrl;
//	}
//
//	
//
//	public String getApprTastingUrl() {
//		return apprTastingUrl;
//	}
//
//	
//
//	public String getSopApprUrl() {
//		return sopApprUrl;
//	}
//
//	
//	public String getShortcutsUrl() {
//		return shortcutsUrl;
//	}
//
//	
//
//	public String getUploadPath() {
//		return uploadPath;
//	}
//
//	
//
//	public String getReplacePath() {
//		return replacePath;
//	}

	

	
	
	

}
