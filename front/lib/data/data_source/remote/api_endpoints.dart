final class ApiEndpoints {
  // 기본 API URL 리스트
  static const List<String> baseUrls = ['http://172.16.0.11:3000']; //haproxy url

  // 인증 관련 엔드포인트
  static String register(String baseUrl) => '$baseUrl/auth/register';

  static String login(String baseUrl) => '$baseUrl/auth/login';

  static String refreshToken(String baseUrl) => '$baseUrl/auth/token/refresh';

  static String protectedResource(String baseUrl) => '$baseUrl/auth/protected/logout';
}
