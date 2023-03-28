package MyProject;
import java.io.IOException;
import java.util.Arrays;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
@Component
public class FirstFilter extends OncePerRequestFilter {

	@Autowired
	private Environment env;

	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest,
									HttpServletResponse httpServletResponse,
									FilterChain filterChain)
									throws ServletException, IOException {
		
		httpServletResponse.addHeader("Server", "Server");
		httpServletResponse.addHeader("pV", MyProjectApplication.getProjectVersion());
		MDC.put("Version","Version : " +MyProjectApplication.getProjectVersion());
		MDC.put("Mode","Mode : " + Arrays.stream(env.getActiveProfiles()).findFirst().orElse("").toString());
		
		filterChain.doFilter(httpServletRequest, httpServletResponse);
	}
}