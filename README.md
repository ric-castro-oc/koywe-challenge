# Koywe Challenge

## Project Structure

```
koywe-challenge/
├── src/
│   ├── bll/
│   ├── controllers/
│   ├── dal/
│   ├── facades/
│   ├── models/
│   ├── modules/
│   ├── providers/
│   ├── utils/
├── test/
├── config/
├── db/
├── public/
├── README.md
└── package.json
```

## Technologies

- Node.js
- Nest.js
- MongoDB (or other database)
- Jest (for testing)

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/koywe-challenge.git
   ```
2. Navigate to the project directory:
   ```bash
   cd koywe-challenge
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up the environment variables:

Create a `.env` file in the root directory and configure your database connection string and any other necessary environment variables. Details can be found in file .env.example

5. setup the db with prisma:

Generate the prisma library, create the database and run the seeds. Default credentials are:

u: user@example.com

p: 123456

```
npx prisma generate
```

```
npx prisma migrate dev --name init
```

## Seed Execution

To populate the database with initial data, run:

```bash
npm run seed
```

## Endpoint Descriptions

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| GET    | `/api/quote/:id`     | Fetch a quote by id |
| POST   | `/api/quote`         | Create a quote      |
| POST   | `/api/auth/register` | Create a user       |
| POST   | `/api/auth/login`    | Access the app      |

## Test Execution

Run the test suite with:

```bash
npm test
```

For test coverage:

```bash
npm run test:coverage
```

## Run the app

Execute the app in developement mode:

```bash
npm run start:dev
```

## API Usage

- The application exposes various endpoints for managing quotes. Refer to the documentation in the `test/app.e2e-spec.ts` file for details on the available endpoints and their usage.

## License

This project is licensed under the MIT License.
