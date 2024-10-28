import '../../core/util/result.dart';
import '../entities/user_entity.dart';

abstract interface class AuthRepository {
  Future<Result<UserEntity, Exception>> signIn(String email, String password);
  Future<Result<UserEntity, Exception>> signUp(String email, String password);
}
