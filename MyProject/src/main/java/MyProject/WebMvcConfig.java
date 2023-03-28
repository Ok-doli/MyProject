package MyProject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebMvcConfig extends WebMvcConfigurerAdapter{
    
    /**
     *  2020.04.17 CommonInterceptor Bean 이용할 수 있도록 수정 
     **/
	
	@Bean
	public CommonInterceptor CommonInterceptor() {
	    return new CommonInterceptor();
	}
	
	@Override
    public void addInterceptors(InterceptorRegistry registry){
        registry.addInterceptor(CommonInterceptor()).addPathPatterns("/**/*.do");
    }
	
}