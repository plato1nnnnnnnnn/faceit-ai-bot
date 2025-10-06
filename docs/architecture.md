# Architecture Overview

## System Components

### 1. Frontend
- Built with React and Next.js.
- Features include dynamic charts, dark mode, and responsive design.

### 2. Backend
- Node.js server with Redis caching.
- Handles AI analysis, payments, and user data.

### 3. AI Model
- Trained on user data to provide accurate predictions and analysis.

### 4. Database
- Uses Redis for caching and quick data retrieval.

## Data Flow
1. User uploads a demo file.
2. Backend processes the file and sends it to the AI model.
3. Results are cached in Redis and returned to the user.

---

For API details, refer to the [API Documentation](api.md).