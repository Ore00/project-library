
# Personal Library Project

This is the Personal Library project, part of the freeCodeCamp Quality Assurance certification. 
You can find the challenge details on the [freeCodeCamp website](https://www.freecodecamp.org/learn/quality-assurance/quality-assurance-projects/personal-library).

## Project Overview

The Personal Library allows users to manage a collection of books. Users can:
- Add a new book to the library
- View details of all books in the library
- View details of a single book
- Add comments to books
- Delete books from the library

## Key Features

- Users can add books with a title and view all the books in the library.
- Users can view individual books along with any comments left on them.
- Users can delete individual books or all books at once.
- MongoDB is used to store books and comments.
- Data validation is enforced using `express-validator`.

## Technologies Used

- Node.js
- Express
- MongoDB (via Mongoose)
- Mocha (for testing)
- Chai and Chai-HTTP (for assertions and HTTP requests testing)
- dotenv (for environment variable management)
- Zombie.js (for simulated user interaction testing)

## Installation and Setup

To run this project locally, follow the steps below:

1. Clone this repository:
    ```
    git clone https://github.com/Ore00/project-library.git
    ```

2. Navigate to the project directory:
    ```
    cd project-library
    ```

3. Install the required dependencies:
    ```
    npm install
    ```

4. Create a `.env` file in the root directory and add the following environment variables:
    ```
    MONGO_URI=your_mongo_connection_string
    ```

5. Start the development server:
    ```
    npm start
    ```

6. Run the tests to ensure everything is set up correctly:
    ```
    npm test
    ```

## API Endpoints

The following endpoints are available for interacting with the Personal Library API:

- **POST** `/api/books`: Add a new book to the library.
- **GET** `/api/books`: Retrieve all books in the library.
- **GET** `/api/books/{id}`: Retrieve details of a specific book by ID.
- **POST** `/api/books/{id}`: Add a comment to a specific book.
- **DELETE** `/api/books`: Delete all books from the library.
- **DELETE** `/api/books/{id}`: Delete a specific book by ID.

## Testing

Mocha and Chai are used to test the API endpoints. To run the tests, use the command:
```
npm test
```

## License

This project is licensed under the [MIT License](https://opensource.org/license/mit).
