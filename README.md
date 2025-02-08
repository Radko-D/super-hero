# Humble Superhero API

A NestJS-based REST API that manages superhero data with a focus on humility ratings. This project demonstrates clean architecture principles, robust testing practices, and proper validation using TypeScript and SQLite.

## Project Overview

The Humble Superhero API provides endpoints to create and retrieve superhero records, with built-in validation for superhero attributes including a unique "humility" rating system. The project emphasizes code quality, testing, and maintainable architecture.

## Technical Stack

- NestJS framework for robust API development
- TypeScript for type safety and enhanced developer experience
- SQLite database with TypeORM for data persistence
- Jest and Supertest for comprehensive testing
- Docker support for containerized deployment
- GitHub Actions for automated testing

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the development server:

   ```bash
   npm run start:dev
   ```

3. Run tests:

   ```bash
   npm test          # Unit tests
   npm run test:e2e  # End-to-end tests
   ```

## API Endpoints

### GET /

Retrieves a paginated list of superheroes.

Query Parameters:

- skip: number (pagination offset)
- take: number (items per page)

### POST /

Creates a new superhero entry.

Request Body:

```json
{
  "name": "string",
  "power": "string",
  "humility": "number (1-10)"
}
```

## Development Practices

This project follows several key development practices:

- Comprehensive unit and E2E testing
- Clear separation of concerns (Controllers, Services, Repositories)
- Strong type safety with DTOs and validation
- Environment-specific configurations
- Automated CI/CD pipeline

## Working Together

I believe in collaborative development and would welcome teammate input in several areas:

- Code review feedback, especially around architectural decisions
- Discussion on extending the superhero attributes and validation rules
- Sharing knowledge about NestJS best practices
- Pair programming sessions for complex feature additions

## If I Had More Time

Given additional time, I would explore:

1. Enhanced Features

   - Implementing superhero teams and relationships
   - Adding more sophisticated search and filtering capabilities
   - Creating a proper logging system

2. Technical Improvements

   - Setting up API documentation with Swagger
   - Implementing request rate limiting
   - Adding performance monitoring
   - Creating a more robust error handling system
   - Implementing caching mechanisms

3. Infrastructure
   - Setting up staging environments
   - Implementing database migrations strategy
   - Adding security headers and other safety measures
