import '../../core/util/result.dart';
import '../../domain/entities/user_entity.dart';
import '../../domain/repository_interfaces/auth_repository.dart';
import '../data_source/local/local_data_source.dart';
import '../data_source/local/secure_token_service.dart';
import '../data_source/local/user_dao.dart';
import '../data_source/remote/remote_data_source.dart';

final class AuthRepositoryImpl implements AuthRepository {
  final RemoteDataSource remoteDataSource;
  final LocalDataSource localDataSource;
  final SecureTokenService secureTokenService;

  AuthRepositoryImpl({
    required this.remoteDataSource,
    required this.localDataSource,
    required this.secureTokenService,
  });

  @override
  Future<Result<UserEntity, Exception>> signIn(String email, String password) async {
    final result = await remoteDataSource.signIn(email, password);

    if (result.isSuccess) {
      final userDTO = result.success!;
      // 로컬에 사용자 정보 저장
      await localDataSource.saveUser(UserDAO(
        uuid: userDTO.uuid,
        email: userDTO.email,
        password: userDTO.password,
      ));
      // UserDTO에서 UserEntity로 수동 변환
      final userEntity = UserEntity(
        uuid: userDTO.uuid,
        email: userDTO.email,
      );
      return Success(userEntity);
    } else {
      return Failure(result.error!);
    }
  }

  @override
  Future<Result<UserEntity, Exception>> signUp(String email, String password) async {
    final result = await remoteDataSource.signUp(email, password);

    if (result.isSuccess) {
      final userDTO = result.success!;
      // 로컬에 사용자 정보 저장
      await localDataSource.saveUser(UserDAO(
        uuid: userDTO.uuid,
        email: userDTO.email,
        password: userDTO.password,
      ));
      // UserDTO에서 UserEntity로 수동 변환
      final userEntity = UserEntity(
        uuid: userDTO.uuid,
        email: userDTO.email,
      );
      return Success(userEntity);
    } else {
      return Failure(result.error!);
    }
  }
}
