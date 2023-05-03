package com.inzent.injoy.handler;

import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Service;

import java.io.IOException;
@Service
public class UserAuthSuccessHandler implements AuthenticationSuccessHandler {


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        UserCustomDetails userDetails = (UserCustomDetails) authentication.getPrincipal();
        UserDTO userDTO = userDetails.getUserDTO();
        Boolean emailVerified = userDTO.isEmailVerified();
        if(emailVerified){
            response.sendRedirect("/project/myProject");
        }else{
            response.sendRedirect("/user/emailVerifiedPage");
        }
    }
}
