package MyProject;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class ConfigUtil {
	// 현재 실행 모드
    public static String activeMode;
    
	public static String getActiveMode() {
		return activeMode;
	}

    @Value("${spring.profiles.active}")
	public void setActiveMode(String activeMode) {
		ConfigUtil.activeMode = activeMode;
	}

    
}