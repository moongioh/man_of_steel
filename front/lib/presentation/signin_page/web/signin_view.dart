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
              bool showLogo = constraints.maxWidth > 800;

              return Stack(
                alignment: Alignment.center,
                children: [
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      if (showLogo)
                        Expanded(
                          child: Image.asset(
                            'assets/sesac_logo.png',
                            height: 300,
                            fit: BoxFit.contain,
                          ),
                        ),
                      if (showLogo) const SizedBox(width: 100),
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
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('로그인 성공!')),
                                );
                                context.go('/home', extra: user.email);
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
                                    RichText(
                                      text: TextSpan(
                                        text: "If you don't have an account register",
                                        style: TextStyle(
                                          fontSize: 16,
                                          color: Colors.black,
                                        ),
                                      ),
                                    ),
                                    const SizedBox(height: 8),
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
                                                context.go('/signup');
                                              },
                                          ),
                                        ],
                                      ),
                                    ),
                                    const SizedBox(height: 30),
                                    TextField(
                                      controller: emailController,
                                      cursorColor: Colors.grey,
                                      cursorHeight: 20,
                                      decoration: InputDecoration(
                                        labelText: 'Email',
                                        labelStyle: TextStyle(color: Colors.grey),
                                        prefixIcon: Icon(Icons.email, color: Colors.grey),
                                        focusedBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isEmailValid ? Colors.green : Colors.grey,
                                            width: 2.0,
                                          ),
                                        ),
                                        enabledBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isEmailValid ? Colors.green : Colors.grey,
                                            width: 2.0,
                                          ),
                                        ),
                                      ),
                                      keyboardType: TextInputType.emailAddress,
                                      inputFormatters: [
                                        FilteringTextInputFormatter.allow(RegExp(r'[a-zA-Z0-9@.]')),
                                      ],
                                      style: TextStyle(color: Colors.black),
                                      onChanged: (value) {
                                        if (RegExp(r'[ㄱ-ㅎㅏ-ㅣ가-힣]').hasMatch(value)) {
                                          ScaffoldMessenger.of(context).showSnackBar(
                                            SnackBar(
                                              content: Text('영어로 입력해주세요.'),
                                              duration: Duration(seconds: 2),
                                            ),
                                          );
                                        }

                                        setState(() {
                                          isEmailValid = RegExp(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
                                              .hasMatch(value);
                                        });
                                      },
                                    ),
                                    const SizedBox(height: 20),
                                    TextField(
                                      controller: passwordController,
                                      cursorColor: Colors.grey,
                                      cursorHeight: 20,
                                      decoration: InputDecoration(
                                        labelText: 'Password',
                                        labelStyle: TextStyle(color: Colors.grey),
                                        prefixIcon: Icon(Icons.lock, color: Colors.grey),
                                        hintText: 'Enter your Password',
                                        focusedBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isPasswordValid ? Colors.green : Colors.grey,
                                            width: 2.0,
                                          ),
                                        ),
                                        enabledBorder: UnderlineInputBorder(
                                          borderSide: BorderSide(
                                            color: isPasswordValid ? Colors.green : Colors.grey,
                                            width: 2.0,
                                          ),
                                        ),
                                      ),
                                      obscureText: true,
                                      style: TextStyle(color: Colors.black),
                                      onChanged: (value) {
                                        setState(() {
                                          isPasswordValid = value.length >= 6;
                                        });
                                      },
                                    ),
                                    const SizedBox(height: 30),
                                    SizedBox(
                                      width: 200,
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
                                            : null,
                                        child: Text(
                                          'Login',
                                          style: TextStyle(
                                            fontSize: 18,
                                            color: Colors.white,
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
