# XState Demo with API and SQLite Persistence

This project is a demonstration of using XState (version 5.x) with a simple order transaction system that persists data to SQLite. It includes an Express server for handling HTTP requests, where each order is managed by its own XState state machine actor. The state of each order is persisted to a SQLite database.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/vtripolitakis/xstate-persistence-demo.git
   cd xstate-persistence-demo

2. Install the dependencies:

```bash
make install
```

This will run npm install to install all dependencies and initialize the SQLite database using the provided initdb script.

## Usage
Start the server:

```bash
make start
```
The server will be running on http://localhost:3000.

To stop the server:

```bash
make stop
```

## API Endpoints
1. Get Order Information

Endpoint: `/order/:uuid`

Method: `GET`

Description: Fetches the current state and context of the order associated with the provided UUID.

Example Response:

```json
{
  "message": "OK",
  "uuid": "example-uuid",
  "value": "orderState",
  "context": { ... }
}
```

2. Create a New Order

Endpoint: `/new_order`

Method: `GET`

Description: Creates a new order with a unique UUID and saves its initial state in the database.

Example Response:

```json
{
  "order": "new-uuid"
}
```

3. Place an Order

Endpoint: `/place_order/:uuid`

Method: `GET`

Description: Transitions the order state to "placed" for the given UUID.

Example Response:

```json
{
  "message": "OK",
  "uuid": "example-uuid",
  "value": "placed",
  "context": { ... }
}
```

4. Complete an Order
Endpoint: `/complete_order/:uuid`
Method: `GET`

Description: Transitions the order state to "completed" for the given UUID.

Example Response:

```json
{
  "message": "OK",
  "uuid": "example-uuid",
  "value": "completed",
  "context": { ... }
}
```

### Technologies Used
- Node.js: Server-side JavaScript runtime.
- Express.js: Web framework for Node.js.
- XState: State machine and actor model library.
- SQLite: Lightweight database engine.
- Sequelize: ORM for Node.js.
- Nodemon: Development tool for automatically restarting the server.

### License
This project is licensed under the MIT License. See the LICENSE file for more details.

### Author
Developed by Vangelis Tripolitakis.