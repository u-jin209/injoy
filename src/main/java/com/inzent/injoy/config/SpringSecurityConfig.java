package com.inzent.injoy.config;

import com.inzent.injoy.oauth.PrincipalOauth2UserService;
import jakarta.servlet.DispatcherType;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
                .authorizeHttpRequests(request -> request
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .requestMatchers("/**", "/js/**").permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(login -> login
                        .loginPage("/user/logInPage")    // [A] 커스텀 로그인 페이지 지정
                        .loginProcessingUrl("/login-process")    // [B] submit 받을 url
                        .usernameParameter("username")    // [C] submit할 아이디
                        .passwordParameter("password")    // [D] submit할 비밀번호
                        .defaultSuccessUrl("/project/myProject", true)
                        .permitAll()
                )
                .oauth2Login(login -> login
                        .loginPage("/user/logInPage") //적어줘야 소셜로그인창 띄워줌
                        .defaultSuccessUrl("/project/myProject")
                        .userInfoEndpoint()
                        .userService(principalOauth2UserService)    //로그인후 토큰+사용자 프로필정보 후처리를 위함
                )
                .logout(withDefaults()); //Post /logout을 호출시 로그인 페이지로 이동. login과 마찬가지로 custom가능


        return http.build();
    }
}
