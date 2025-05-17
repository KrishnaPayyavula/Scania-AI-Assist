# AI Developer Assistant - Project Structure

```
ai-dev-assistant/
├── .env                       # Environment variables (gitignored)
├── .env.example               # Example environment variables
├── .gitignore                 # Git ignore file
├── docker-compose.yml         # Docker compose configuration
├── README.md                  # Project documentation
│
├── backend/                   # Backend Express application
│   ├── Dockerfile             # Backend Docker configuration
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript configuration
│   └── src/
│       ├── index.ts           # Entry point
│       ├── app.ts             # Express app setup
│       ├── config/            # Configuration files
│       │   ├── database.ts    # Database configuration
│       │   └── env.ts         # Environment variables
│       ├── controllers/       # API controllers
│       │   └── queryController.ts
│       ├── models/            # Database models
│       │   └── query.ts
│       ├── routes/            # API routes
│       │   └── queryRoutes.ts
│       ├── services/          # Business logic
│       │   └── llmService.ts
│       └── utils/             # Utility functions
│           └── logger.ts      # Logging utility
│
└── frontend/                  # Frontend React application
    ├── Dockerfile             # Frontend Docker configuration
    ├── package.json           # Frontend dependencies
    ├── tsconfig.json          # TypeScript configuration
    ├── public/                # Public assets
    └── src/
        ├── App.tsx            # Main application component
        ├── index.tsx          # Entry point
        ├── components/        # React components
        │   ├── QueryForm.tsx  # Form for submitting queries
        │   └── ResponseArea.tsx # Display for assistant responses
        ├── services/          # Frontend services
        │   └── api.ts         # API communication
        └── types/             # TypeScript type definitions
            └── index.ts
```