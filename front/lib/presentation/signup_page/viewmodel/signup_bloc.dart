import 'package:bloc/bloc.dart';

import '../../../domain/usecases/signup_usecase.dart';
import 'signup_event.dart';
import 'signup_state.dart';

class SignUpBloc extends Bloc<SignUpEvent, SignUpState> {
  final SignUpUseCase signUpUseCase;

  SignUpBloc(this.signUpUseCase) : super(const SignUpState.initial()) {
    on<SignUpEvent>((event, emit) async {
      await event.when(
        signUpButtonPressed: (email, password) => _onSignUpButtonPressed(email, password, emit),
      );
    });
  }

  Future<void> _onSignUpButtonPressed(String email, String password, Emitter<SignUpState> emit) async {
    emit(const SignUpState.loading());

    final result = await signUpUseCase(email, password);

    result.fold(
      (_) => emit( SignUpState.success()),
      (error) => emit(SignUpState.failure(error.toString())),
    );
  }
}
