import '../../core/util/result.dart';
import '../entities/user_entity.dart';
import '../repository_interfaces/auth_repository.dart';

final class SignInUseCase {
  final AuthRepository authRepository;

  SignInUseCase(this.authRepository);

  Future<Result<UserEntity, Exception>> call(String email, String password) {
    return authRepository.signIn(email, password);
  }
}
