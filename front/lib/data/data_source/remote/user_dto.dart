import 'package:freezed_annotation/freezed_annotation.dart';

part 'user_dto.freezed.dart';
part 'user_dto.g.dart';

@freezed
class UserDTO with _$UserDTO {
  const factory UserDTO({
    required String uuid,
    required String email,
    required String password,
  }) = _UserDTO;

  // JSON 역직렬화 (fromJson) -> 직렬화도 자동 생성된다고 함
  factory UserDTO.fromJson(Map<String, dynamic> json) => _$UserDTOFromJson(json);
}
