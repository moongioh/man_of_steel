import 'package:hive/hive.dart';

import '../../../core/util/app_strings.dart';

final class SecureTokenService {
  static const String _boxName = 'tokenBox';
  late Box _tokenBox;

  SecureTokenService() {
    _initializeHive();
  }

  Future<void> _initializeHive() async {
    _tokenBox = await Hive.openBox(_boxName);
  }

  // Access Token 저장
  Future<void> saveAccessToken(String token) async {
    await _tokenBox.put(AppStrings.accessTokenKey, token);
  }

  // Refresh Token 저장
  Future<void> saveRefreshToken(String token) async {
    await _tokenBox.put(AppStrings.refreshTokenKey, token);
  }

  // Access Token 불러오기
  Future<String?> getAccessToken() async {
    return _tokenBox.get(AppStrings.accessTokenKey);
  }

  // Refresh Token 불러오기
  Future<String?> getRefreshToken() async {
    return _tokenBox.get(AppStrings.refreshTokenKey);
  }

  // 모든 토큰 삭제
  Future<void> deleteAllToken() async {
    await _tokenBox.delete(AppStrings.accessTokenKey);
    await _tokenBox.delete(AppStrings.refreshTokenKey);
  }
}
