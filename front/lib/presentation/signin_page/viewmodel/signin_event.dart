import 'package:freezed_annotation/freezed_annotation.dart';

part 'signin_event.freezed.dart';

@freezed
class SignInEvent with _$SignInEvent {
  const factory SignInEvent.signInButtonPressed({
    required String email,
    required String password,
  }) = SignInButtonPressed;
}
