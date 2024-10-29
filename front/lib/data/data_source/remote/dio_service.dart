import 'package:dio/dio.dart';
import '../../../core/util/result.dart';
import '../local/secure_token_service.dart';

final class DioService {
  final Dio _dio = Dio();
  final SecureTokenService _secureTokenService;

  DioService(this._secureTokenService) {
    _initializeDio();
  }

  void _initializeDio() {
    _setBaseOptions();
    _setInterceptors();
  }

  // 기본 Dio 설정 (baseUrl 설정 제거)
  void _setBaseOptions() {
    _dio.options.connectTimeout = const Duration(milliseconds: 5000);
    _dio.options.receiveTimeout = const Duration(milliseconds: 3000);
  }

  // 요청 인터셉터 설정
  void _setInterceptors() {
    _dio.interceptors.add(
      InterceptorsWrapper(
        onRequest: (options, handler) async {
          await _addAuthorizationHeader(options);
          return handler.next(options);
        },
        onError: (error, handler) {
          _handleError(error);
          return handler.next(error);
        },
      ),
    );
  }

  // Authorization 헤더에 토큰 추가
  Future<void> _addAuthorizationHeader(RequestOptions options) async {
    String? accessToken = await _secureTokenService.getAccessToken();
    if (accessToken != null) {
      options.headers['Authorization'] = 'Bearer $accessToken';
    }
  }

  // API 요청 수행
  Future<Result<T, DioException>> makeRequest<T>(Future<Response<T>> Function() request) async {
    try {
      final response = await request();
      return Success(response.data!);
    } on DioException catch (e) {
      return Failure(e);
    }
  }

  // GET 요청
  Future<Result<T, DioException>> get<T>(String baseUrl, String path, {Map<String, dynamic>? queryParameters}) async {
    _dio.options.baseUrl = baseUrl; // 동적으로 baseUrl 설정
    return makeRequest(() => _dio.get<T>(path, queryParameters: queryParameters));
  }

  // POST 요청
  Future<Result<T, DioException>> post<T>(String baseUrl, String path, {dynamic data}) async {
    _dio.options.baseUrl = baseUrl; // 동적으로 baseUrl 설정
    return makeRequest(() => _dio.post<T>(path, data: data));
  }

  // PUT 요청
  Future<Result<T, DioException>> put<T>(String baseUrl, String path, {dynamic data}) async {
    _dio.options.baseUrl = baseUrl; // 동적으로 baseUrl 설정
    return makeRequest(() => _dio.put<T>(path, data: data));
  }

  // DELETE 요청
  Future<Result<T, DioException>> delete<T>(String baseUrl, String path, {dynamic data}) async {
    _dio.options.baseUrl = baseUrl; // 동적으로 baseUrl 설정
    return makeRequest(() => _dio.delete<T>(path, data: data));
  }

  // 오류 처리 로직
  void _handleError(DioException error) {
    // TODO: 토큰 만료 시 리프레시 처리
  }

  Dio get dio => _dio;
}
