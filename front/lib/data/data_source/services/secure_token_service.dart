import 'package:flutter_secure_storage/flutter_secure_storage.dart';

import '../../../core/util/app_strings.dart';

final class SecureTokenService {
  final FlutterSecureStorage _secureStorage = const FlutterSecureStorage();

  // Access Token 저장
  Future<void> saveAccessToken(String token) async {
    await _secureStorage.write(key: AppStrings.accessTokenKey, value: token);
  }

  // Refresh Token 저장
  Future<void> saveRefreshToken(String token) async {
    await _secureStorage.write(key: AppStrings.refreshToeknKey, value: token);
  }

  // Access Token 불러오기
  Future<String?> getAccessToken() async {
    return await _secureStorage.read(key: AppStrings.accessTokenKey);
  }

  // Rrefresh Token 불러오기
  Future<String?> getResfreshToken() async {
    return await _secureStorage.read(key: AppStrings.refreshToeknKey);
  }

  // 모든 토큰 삭제
  Future<void> deleteAllToken() async {
    await _secureStorage.delete(key: AppStrings.accessTokenKey);
    await _secureStorage.delete(key: AppStrings.refreshToeknKey);
  }
}
