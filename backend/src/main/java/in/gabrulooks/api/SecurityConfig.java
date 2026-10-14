package in.gabrulooks.api;

import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
  @Bean
  SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http
        .cors(Customizer.withDefaults())
        .csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(authorize -> authorize
            .requestMatchers("/api/health").permitAll()
            .requestMatchers(HttpMethod.GET, "/api/products", "/api/products/**").permitAll()
            .requestMatchers(HttpMethod.POST, "/api/seller/listings").permitAll()
            .requestMatchers("/api/admin/**").hasRole("ADMIN")
            .anyRequest().denyAll())
        .httpBasic(Customizer.withDefaults())
        .build();
  }

  @Bean
  UserDetailsService adminUserDetailsService(
      @Value("${app.admin.username:}") String username,
      @Value("${app.admin.password-hash:}") String passwordHash) {
    return requestedUsername -> {
      if (username.isBlank() || passwordHash.isBlank() || !username.equals(requestedUsername)) {
        throw new UsernameNotFoundException("Admin credentials are not configured.");
      }
      return User.withUsername(username).password(passwordHash).roles("ADMIN").build();
    };
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource(
      @Value("${app.allowed-origins}") String allowedOrigins) {
    CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(Arrays.stream(allowedOrigins.split(","))
        .map(String::trim).filter(origin -> !origin.isEmpty()).toList());
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
    configuration.setAllowedHeaders(List.of("Authorization", "Content-Type"));
    configuration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/api/**", configuration);
    return source;
  }
}