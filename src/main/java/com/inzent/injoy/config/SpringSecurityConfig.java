package com.inzent.injoy.config;


import com.inzent.injoy.handler.UserAuthFailHandler;
import com.inzent.injoy.handler.UserAuthSuccessHandler;
import com.inzent.injoy.oauth.PrincipalOauth2UserService;
import com.inzent.injoy.service.UserService;
import com.zaxxer.hikari.HikariDataSource;
import jakarta.servlet.DispatcherType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.rememberme.JdbcTokenRepositoryImpl;
import org.springframework.security.web.authentication.rememberme.PersistentTokenRepository;

import javax.sql.DataSource;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig {
    @Autowired
    HikariDataSource dataSource;
    @Autowired
    UserService userService;
    @Autowired
    private PrincipalOauth2UserService principalOauth2UserService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable().cors().disable()
                .authorizeHttpRequests(request -> request
                        .dispatcherTypeMatchers(DispatcherType.FORWARD).permitAll()
                        .requestMatchers("/**", "/js/**").permitAll()
                        .anyRequest().authenticated()
                ).rememberMe(login -> login
                        .rememberMeParameter("remember")
                        .tokenValiditySeconds(60000)
                        .alwaysRemember(false)
                        .userDetailsService(userService)
                )
                .formLogin(login -> login
                        .loginPage("/user/logInPage")    // [A] 커스텀 로그인 페이지 지정
                        .loginProcessingUrl("/login-process")    // [B] submit 받을 url
                        .usernameParameter("username")    // [C] submit할 아이디
                        .passwordParameter("password")    // [D] submit할 비밀번호
                        .defaultSuccessUrl("/project/myProject", true)
                        .successHandler(new UserAuthSuccessHandler())
                        .failureHandler(new UserAuthFailHandler())
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

