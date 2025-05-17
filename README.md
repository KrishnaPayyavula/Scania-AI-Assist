# Scania AI Developer Assistant

An AI-powered full-stack developer assistant designed to support Scania engineering teams with instant, accurate answers to technical questions. Leveraging OpenAI's GPT models via Azure, this assistant provides a seamless natural language interface and ensures a consistent experience through containerized deployment.

---

## 🚀 Features

* 💬 **Natural Language Query Interface**
  Ask development-related questions in plain English and get reliable responses.

* 🤖 **Powered by Azure OpenAI (GPT-4)**
  Delivers intelligent and context-aware answers for various technical topics.

* 📝 **Query History with MongoDB**
  All queries and responses are persistently stored for reference and tracking.

* 🔒 **Containerized Architecture**
  Docker ensures environment consistency across development and production.

* 📊 **Robust Logging**
  Application events and errors are logged using Winston for effective monitoring and debugging.

---

## 🧱 Technology Stack

### Frontend

* React 19 with TypeScript
* Axios for HTTP requests
* Responsive UI with modern design patterns

### Backend

* Express.js with TypeScript
* MongoDB Atlas for data storage
* Winston for centralized logging
* Azure OpenAI SDK for GPT integration

### Infrastructure

* Docker & Docker Compose for container orchestration
* Secure environment management via `.env` files

---

## ⚙️ Getting Started

### Prerequisites

* [Docker](https://www.docker.com/get-started) & [Docker Compose](https://docs.docker.com/compose/install/)
* [Azure OpenAI Service](https://azure.microsoft.com/en-us/products/cognitive-services/openai-service) API Key
* [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster

---

### Installation & Configuration

1. **Clone the Repository**

   ```bash
   git clone https://github.com/yourusername/scania-ai-assist.git
   cd scania-ai-assist
   ```

2. **Configure Environment Variables**
   Create and edit the `.env`  file with your credentials:

   ```bash
# Azure OpenAI
AZURE_OPENAI_ENDPOINT=your_azure_endpoint
AZURE_OPENAI_API_KEY=your_azure_api_key
AZURE_OPENAI_DEPLOYMENT_NAME=your_deployment_name

# MongoDB
MONGODB_USERNAME=your_mongodb_username
MONGODB_PASSWORD=your_mongodb_password
   ```

---

### 🐳 Running the Application (Recommended with Docker)

```bash
docker-compose up --build
```

Access the application at: [http://localhost:3000](http://localhost:3000)

---

### 🔧 For Development

#### Frontend

```bash
cd frontend
npm install
npm start
```

#### Backend

```bash
cd backend
npm install
npm run dev
```

---

## 📡 API Endpoints

### **POST /api/query**

Submit a developer query.

**Request:**

```json
{
  "query": "How do I implement async/await in TypeScript?"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "query": "How do I implement async/await in TypeScript?",
    "response": "Here's how to use async/await...",
    "timestamp": "2024-02-15T10:30:15.123Z"
  }
}
```

---

### **GET /api/queries**

Retrieve past queries and responses.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "507f1f77bcf86cd799439011",
      "query": "How do I implement async/await in TypeScript?",
      "response": "Here's how to use async/await...",
      "timestamp": "2024-02-15T10:30:15.123Z"
    }
  ]
}
```

---

## 🗂 Project Structure

```
scania-ai-assist/
├── frontend/                # React TypeScript frontend
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── services/        # API service layer
│   │   └── types/           # TypeScript interfaces
│   └── Dockerfile
│
├── backend/                 # Express TypeScript backend
│   ├── src/
│   │   ├── config/          # Configurations (env, DB)
│   │   ├── controllers/     # Route handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── services/        # OpenAI logic
│   │   └── utils/           # Utility functions
│   └── Dockerfile
│
└── docker-compose.yml       # Docker orchestration
```

---

## 📄 License

This project is licensed under the [GNU General Public License v3.0](LICENSE).

