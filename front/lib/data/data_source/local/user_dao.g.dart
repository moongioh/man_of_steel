// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user_dao.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

UserDAO _$UserDAOFromJson(Map<String, dynamic> json) => UserDAO(
      uuid: json['uuid'] as String,
      email: json['email'] as String,
      password: json['password'] as String,
    );

Map<String, dynamic> _$UserDAOToJson(UserDAO instance) => <String, dynamic>{
      'uuid': instance.uuid,
      'email': instance.email,
      'password': instance.password,
    };
