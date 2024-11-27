# Hacker-news-app
This is a client application that interacts with the Hacker News API to fetch and display news articles.

## Features

- Fetch various stories from Hacker News
- Display story in lists based on specific routes
- Display story details with comments added
- Responsive design
- Story filtering
- Story default sort based on when added
- theme with light and dark mode

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- vite
- react-router
- tailwind-css
- shadCn



## Installation

1. Navigate to the project directory:
    ```sh
    cd hacker-client-app
    ```
2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

### Build the Codebase

To build the codebase, run:
```sh
npm run build
```

### Run the Application

To start the application, run:
```sh
npm run dev
```

The application will be available at `http://localhost:5173`.

## API Usage

This application uses the [Hacker News API](https://github.com/HackerNews/API) to fetch news articles.

### Fetch Top Stories

To fetch the top stories, make a GET request to:
```
https://hacker-news.firebaseio.com/v0/topstories.json
```

### Fetch Story Details

To fetch the details of a specific story, make a GET request to:
```
https://hacker-news.firebaseio.com/v0/item/<story_id>.json
```

Replace `<story_id>` with the ID of the story you want to fetch.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.




