final class AppStrings {
  // Secure Storage Keys
  static const String accessTokenKey = 'accessToken';
  static const String refreshToeknKey = 'refreshToken';
  static const String emailKey = 'email';
  static const String passwordKey = 'password';

  // Status Message
  static const String loginSuccess = '로그인 성공';
  static const String loginFailed = '로그인 실패';
  static const String tokenExpired = '토큰 만료됨';
  static const String tokenSaved = '토큰 저장됨';

  // Error Messages
  static const String invalidEmail = '유효하지 않은 이메일입니다';
  static const String passwordTooShort = '비밀번호는 최소 6자 이상이여야 합니다';

  // Button Labels
  static const String loginButton = '로그인';
  static const String logoutButton = '로그아웃';
}