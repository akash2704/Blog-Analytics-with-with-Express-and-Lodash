# Blog Analytics API

## Overview
This project is a Node.js Express API for analyzing and searching blogs. It provides two main endpoints: `/api/blog-stats` for retrieving statistics about the blogs and `/api/blog-search` for searching blogs. The API fetches data from an external source and performs various analytics operations using Lodash. Additionally, it implements a caching mechanism to store and reuse analytics and search results for improved performance.

## Dependencies
- Node.js
- Express.js
- Axios
- Lodash
- Chai and Mocha (for testing)

## Installation
1.  Clone the repository to your local machine: git clone https://github.com/akash2704/Blog-Analytics-with-with-Express-and-Lodash.git
2.  Navigate to the project directory:
3.  Install the project dependencies: npm install

## Running the Code
1. Start the app.js server: npm start
2. The server will be running on port 3000 by default. You can access the API using the following base URL: http://localhost:3000


## Endpoints

### `/api/blog-stats`
- **Method:** GET
- **Description:** Returns statistics about the blogs, including the total number of blogs, the longest blog title, the number of blogs with "privacy" in the title, and a list of unique blog titles.
- **Example Request:** curl http://localhost:3000/api/blog-stats

### `/api/blog-search`
- **Method:** GET
- **Description:** Searches blogs based on a query parameter and returns the matching blogs.
- **Query Parameter:** `query` (string)
- **Example Request:** curl http://localhost:3000/api/blog-search?query=privacy
## Testing
To run the tests for this project, use the following command: npm test

