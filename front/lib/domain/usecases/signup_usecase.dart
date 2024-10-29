import '../../core/util/result.dart';
import '../repository_interfaces/auth_repository.dart';

final class SignUpUseCase {
  final AuthRepository authRepository;

  SignUpUseCase(this.authRepository);

  Future<Result<void, Exception>> call(String email, String password) {
    return authRepository.signUp(email, password);
  }
}
