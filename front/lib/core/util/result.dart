/*
사용 예시
void main() {
  // 성공 시 시나리오
  final result = Success<int, String>(100);

  // map을 사용하여 값 변환
  final mappedResult = result.map((value) => value * 2); // Success<int, String>(200)

  // flatMap을 사용하여 다른 Result로 변환
  final flatMappedResult = result.flatMap((value) {
    if (value > 50) {
      return Success<String, String>("Value is greater than 50");
    } else {
      return Failure<String, String>("Value is not greater than 50");
    }
  });

  // fold를 사용하여 공통 처리
  final message = result.fold(
    (value) => "Success: $value",
    (error) => "Error: $error",
  );

  print(mappedResult.success);        // 200
  print(flatMappedResult.success);    // "Value is greater than 50"
  print(message);                     // "Success: 100"
}
 */

abstract class Result<T, E> {
  // 성공 여부를 확인하는 메서드
  bool get isSuccess => this is Success<T, E>;
  bool get isFailure => this is Failure<T, E>;

  // 성공 시의 값을 가져오는 메서드
  T? get success => isSuccess ? (this as Success<T, E>).value : null;

  // 실패 시의 에러를 가져오는 메서드
  E? get error => isFailure ? (this as Failure<T, E>).error : null;

  // 성공 시 처리할 콜백
  void whenSuccess(void Function(T value) callback) {
    if (this is Success<T, E>) {
      callback((this as Success<T, E>).value);
    }
  }

  // 실패 시 처리할 콜백
  void whenFailure(void Function(E error) callback) {
    if (this is Failure<T, E>) {
      callback((this as Failure<T, E>).error);
    }
  }

  // map: 성공 시 값을 변환
  Result<U, E> map<U>(U Function(T value) transform) {
    if (this is Success<T, E>) {
      return Success<U, E>(transform((this as Success<T, E>).value));
    } else {
      return Failure<U, E>((this as Failure<T, E>).error);
    }
  }

  // flatMap: 성공 시 Result<U, E>로 변환
  Result<U, E> flatMap<U>(Result<U, E> Function(T value) transform) {
    if (this is Success<T, E>) {
      return transform((this as Success<T, E>).value);
    } else {
      return Failure<U, E>((this as Failure<T, E>).error);
    }
  }

  // fold: 성공과 실패에 대해 공통 처리를 제공
  R fold<R>(R Function(T value) onSuccess, R Function(E error) onFailure) {
    if (this is Success<T, E>) {
      return onSuccess((this as Success<T, E>).value);
    } else {
      return onFailure((this as Failure<T, E>).error);
    }
  }
}

class Success<T, E> extends Result<T, E> {
  final T value;

  Success(this.value);
}

class Failure<T, E> extends Result<T, E> {
  final E error;

  Failure(this.error);
}
