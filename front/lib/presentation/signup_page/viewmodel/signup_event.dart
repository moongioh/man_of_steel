import 'package:freezed_annotation/freezed_annotation.dart';

part 'signup_event.freezed.dart';

@freezed
class SignUpEvent with _$SignUpEvent {
  const factory SignUpEvent.signUpButtonPressed({
    required String email,
    required String password,
  }) = SignUpButtonPressed;
}
