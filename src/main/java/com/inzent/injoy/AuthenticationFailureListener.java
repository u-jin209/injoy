package com.inzent.injoy;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFailureListener implements ApplicationListener<AbstractAuthenticationFailureEvent> {
    private static final Logger LOGGER = LoggerFactory.getLogger(AuthenticationFailureListener.class);
    @Override
    public void onApplicationEvent(AbstractAuthenticationFailureEvent event) {
        if (event.getException() instanceof OAuth2AuthenticationException) {
            // OAuth2 인증 예외 처리 로직
            OAuth2AuthenticationException ex = (OAuth2AuthenticationException) event.getException();
            LOGGER.error("OAuth2 authentication failure: {}", ex.getMessage());
        } else {
            // 일반적인 인증 예외 처리 로직
            LOGGER.error("Authentication failure: {}", event.getException().getMessage());
        }
    }
}