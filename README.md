# Hadith API

A simple RESTful API for fetching Hadiths from various Islamic collections.

## Features
- Retrieve random Hadiths from different collections
- Fetch specific Hadiths by ID
- CORS-enabled for easy integration with web applications

## Endpoints

### Base URL
```
https://en-hadith-api.vercel.app/
```

### Get a Random Hadith
```
GET /{collection}/
```
Example:
```
GET /bukhari/
```

### Get a Specific Hadith by ID
```
GET /{collection}/{id}
```
Example:
```
GET /muslim/1
```

## Available Collections
| Collection | Max ID |
|------------|--------|
| bukhari    | 7563   |
| muslim     | 3032   |
| abudawud   | 3998   |
| ibnmajah   | 4342   |
| tirmidhi   | 3956   |

## Installation & Running Locally

1. Clone the repository:
```
git clone https://github.com/saikothasan/Hadith-api
```
2. Install dependencies:
```
npm install
```
3. Run the server:
```
npm start
```

## Deployment
This API is optimized for deployment on Vercel. Simply run:
```
vercel deploy
```

## API Documentation
Visit the documentation here: [API Docs](https://en-hadith-api.vercel.app/)

## License
This project is open-source and available under the MIT License.

