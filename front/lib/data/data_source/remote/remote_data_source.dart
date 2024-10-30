import '../../../core/util/result.dart';
import 'api_endpoints.dart';
import 'dio_service.dart';
import 'user_dto.dart';

final class RemoteDataSource {
  final DioService dioService;

  RemoteDataSource(this.dioService);

  Future<Result<UserDTO, Exception>> signIn(String email, String password) async {
    final data = {'email': email, 'password': password};
    final baseUrl = ApiEndpoints.baseUrls[0];

    try {
      final result = await dioService.post<Map<String, dynamic>>(baseUrl, ApiEndpoints.login as String, data: data);

      if (result.isSuccess) {
        final responseData = result.success;
        if (responseData != null) {
          return Success(UserDTO.fromJson(responseData));
        } else {
          return Failure(Exception('응답 데이터가 null입니다.'));
        }
      } else {
        return Failure(Exception('로그인 실패: ${result.error?.message}'));
      }
    } catch (e) {
      return Failure(Exception('알 수 없는 오류 발생: $e'));
    }
  }

  Future<Result<UserDTO, Exception>> signUp(String email, String password) async {
    final data = {'email': email, 'password': password};
    final baseUrl = ApiEndpoints.baseUrls[1]; // 두 번째 baseUrl 사용 (172.16.0.102)

    try {
      final result = await dioService.post<Map<String, dynamic>>(baseUrl, ApiEndpoints.register as String, data: data);

      if (result.isSuccess) {
        final responseData = result.success;
        if (responseData != null) {
          return Success(UserDTO.fromJson(responseData));
        } else {
          return Failure(Exception('응답 데이터가 null입니다.'));
        }
      } else {
        return Failure(Exception('회원가입 실패: ${result.error?.message}'));
      }
    } catch (e) {
      return Failure(Exception('알 수 없는 오류 발생: $e'));
    }
  }
}
