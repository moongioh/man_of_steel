import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';

import 'viewmodel/home_bloc.dart';
import 'viewmodel/home_event.dart';

class HomeView extends StatelessWidget {
  final String userEmail;

  const HomeView({Key? key, required this.userEmail}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              userEmail,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                context.read<HomeBloc>().add(HomeEvent.signout());
              },
              child: Text('Signout'),
            ),
            SizedBox(height: 10),
            ElevatedButton(
              onPressed: () {
                context.read<HomeBloc>().add(HomeEvent.deleteAccount());
              },
              child: Text('Delete this account'),
            ),
          ],
        ),
      ),
    );
  }
}
