import 'package:json_annotation/json_annotation.dart';

part 'user_dao.g.dart';

@JsonSerializable()
class UserDAO {
  String uuid;
  String email;
  String password;

  UserDAO({
    required this.uuid,
    required this.email,
    required this.password,
  });

  // fromJson 메서드 (역직렬화)
  factory UserDAO.fromJson(Map<String, dynamic> json) => _$UserDAOFromJson(json);

  // toJson 메서드 (직렬화)
  Map<String, dynamic> toJson() => _$UserDAOToJson(this);
}
