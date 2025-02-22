<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Real Estate API

A RESTful API built with NestJS for managing real estate properties, users, and favorites. The API includes authentication, role-based access control, and file upload capabilities.

## Features

- User authentication with JWT
- Role-based access control (Admin, Agent, Regular User)
- Property management (CRUD operations)
- Favorites system
- Image upload with S3 integration
- Rate limiting
- PostgreSQL database with TypeORM
- Redis integration
- Docker support

## Prerequisites

- Node.js (>= 14.x)
- Yarn or npm
- PostgreSQL
- Redis
- AWS S3 Account (for image upload)
- Docker (optional)

## Installation

```bash
$ yarn install
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
POSTGRES_HOST=your_postgres_host
POSTGRES_PORT=5432
POSTGRES_USER=your_postgres_user
POSTGRES_PASSWORD=your_postgres_password
POSTGRES_DB=your_database_name

AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_BUCKET_NAME=your_s3_bucket_name
```

## Running the App

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Docker Setup

```bash
# Start all services
$ docker-compose up -d
```

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (requires authentication)

### Properties

- `POST /properties/create` - Create a new property (Agent role required)
- `GET /properties/all` - Get all properties (requires authentication)
- `GET /properties/:id` - Get property by ID (requires authentication)
- `GET /properties/search` - Search properties
- `GET /properties/filter` - Filter properties
- `GET /properties/user/properties` - Get user's properties (Agent role required)
- `PATCH /properties/:id` - Update property (Agent role required)
- `DELETE /properties/:id` - Delete property (Agent role required)

### Favorites

- `POST /favorites/create/:propertyId` - Add property to favorites (requires authentication)
- `GET /favorites/all` - Get all favorites (requires authentication)
- `GET /favorites/:id` - Get favorite by ID (requires authentication)
- `DELETE /favorites/delete/:id` - Remove property from favorites (requires authentication)

### Admin

- `GET /admin/users` - Get all users (Admin role required)

## Running Tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Security Features

- JWT Authentication
- Role-based access control
- Rate limiting
- File validation for uploads
- Request validation using DTOs
- Secure password handling

## Technology Stack

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- Redis
- AWS S3
- Passport.js
- JWT
- Docker
- Jest

## Project Structure

```
src/
├── admin/         # Admin module for management operations
├── auth/          # Authentication and authorization
├── common/        # Shared decorators, enums, and utilities
├── config/        # Configuration files
├── favorites/     # Favorites management
├── properties/    # Property management
├── redis/         # Redis integration
├── s3/           # AWS S3 integration
├── users/         # User management
└── utils/         # Utility functions and guards
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License.
