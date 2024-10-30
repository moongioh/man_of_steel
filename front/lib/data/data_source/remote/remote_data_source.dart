import '../../../core/util/result.dart';
import 'api_endpoints.dart';
import 'dio_service.dart';
import 'user_dto.dart';

final class RemoteDataSource {
  final DioService dioService;

  RemoteDataSource(this.dioService);

  Future<Result<UserDTO, Exception>> signIn(String email, String password) async {
    final data = {'email': email, 'password': password};

    try {
      final result = await dioService.post<Map<String, dynamic>>(ApiEndpoints.login, data: data);

      // 응답 데이터가 올바른지 확인
      if (result.isSuccess) {
        final responseData = result.success;
        if (responseData != null) {
          return Success(UserDTO.fromJson(responseData));
        } else {
          // 응답 데이터가 null인 경우 에러 처리
          return Failure(Exception('응답 데이터가 null입니다.'));
        }
      } else {
        // 오류 발생 시 상세 정보 로그
        return Failure(Exception('로그인 실패: ${result.error?.message}'));
      }
    } catch (e) {
      // 예외 발생 시 예외 처리
      return Failure(Exception('알 수 없는 오류 발생: $e'));
    }
  }

  Future<Result<UserDTO, Exception>> signUp(String email, String password) async {
    final data = {'email': email, 'password': password};

    try {
      final result = await dioService.post<Map<String, dynamic>>(ApiEndpoints.register, data: data);

      // 응답 데이터가 올바른지 확인
      if (result.isSuccess) {
        final responseData = result.success;
        if (responseData != null) {
          return Success(UserDTO.fromJson(responseData));
        } else {
          // 응답 데이터가 null인 경우 에러 처리
          return Failure(Exception('응답 데이터가 null입니다.'));
        }
      } else {
        // 오류 발생 시 상세 정보 로그
        return Failure(Exception('회원가입 실패: ${result.error?.message}'));
      }
    } catch (e) {
      // 예외 발생 시 예외 처리
      return Failure(Exception('알 수 없는 오류 발생: $e'));
    }
  }
}