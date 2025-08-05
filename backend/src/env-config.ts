interface Environment {
  port: number;
  dbUser: string;
  dbPwd: string;
  dbConntectionString: string;
}

const getRequiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
};

// Create the config object
const environment: Environment = {
  port: parseInt(getRequiredEnv("PORT")),
  dbUser: getRequiredEnv("DB_USER"),
  dbPwd: getRequiredEnv("DB_PWD"),
  dbConntectionString: getRequiredEnv("DB_CONNECTION_STRING"),
};

// Ensure all environment variables are valid
if (isNaN(environment.port)) {
  throw new Error("Environment variable PORT must be a number.");
}

// Export the immutable configuration object
Object.freeze(environment);
export default environment;
