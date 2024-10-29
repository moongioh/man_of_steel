import 'package:freezed_annotation/freezed_annotation.dart';

part 'signup_state.freezed.dart';

@freezed
class SignUpState with _$SignUpState {
  const factory SignUpState.initial() = SignUpInitial;
  const factory SignUpState.loading() = SignUpLoading;
  const factory SignUpState.success() = SignUpSuccess;
  const factory SignUpState.failure(String error) = SignUpFailure;
}
