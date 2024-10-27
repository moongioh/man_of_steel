export const ENV = {
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10) || 10,

  // MySQL configuration
  MYSQL_HOST: process.env.MYSQL_HOST || 'localhost',
  MYSQL_PORT: parseInt(process.env.MYSQL_PORT, 10) || 3306,
  MYSQL_USER: process.env.MYSQL_USER || 'suojae', // Docker 설정에 맞는 사용자 이름 사용
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || 'qwer1234', // Docker에서 설정한 비밀번호
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || 'semi_project', // MySQL 데이터베이스 이름

  // Redis configuration
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PORT: parseInt(process.env.REDIS_PORT, 10) || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'qwer1234',

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET || 'qwer1234',
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || '1h', // e.g., 1h, 7d
};
