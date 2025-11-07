# Zendesk Mock Endpoint

A mock Express.js server that simulates pharmacy order tracking and status endpoints for testing and development purposes.

## Features

- **Order Tracking**: Get random pharmacy information for order tracking
- **Order Status**: Get random order status updates
- **Mock Data**: Uses realistic pharmacy and status data for testing
- **Error Handling**: Proper error responses for invalid requests

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- ngrok (for external access)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zendesk-mock-endpoint
```

2. Install dependencies:
```bash
npm install
```

## Running the Server

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:3002` with hot reload enabled.

### Production Mode
```bash
npm run build
npm start
```

## API Endpoints

### 1. Order Tracking
**GET** `/api/v1/order/tracking`

Returns random pharmacy information for order tracking.

**Request Body:**
```json
{
  "orderNumber": "MPRS123456"
}
```

**Response (200):**
```json
{
  "name": "AnnalizSchultmayer hiaqXy",
  "address": "95 Secor Ln, Wee Waa, Queensland, 4817",
  "city": "Mount Rumney",
  "state": "VIC",
  "zip_code": "3054",
  "phone": "+61 886 603 685",
  "orderNumber": "MPRS123456"
}
```

**Error Response (400):**
```json
{
  "message": "Incorrect Request Body, Please format requests: { \"orderNumber\": \"MPRS**insert order number**\" }"
}
```

### 2. Order Status
**GET** `/api/v1/order/status`

Returns a random order status.

**Request Body:**
```json
{
  "orderNumber": "MPRS123456"
}
```

**Response (200):**
```json
{
  "status": "Shipped"
}
```

**Available Statuses:**
- Awaiting Payment
- Paid / Not Approved
- Approved / Not Paid
- Awaiting Shipment
- Shipped
- Completed
- Cancelled
- On hold
- Expired
- No Pharmacy
- Pharmacy Partially out of Stock
- Unable to Dispense
- Processing Dispense
- Refunded

## Running with ngrok

To make your local server accessible from external services (like Zendesk webhooks), use ngrok:

### 1. Install ngrok
```bash
# macOS (using Homebrew)
brew install ngrok

# Or download from https://ngrok.com/download
```

### 2. Start the Express server
```bash
npm run dev
```

### 3. In a new terminal, start ngrok
```bash
ngrok http 3002
```

### 4. Use the ngrok URL
ngrok will provide you with a public URL like:
```
https://abc123.ngrok.io -> http://localhost:3002
```

Your API endpoints will be available at:
- `https://abc123.ngrok.io/api/v1/order/tracking`
- `https://abc123.ngrok.io/api/v1/order/status`

### ngrok Configuration (Optional)
Create an `ngrok.yml` config file for custom settings:
```yaml
version: "2"
authtoken: your_auth_token_here
tunnels:
  zendesk-mock:
    addr: 3002
    proto: http
    hostname: your-custom-subdomain.ngrok.io
```

Then run:
```bash
ngrok start zendesk-mock
```

## Project Structure

```
zendesk-mock-endpoint/
├── src/
│   ├── data/
│   │   ├── pharmacy.json    # Mock pharmacy data
│   │   └── status.json      # Order status options
│   ├── routes/
│   │   └── routes.ts        # API route definitions
│   └── server.ts            # Express server setup
├── package.json
├── tsconfig.json
└── README.md
```

## Development Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (not implemented)

## Testing the API

### Using curl
```bash
# Test order tracking
curl -X GET http://localhost:3002/api/v1/order/tracking \
  -H "Content-Type: application/json" \
  -d '{"orderNumber": "MPRS123456"}'

# Test order status
curl -X GET http://localhost:3002/api/v1/order/status \
  -H "Content-Type: application/json" \
  -d '{"orderNumber": "MPRS123456"}'
```

### Using Postman
1. Set method to GET
2. URL: `http://localhost:3002/api/v1/order/tracking` or `http://localhost:3002/api/v1/order/status`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON): `{"orderNumber": "MPRS123456"}`

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `400` - Bad Request (missing or invalid orderNumber)
- `500` - Internal Server Error

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test your changes
5. Submit a pull request

## License

This project is licensed under the ISC License.