final class ApiEndpoints {
  // 기본 API URL 리스트
  static const String baseUrl = 'http://localhost:3000';

  // 인증 관련 엔드포인트
  static String register(String baseUrl) => '$baseUrl/auth/register';

  static String login(String baseUrl) => '$baseUrl/auth/login';

  static String refreshToken(String baseUrl) => '$baseUrl/auth/token/refresh';

  static String protectedResource(String baseUrl) => '$baseUrl/auth/protected/logout';
}
