package com.inzent.injoy.oauth;


import com.inzent.injoy.model.UserCustomDetails;
import com.inzent.injoy.model.UserDTO;
import com.inzent.injoy.oauth.provider.GoogleUserInfo;
import com.inzent.injoy.oauth.provider.NaverUserInfo;
import com.inzent.injoy.oauth.provider.OAuth2UserInfo;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PrincipalOauth2UserService extends DefaultOAuth2UserService {

	private final String NAMESPACE = "mapper.UserMapper";
	@Autowired
	private SqlSession session;
	private BCryptPasswordEncoder passwordEncoder;
	// userRequest 는 code를 받아서 accessToken을 응답 받은 객체

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest); // google의 회원 프로필 조회

		// code를 통해 구성한 정보
		System.out.println("userRequest clientRegistration : " + userRequest.getClientRegistration());
		// token을 통해 응답받은 회원정보
		System.out.println("oAuth2User : " + oAuth2User);
	
		return processOAuth2User(userRequest, oAuth2User);
	}
	public Optional<UserDTO> findByProviderAndProviderId(String provider, String providerId){
		Map<String, String> params = new HashMap<>();
		params.put("provider", provider);
		params.put("providerId", providerId);
		UserDTO userDTO = session.selectOne(NAMESPACE+".findOauthUser",params);
		Optional<UserDTO> user = Optional.ofNullable(userDTO);
		return user;
	}

	public boolean validate(String username){
		return session.selectOne(NAMESPACE+".validate",username) ==null;
	}
	public boolean register(UserDTO attempt){
		if (validate(attempt.getUsername())) {
			session.insert(NAMESPACE + ".register", attempt);
			return true;
		}else {
			return false;
		}
	}
	private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {

		// Attribute를 파싱해서 공통 객체로 묶는다. 관리가 편함.
		LocalDateTime now = LocalDateTime.now();
		OAuth2UserInfo oAuth2UserInfo = null;
		System.out.println(userRequest);
		System.out.println(userRequest.getClientRegistration().getRegistrationId());
		if (userRequest.getClientRegistration().getRegistrationId().equals("google")) {
			System.out.println("구글 로그인 요청");
			oAuth2UserInfo = new GoogleUserInfo(oAuth2User.getAttributes());
		}
//		else if (userRequest.getClientRegistration().getRegistrationId().equals("kakao")){
//			System.out.println("카카오 로그인 요청");
//			System.out.println(oAuth2User.getAttributes());
//		}
		else if (userRequest.getClientRegistration().getRegistrationId().equals("naver")){
			System.out.println("네이버 로그인 요청");
			System.out.println(oAuth2User.getAttributes());
			oAuth2UserInfo = new NaverUserInfo((Map)oAuth2User.getAttributes().get("response"));
		} else {
			System.out.println("구글과 네이버만 지원");
		}

		Optional<UserDTO> userOptional = findByProviderAndProviderId(oAuth2UserInfo.getProvider(), oAuth2UserInfo.getProviderId());
		UserDTO userDTO;
		if (userOptional.isPresent()) {
			userDTO = userOptional.get();
		} else {
			// user의 패스워드가 null이기 때문에 OAuth 유저는 일반적인 로그인을 할 수 없음.
			userDTO = UserDTO.builder()
					.username(oAuth2UserInfo.getProvider() + "_" + oAuth2UserInfo.getProviderId())
					.email(oAuth2UserInfo.getEmail())
					.name(oAuth2UserInfo.getName())
					.role("ROLE_USER")
					.emailVerified(true)
					.profilePhoto("/img/moru.jpg")
					.crtnDate(Timestamp.valueOf(now))
					.provider(oAuth2UserInfo.getProvider())
					.providerId(oAuth2UserInfo.getProviderId())
					.conversation("available")
					.build();
			register(userDTO);
		}

		return new UserCustomDetails(userDTO, oAuth2User.getAttributes());
	}
}
