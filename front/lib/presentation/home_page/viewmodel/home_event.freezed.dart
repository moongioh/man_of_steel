// coverage:ignore-file
// GENERATED CODE - DO NOT MODIFY BY HAND
// ignore_for_file: type=lint
// ignore_for_file: unused_element, deprecated_member_use, deprecated_member_use_from_same_package, use_function_type_syntax_for_parameters, unnecessary_const, avoid_init_to_null, invalid_override_different_default_values_named, prefer_expression_function_bodies, annotate_overrides, invalid_annotation_target, unnecessary_question_mark

part of 'home_event.dart';

// **************************************************************************
// FreezedGenerator
// **************************************************************************

T _$identity<T>(T value) => value;

final _privateConstructorUsedError = UnsupportedError(
    'It seems like you constructed your class using `MyClass._()`. This constructor is only meant to be used by freezed and you are not supposed to need it nor use it.\nPlease check the documentation here for more information: https://github.com/rrousselGit/freezed#adding-getters-and-methods-to-our-models');

/// @nodoc
mixin _$HomeEvent {
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() signout,
    required TResult Function() deleteAccount,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? signout,
    TResult? Function()? deleteAccount,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? signout,
    TResult Function()? deleteAccount,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SignoutEvent value) signout,
    required TResult Function(DeleteAccountEvent value) deleteAccount,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(SignoutEvent value)? signout,
    TResult? Function(DeleteAccountEvent value)? deleteAccount,
  }) =>
      throw _privateConstructorUsedError;
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SignoutEvent value)? signout,
    TResult Function(DeleteAccountEvent value)? deleteAccount,
    required TResult orElse(),
  }) =>
      throw _privateConstructorUsedError;
}

/// @nodoc
abstract class $HomeEventCopyWith<$Res> {
  factory $HomeEventCopyWith(HomeEvent value, $Res Function(HomeEvent) then) =
      _$HomeEventCopyWithImpl<$Res, HomeEvent>;
}

/// @nodoc
class _$HomeEventCopyWithImpl<$Res, $Val extends HomeEvent>
    implements $HomeEventCopyWith<$Res> {
  _$HomeEventCopyWithImpl(this._value, this._then);

  // ignore: unused_field
  final $Val _value;
  // ignore: unused_field
  final $Res Function($Val) _then;

  /// Create a copy of HomeEvent
  /// with the given fields replaced by the non-null parameter values.
}

/// @nodoc
abstract class _$$SignoutEventImplCopyWith<$Res> {
  factory _$$SignoutEventImplCopyWith(
          _$SignoutEventImpl value, $Res Function(_$SignoutEventImpl) then) =
      __$$SignoutEventImplCopyWithImpl<$Res>;
}

/// @nodoc
class __$$SignoutEventImplCopyWithImpl<$Res>
    extends _$HomeEventCopyWithImpl<$Res, _$SignoutEventImpl>
    implements _$$SignoutEventImplCopyWith<$Res> {
  __$$SignoutEventImplCopyWithImpl(
      _$SignoutEventImpl _value, $Res Function(_$SignoutEventImpl) _then)
      : super(_value, _then);

  /// Create a copy of HomeEvent
  /// with the given fields replaced by the non-null parameter values.
}

/// @nodoc

class _$SignoutEventImpl implements SignoutEvent {
  const _$SignoutEventImpl();

  @override
  String toString() {
    return 'HomeEvent.signout()';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$SignoutEventImpl);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() signout,
    required TResult Function() deleteAccount,
  }) {
    return signout();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? signout,
    TResult? Function()? deleteAccount,
  }) {
    return signout?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? signout,
    TResult Function()? deleteAccount,
    required TResult orElse(),
  }) {
    if (signout != null) {
      return signout();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SignoutEvent value) signout,
    required TResult Function(DeleteAccountEvent value) deleteAccount,
  }) {
    return signout(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(SignoutEvent value)? signout,
    TResult? Function(DeleteAccountEvent value)? deleteAccount,
  }) {
    return signout?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SignoutEvent value)? signout,
    TResult Function(DeleteAccountEvent value)? deleteAccount,
    required TResult orElse(),
  }) {
    if (signout != null) {
      return signout(this);
    }
    return orElse();
  }
}

abstract class SignoutEvent implements HomeEvent {
  const factory SignoutEvent() = _$SignoutEventImpl;
}

/// @nodoc
abstract class _$$DeleteAccountEventImplCopyWith<$Res> {
  factory _$$DeleteAccountEventImplCopyWith(_$DeleteAccountEventImpl value,
          $Res Function(_$DeleteAccountEventImpl) then) =
      __$$DeleteAccountEventImplCopyWithImpl<$Res>;
}

/// @nodoc
class __$$DeleteAccountEventImplCopyWithImpl<$Res>
    extends _$HomeEventCopyWithImpl<$Res, _$DeleteAccountEventImpl>
    implements _$$DeleteAccountEventImplCopyWith<$Res> {
  __$$DeleteAccountEventImplCopyWithImpl(_$DeleteAccountEventImpl _value,
      $Res Function(_$DeleteAccountEventImpl) _then)
      : super(_value, _then);

  /// Create a copy of HomeEvent
  /// with the given fields replaced by the non-null parameter values.
}

/// @nodoc

class _$DeleteAccountEventImpl implements DeleteAccountEvent {
  const _$DeleteAccountEventImpl();

  @override
  String toString() {
    return 'HomeEvent.deleteAccount()';
  }

  @override
  bool operator ==(Object other) {
    return identical(this, other) ||
        (other.runtimeType == runtimeType && other is _$DeleteAccountEventImpl);
  }

  @override
  int get hashCode => runtimeType.hashCode;

  @override
  @optionalTypeArgs
  TResult when<TResult extends Object?>({
    required TResult Function() signout,
    required TResult Function() deleteAccount,
  }) {
    return deleteAccount();
  }

  @override
  @optionalTypeArgs
  TResult? whenOrNull<TResult extends Object?>({
    TResult? Function()? signout,
    TResult? Function()? deleteAccount,
  }) {
    return deleteAccount?.call();
  }

  @override
  @optionalTypeArgs
  TResult maybeWhen<TResult extends Object?>({
    TResult Function()? signout,
    TResult Function()? deleteAccount,
    required TResult orElse(),
  }) {
    if (deleteAccount != null) {
      return deleteAccount();
    }
    return orElse();
  }

  @override
  @optionalTypeArgs
  TResult map<TResult extends Object?>({
    required TResult Function(SignoutEvent value) signout,
    required TResult Function(DeleteAccountEvent value) deleteAccount,
  }) {
    return deleteAccount(this);
  }

  @override
  @optionalTypeArgs
  TResult? mapOrNull<TResult extends Object?>({
    TResult? Function(SignoutEvent value)? signout,
    TResult? Function(DeleteAccountEvent value)? deleteAccount,
  }) {
    return deleteAccount?.call(this);
  }

  @override
  @optionalTypeArgs
  TResult maybeMap<TResult extends Object?>({
    TResult Function(SignoutEvent value)? signout,
    TResult Function(DeleteAccountEvent value)? deleteAccount,
    required TResult orElse(),
  }) {
    if (deleteAccount != null) {
      return deleteAccount(this);
    }
    return orElse();
  }
}

abstract class DeleteAccountEvent implements HomeEvent {
  const factory DeleteAccountEvent() = _$DeleteAccountEventImpl;
}
