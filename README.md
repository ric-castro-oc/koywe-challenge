# NestJS Prisma App

This project is a NestJS application that utilizes Prisma for database interactions. It is structured into several layers, including Business Logic Layer (BLL), Data Access Layer (DAL), Facades, Models, and Providers.

## Project Structure

```
nest-prisma-app
├── src
│   ├── main.ts                # Entry point of the application
│   ├── app.module.ts          # Main application module
│   ├── bll                     # Business Logic Layer
│   ├── dal                     # Data Access Layer
│   ├── facades                 # Facade layer
│   ├── models                  # Data models and DTOs
│   ├── providers               # Dependency injection providers
│   └── utils                   # Utility functions
├── prisma                      # Prisma schema files
├── test                        # Test files
├── .env                        # Environment variables
├── .gitignore                  # Git ignore file
├── nest-cli.json              # NestJS CLI configuration
├── package.json                # NPM dependencies and scripts
├── tsconfig.json              # TypeScript configuration
└── tsconfig.build.json        # TypeScript build configuration
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone https://github.com/ric-castro-oc/koywe-challenge
   cd koywe-challenge
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Set up the environment variables:**
   Create a `.env` file in the root directory and configure your database connection string and any other necessary environment variables. Details can be found in file .env.example  

4. **setup the db with prisma:**
   Generate the prisma library, create the database and run the seeds. Default credentials are: 
   
   u: user@example.com 
   
   p: 123456

   
   ```
   npx prisma generate
   ```
   ```
   npx prisma migrate dev --name init
   ```

4. **Run the application:**
   ```
   npm run start
   ```

5. **Run tests:**
   ```
   npm run test
   ```

## API Usage

- The application exposes various endpoints for managing quotes. Refer to the documentation in the `test/app.e2e-spec.ts` file for details on the available endpoints and their usage.

## License

This project is licensed under the MIT License.