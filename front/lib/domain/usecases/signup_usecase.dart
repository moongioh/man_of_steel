import '../../core/util/result.dart';
import '../entities/user_entity.dart';
import '../repository_interfaces/auth_repository.dart';

final class SignUpUseCase {
  final AuthRepository authRepository;

  SignUpUseCase(this.authRepository);

  Future<Result<UserEntity, Exception>> call(String email, String password) {
    return authRepository.signUp(email, password);
  }
}
