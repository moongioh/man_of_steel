import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:go_router/go_router.dart';

import '../viewmodel/signin_bloc.dart';
import '../viewmodel/signin_event.dart';
import '../viewmodel/signin_state.dart';

class WebSignInView extends StatefulWidget {
  WebSignInView({Key? key}) : super(key: key);

  @override
  _WebSignInViewState createState() => _WebSignInViewState();
}

class _WebSignInViewState extends State<WebSignInView> {
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  bool isEmailValid = false;
  bool isPasswordValid = false;
  bool isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 100.0, vertical: 50.0),
          child: LayoutBuilder(
            builder: (context, constraints) {
              // 화면 너비에 따라 반응형 처리
              bool showLogo = constraints.maxWidth > 800; // 화면 너비가 800px 이상일 때 로고 표시

              return Stack(
                alignment: Alignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      // 왼쪽 로고 섹션 (화면이 넓을 때만 보임)
                      if (showLogo)
                        Expanded(
                          child: Image.asset(
                            'assets/sesac_logo.png', // 로고 이미지 경로
                            height: 300, // 이미지 크기 증가
                            fit: BoxFit.contain,
                          ),
                        ),
                      if (showLogo) const SizedBox(width: 100), // 양쪽 공간을 위한 여백

                      // 오른쪽 로그인 폼 섹션
                      Expanded(
                        child: BlocConsumer<SignInBloc, SignInState>(
                          listener: (context, state) {
                            state.when(
                              initial: () {},
                              loading: () {
                                setState(() {
                                  isLoading = true;
                                });
                              },
                              success: (user) {
                                setState(() {
                                  isLoading = false;
                                });
                                // 로그인 성공 시 처리
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('로그인 성공!')),
                                );
                              },
                              failure: (error) {
                                setState(() {
                                  isLoading = false;
                                });
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('에러: $error')),
                                );
                              },
                            );
                          },
                          builder: (context, state) {
                            // 모든 필드가 유효할 때만 버튼 활성화
                            bool isFormValid = isEmailValid && isPasswordValid;

                            return Container(
                              constraints: BoxConstraints(maxWidth: 400),
                              padding: const EdgeInsets.all(16.0),
                              child: Form(
                                child: Column(
                                  mainAxisAlignment: MainAxisAlignment.center,
                                  crossAxisAlignment: CrossAxisAlignment.start,
                                  children: [
                                    Text(
                                      'Sign in',
                                      style: TextStyle(
                                        fontSize: 32,
                                        fontWeight: FontWeight.bold,
                                      ),
                                    ),
                                    const SizedBox(height: 10),
                                    // RichText를 사용해 텍스트를 한 줄로 배치
                                    RichText(
                                      text: TextSpan(
                                        text: "If you don't have an account register",
                                        style: TextStyle(
                                          fontSize: 16,
                                          color: Colors.black,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(height: 8), // 텍스트 사이의 추가 여백
                                    RichText(
                                      text: TextSpan(
                                        text: "You can ",
                                        style: TextStyle(
                                          fontSize: 16,
                                          color: Colors.black,
                                        ),
                                        children: [
                                          TextSpan(
                                            text: 'Register here!',
                                            style: TextStyle(
                                              fontSize: 16,
                                              color: Colors.green,
                                              fontWeight: FontWeight.bold,
                                            ),
                                            recognizer: TapGestureRecognizer()
                                              ..onTap = () {
                                                context.go('/signup'); // GoRouter로 화면 전환
                                              },
                                          ),
                                        ],
                                      ),
                                    ),
                                    const SizedBox(height: 30),
                                    // 이메일 입력 필드
                                    TextField(
                                      controller: emailController,
                                      cursorColor: Colors.grey,
                                      cursorHeight: 20, // 커서 높이 설정
                                      decoration: InputDecoration(
                                        labelText: 'Email',
                                        labelStyle: TextStyle(color: Colors.grey),
                                        prefixIcon: Icon(Icons.email, color: Colors.grey),
                                        focusedBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isEmailValid ? Colors.green : Colors.grey,
                                            width: 2.0, // 밑줄 두께 설정
                                          ),
                                        ),
                                        enabledBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isEmailValid ? Colors.green : Colors.grey,
                                            width: 2.0, // 밑줄 두께 설정
                                          ),
                                        ),
                                      ),
                                      keyboardType: TextInputType.emailAddress,
                                      inputFormatters: [
                                        FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z0-9@.]')), // 영어만 허용
                                      ],
                                      style: TextStyle(color: Colors.black),
                                      onChanged: (value) {
                                        // 영어 외 문자 입력 시 안내 메시지 표시
                                        if (RegExp(r'[ㄱ-ㅎㅏ-ㅣ가-힣]').hasMatch(value)) {
                                          ScaffoldMessenger.of(context).showSnackBar(
                                            SnackBar(
                                              content: Text('영어로 입력해주세요.'),
                                              duration: Duration(seconds: 2),
                                            ),
                                          );
                                        }

                                        setState(() {
                                          // 이메일 형식 유효성 검사
                                          isEmailValid = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
                                              .hasMatch(value);
                                        });
                                      },
                                    ),
                                    const SizedBox(height: 20),
                                    // 비밀번호 입력 필드
                                    TextField(
                                      controller: passwordController,
                                      cursorColor: Colors.grey,
                                      cursorHeight: 20, // 커서 높이 설정
                                      decoration: InputDecoration(
                                        labelText: 'Password',
                                        labelStyle: TextStyle(color: Colors.grey),
                                        prefixIcon: Icon(Icons.lock, color: Colors.grey),
                                        hintText: 'Enter your Password',
                                        focusedBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isPasswordValid ? Colors.green : Colors.grey,
                                            width: 2.0, // 밑줄 두께 설정
                                          ),
                                        ),
                                        enabledBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isPasswordValid ? Colors.green : Colors.grey,
                                            width: 2.0, // 밑줄 두께 설정
                                          ),
                                        ),
                                      ),
                                      obscureText: true,
                                      style: TextStyle(color: Colors.black),
                                      onChanged: (value) {
                                        setState(() {
                                          // 6글자 이상 입력 여부 확인
                                          isPasswordValid = value.length >= 6;
                                        });
                                      },
                                    ),
                                    const SizedBox(height: 30),
                                    // 로그인 버튼 (모든 조건을 만족해야 활성화)
                                    SizedBox(
                                      width: 200, // 고정 너비 설정
                                      child: ElevatedButton(
                                        style: ElevatedButton.styleFrom(
                                          backgroundColor: isFormValid ? Colors.green : Colors.grey,
                                          shape: RoundedRectangleBorder(
                                            borderRadius: BorderRadius.circular(25),
                                          ),
                                        ),
                                        onPressed: isFormValid
                                            ? () {
                                          context.read<SignInBloc>().add(
                                            SignInEvent.signInButtonPressed(
                                              email: emailController.text,
                                              password: passwordController.text,
                                            ),
                                          );
                                        }
                                            : null, // 비활성화 상태일 때는 null로 설정
                                        child: Text(
                                          'Login',
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: Colors.white, // 버튼 텍스트 색상 설정
                                          ),
                                        ),
                                      ),
                                    ),
                                  ],
                                ),
                              ),
                            );
                          },
                        ),
                      ),
                    ],
                  ),
                  // 로딩 상태일 때 중앙에 ProgressBar 표시
                  if (isLoading)
                    Center(
                      child: CircularProgressIndicator(),
                    ),
                ],
              );
            },
          ),
        ),
      ),
    );
  }
}
