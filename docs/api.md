# API Documentation

## Endpoints

### 1. Analyze Demo
**POST** `/analyze-demo`
- **Description**: Upload a demo file for AI analysis.
- **Request Body**:
  ```json
  {
    "file": "<demo_file>"
  }
  ```
- **Response**:
  ```json
  {
    "analysis": "<result>"
  }
  ```

### 2. Payments
**POST** `/payments/yookassa`
- **Description**: Initiate payment via YooKassa.
- **Response**:
  ```json
  {
    "payment_url": "<url>"
  }
  ```

**POST** `/payments/sbp`
- **Description**: Initiate payment via SBP.
- **Response**:
  ```json
  {
    "payment_url": "<url>"
  }
  ```