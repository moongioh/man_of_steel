import 'package:hive/hive.dart';
import '../../../core/util/result.dart';
import 'user_dao.dart';

final class LocalDataSource {
  static const String _userBoxName = 'userBox';
  late Box<UserDAO> _userBox;

  LocalDataSource() {
    _initializeHive();
  }

  Future<void> _initializeHive() async {
    _userBox = await Hive.openBox<UserDAO>(_userBoxName);
  }

  Future<Result<UserDAO, Exception>> saveUser(UserDAO user) async {
    try {
      await _userBox.put('currentUser', user);
      return Success(user);
    } catch (e) {
      return Failure(Exception('Failed to save user'));
    }
  }

  Future<Result<UserDAO, Exception>> getUser() async {
    try {
      final user = _userBox.get('currentUser');
      if (user != null) {
        return Success(user);
      } else {
        return Failure(Exception('No user found'));
      }
    } catch (e) {
      return Failure(Exception('Failed to get user'));
    }
  }
}
