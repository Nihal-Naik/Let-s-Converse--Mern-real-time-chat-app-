const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const MONGO_URI=getEnv("MONGO_URI")
export const SECRET=getEnv("SECRET")
export const PORT=getEnv("PORT")
// export const CLIENT_URL=getEnv("CLIENT_URL")
// export const NODE_ENV=getEnv("NODE_ENV")
export const CLOUDINARY_NAME=getEnv("CLOUDINARY_NAME")
export const API_KEY=getEnv("API_KEY")
export const API_SECRET=getEnv("API_SECRET")