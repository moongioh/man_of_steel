import '../../../core/util/result.dart';
import 'api_endpoints.dart';
import 'dio_service.dart';
import 'user_dto.dart';

final class RemoteDataSource {
  final DioService dioService;

  RemoteDataSource(this.dioService);

  Future<Result<UserDTO, Exception>> signIn(String email, String password) async {
    final data = {'email': email, 'password': password};
    final result = await dioService.post<Map<String, dynamic>>(ApiEndpoints.login, data: data);

    return result.map((responseData) {
      return UserDTO.fromJson(responseData);
    }).mapError((error) => Exception(error.message));
  }

  Future<Result<UserDTO, Exception>> signUp(String email, String password) async {
    final data = {'email': email, 'password': password};
    final result = await dioService.post<Map<String, dynamic>>(ApiEndpoints.register, data: data);

    return result.map((responseData) {
      return UserDTO.fromJson(responseData);
    }).mapError((error) => Exception(error.message));
  }
}
