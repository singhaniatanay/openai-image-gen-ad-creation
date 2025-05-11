// Retrieve the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("Error: VITE_API_BASE_URL is not defined in your .env file.");
  // You might want to throw an error here or provide a default fallback for local development,
  // but it's generally better to ensure it's set.
}

export const API_ENDPOINTS = {
  scrapeDetails: `${API_BASE_URL}/scrape-details/`,
  // Add other API endpoints here as your application grows
  // e.g., anotherEndpoint: `${API_BASE_URL}/another-feature/`
};

// You can also export the base URL if needed elsewhere, though it's often encapsulated by the endpoints object.
// export { API_BASE_URL };