final class ApiEndpoints {
  // 기본 API URL
  static const String baseUrl = 'https://api.manofsteel.com';

  // 인증 관련 엔드포인트
  static const String register = '/auth/register';
  static const String login = '/auth/login';
  static const String refreshToken = '/auth/token/refresh';
  static const String protectedResource = '/auth/protected/logout';
}