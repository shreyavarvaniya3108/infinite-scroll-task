# Infinite Scroll & Dynamic Data Merging

A React and Express application that implements infinite scrolling using the native Intersection Observer API. New paginated data is dynamically fetched from the backend and appended to the existing list without page reloads.

## Features

- Infinite scrolling using the native Intersection Observer API
- Paginated backend API using `page` and `limit`
- Dynamically generated data
- Immutable state updates
- Loading state and error handling
- Backend input validation
- No third-party infinite-scroll library
- No page reload while loading new data
- Responsive and clean UI

## Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- Fetch API
- Intersection Observer API
- CSS

### Backend
- Node.js
- Express.js
- REST API

## Project Structure

```text
infinite-scroll-task/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md