import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';
import 'package:hive_flutter/adapters.dart';
import 'package:path_provider/path_provider.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';
import 'package:portfolio/presentation/signin_page/viewmodel/signin_bloc.dart';
import 'package:portfolio/presentation/signin_page/web/signin_view.dart';
import 'package:portfolio/presentation/home_page/home_view.dart';

import 'data/data_source/local/local_data_source.dart';
import 'data/data_source/local/secure_token_service.dart';
import 'data/data_source/remote/dio_service.dart';
import 'data/data_source/remote/remote_data_source.dart';
import 'data/repositories/auth_repository_impl.dart';
import 'domain/usecases/signin_usecase.dart';
import 'domain/usecases/signup_usecase.dart';
import 'presentation/signup_page/viewmodel/signup_bloc.dart';
import 'presentation/signup_page/web/signup_view.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  if (kIsWeb) {
    await Hive.initFlutter();
  } else {
    final appDocumentDir = await getApplicationDocumentsDirectory();
    Hive.init(appDocumentDir.path);
  }

  final secureTokenService = SecureTokenService();
  final dioService = DioService(secureTokenService);
  final remoteDataSource = RemoteDataSource(dioService);
  final localDataSource = LocalDataSource();
  final authRepository = AuthRepositoryImpl(
    remoteDataSource: remoteDataSource,
    localDataSource: localDataSource,
    secureTokenService: secureTokenService,
  );
  final signInUseCase = SignInUseCase(authRepository);
  final signUpUseCase = SignUpUseCase(authRepository);

  runApp(MyApp(
    signInUseCase: signInUseCase,
    signUpUseCase: signUpUseCase,
  ));
}

class MyApp extends StatelessWidget {
  final SignInUseCase signInUseCase;
  final SignUpUseCase signUpUseCase;

  const MyApp({
    Key? key,
    required this.signInUseCase,
    required this.signUpUseCase,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // GoRouter 설정
    final GoRouter _router = GoRouter(
      routes: [
        GoRoute(
          path: '/',
          builder: (context, state) {
            return MultiBlocProvider(
              providers: [
                BlocProvider(create: (_) => SignInBloc(signInUseCase)),
                BlocProvider(create: (_) => SignUpBloc(signUpUseCase)),
              ],
              child: kIsWeb ? WebSignInView() : WebSignInView(),
            );
          },
        ),
        GoRoute(
          path: '/signup',
          builder: (context, state) {
            return MultiBlocProvider(
              providers: [
                BlocProvider(create: (_) => SignInBloc(signInUseCase)),
                BlocProvider(create: (_) => SignUpBloc(signUpUseCase)),
              ],
              child: kIsWeb ? WebSignUpView() : WebSignUpView(),
            );
          },
        ),
        GoRoute(
          path: '/home',
          builder: (context, state) {
            final userEmail = state.extra as String;
            return HomeView(userEmail: userEmail);
          },
        ),
      ],
    );

    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      title: '세미세미세미세미세미 프로젝트~',
      theme: ThemeData(
        brightness: Brightness.light,
        scaffoldBackgroundColor: Colors.white,
        // 기본 배경을 흰색으로 설정
        splashFactory: NoSplash.splashFactory,
        // InkWell 효과 제거
        textButtonTheme: TextButtonThemeData(
          style: TextButton.styleFrom(
            splashFactory: NoSplash.splashFactory, // TextButton InkWell 효과 제거
          ),
        ),
        elevatedButtonTheme: ElevatedButtonThemeData(
          style: ElevatedButton.styleFrom(
            splashFactory: NoSplash.splashFactory, // ElevatedButton InkWell 효과 제거
          ),
        ),
      ),
      routerDelegate: _router.routerDelegate,
      routeInformationParser: _router.routeInformationParser,
      routeInformationProvider: _router.routeInformationProvider,
    );
  }
}
