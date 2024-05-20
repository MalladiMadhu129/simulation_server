

# Simulation Backend README

## Description

This project is an Simulation Backend application that provides RESTful APIs for managing scenarios and vehicles data stored in JSON files. It utilizes the Express.js framework for handling HTTP requests and responses, along with other dependencies such as `body-parser`, `fs`, and `cors`.

## Folder Structure

```
.
├── index.js
├── package.json
├── scenarios.json
├── tree_structure.txt
├── vehicles.json
└── data
    ├── scenarios.json
    └── vehicles.json
```

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Usage

### Endpoints

- **GET /scenarios**: Retrieves all scenarios.
- **GET /scenarios/last-id**: Retrieves the last used scenario ID.
- **POST /scenarios**: Creates a new scenario.
- **PUT /scenarios/:id**: Updates an existing scenario.
- **DELETE /scenarios/:id**: Deletes a scenario by ID.
- **DELETE /scenarios**: Deletes all scenarios.
- **GET /vehicles**: Retrieves all vehicles.
- **POST /vehicles**: Creates a new vehicle.
- **PUT /vehicles/:id**: Updates an existing vehicle.
- **DELETE /vehicles/:id**: Deletes a vehicle by ID.
- **DELETE /vehicles**: Deletes all vehicles.

### Data Storage

- Scenarios data is stored in `./data/scenarios.json`.
- Vehicles data is stored in `./data/vehicles.json`.

## Dependencies

- [Express.js](https://expressjs.com/): Web framework for Node.js.
- [Body-parser](https://www.npmjs.com/package/body-parser): Middleware to parse JSON bodies.
- [fs](https://nodejs.org/api/fs.html): File system module for reading and writing files.
- [CORS](https://www.npmjs.com/package/cors): Middleware for enabling Cross-Origin Resource Sharing.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributors

- List any contributors or credits here.

