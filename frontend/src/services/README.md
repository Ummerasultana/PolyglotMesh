# API Services

This folder contains functions used to communicate with the PolyglotMesh backend.

## api.js

The API service handles:

- Sending code to the backend.
- Sending the selected programming language.
- Receiving execution results.
- Handling backend connection errors.

## Backend Endpoint

POST http://localhost:8080/api/execute

## Expected Request

{
  "language": "python",
  "code": "print('Hello World')"
}

## Expected Response

{
  "output": "Hello World",
  "error": null,
  "executionTime": 100
}