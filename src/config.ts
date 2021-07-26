const config = {
    apiUrl: process.env.REACT_APP_BACKEND_URL,
    googleApiKey: process.env.REACT_APP_GOOGLE_API_KEY
  };
  
// // Fail loudly and early if we don't have a required config
Object.entries(config).forEach(([key, value]) => {
  if (!value) throw new Error(`Required config '${key}' is not defined`);
});

export default config;