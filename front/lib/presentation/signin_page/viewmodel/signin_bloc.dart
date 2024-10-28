import 'package:bloc/bloc.dart';
import '../../../domain/usecases/signin_usecase.dart';
import 'signin_event.dart';
import 'signin_state.dart';

class SignInBloc extends Bloc<SignInEvent, SignInState> {
  final SignInUseCase signInUseCase;

  SignInBloc(this.signInUseCase) : super(const SignInState.initial()) {
    on<SignInEvent>((event, emit) async {
      await event.when(
        signInButtonPressed: (email, password) => _onSignInButtonPressed(email, password, emit),
      );
    });
  }

  Future<void> _onSignInButtonPressed(String email, String password, Emitter<SignInState> emit) async {
    emit(const SignInState.loading());

    final result = await signInUseCase(email, password);

    result.fold (
      (user) => emit(SignInState.success(user)),
      (error) => emit(SignInState.failure(error.toString())),
    );
  }
}
