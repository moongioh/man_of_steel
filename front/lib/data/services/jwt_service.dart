import 'package:jwt_decoder/jwt_decoder.dart';

final class JwtService {
  // JWT 토큰 유효성 검증
  bool isTokenExpired(String token) {
    return JwtDecoder.isExpired(token);
  }

  // JWT 토큰의 만료시간 추출
  DateTime getTokenExpirationDate(String token) {
    return JwtDecoder.getExpirationDate(token);
  }

  // JWT 토큰에서 유저정보 파싱
  Map<String, dynamic> getUserInfoFromToken(String token) {
    return JwtDecoder.decode(token);
  }

  // Refresh Token 등을 이용하여 토큰 재발급 처리 (토큰 재발급은 서버에서 처리)
  // 클라이언트에서는 Refresh Token을 백엔드로 보내고 새로운 Access Token을 받을 수 있다.
  Future<String> refreshAccessToken(String refreshToken) async {
    return 'NewAccesstoken'; // 임시값 처리
  }
}