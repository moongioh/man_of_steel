import 'package:flutter_bloc/flutter_bloc.dart';
import 'home_event.dart';
import 'home_state.dart';

class HomeBloc extends Bloc<HomeEvent, HomeState> {
  HomeBloc() : super(const HomeState.initial()) {
    on<SignoutEvent>((event, emit) async {
      emit(const HomeState.loading());
      // 로그아웃 처리 로직 추가
      // 성공 시:
      emit(const HomeState.signedOut());
      // 실패 시:
      // emit(HomeState.failure('Signout failed'));
    });

    on<DeleteAccountEvent>((event, emit) async {
      emit(const HomeState.loading());
      // 계정 삭제 처리 로직 추가
      // 성공 시:
      emit(const HomeState.accountDeleted());
      // 실패 시:
      // emit(HomeState.failure('Account deletion failed'));
    });
  }
}
