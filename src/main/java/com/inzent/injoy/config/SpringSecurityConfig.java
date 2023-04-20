package com.inzent.injoy.config;

import jakarta.servlet.DispatcherType;
import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;


//import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
                .authorizeHttpRequests(request -> request
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .requestMatchers("/**","/js/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginPage("/user/logInPage")	// [A] 커스텀 로그인 페이지 지정
                        .loginProcessingUrl("/login-process")	// [B] submit 받을 url
                        .usernameParameter("username")	// [C] submit할 아이디
                        .passwordParameter("password")	// [D] submit할 비밀번호
                        .defaultSuccessUrl("/", true)
                        .permitAll()
                )
                .logout(withDefaults()); //Post /logout을 호출시 로그인 페이지로 이동. login과 마찬가지로 custom가능

        return http.build();
    }
}
