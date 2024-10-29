import 'package:freezed_annotation/freezed_annotation.dart';

part 'home_state.freezed.dart';

@freezed
class HomeState with _$HomeState {
  const factory HomeState.initial() = Initial;
  const factory HomeState.loading() = Loading;
  const factory HomeState.signedOut() = SignedOut;
  const factory HomeState.accountDeleted() = AccountDeleted;
  const factory HomeState.failure(String error) = Failure;
}
