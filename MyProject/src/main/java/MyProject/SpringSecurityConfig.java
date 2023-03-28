package MyProject;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.web.firewall.DefaultHttpFirewall;
import org.springframework.security.web.firewall.HttpFirewall;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {
	
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("*").permitAll().and()
				.csrf().disable().logout();

		////////////////////////////////////////////////////////////
		http.headers().frameOptions().disable();
		// X-Frame-Options to DENY 설정 때문에 iframe을 통해 접근할 수 없는 현상 발견 임시 수정 2020.04.21
		
	}

	@Override
	public void configure(WebSecurity web) {
		web.httpFirewall(defaultHttpFirewall());
	}

	@Bean
	public HttpFirewall defaultHttpFirewall() {
		return new DefaultHttpFirewall();
	}

}