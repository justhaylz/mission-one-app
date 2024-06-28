import useSWR from 'swr';
import '../components/CustomVision.css';

// Define the minimum confidence threshold for a prediction to be considered valid
const PREDICTION_THRESHOLD = 0.45;

// This functional component handles processing an image using the Custom Vision service
const CustomVision = (image) => {
  // Define the URL of the Custom Vision prediction endpoint (likely retrieved from environment variables)
  const customVisionURL = import.meta.env.VITE_API_ENDPOINT;

  // Use the `useSWR` hook to fetch data from the Custom Vision endpoint
  // The fetcher function is responsible for making the API call
  const { data, error, isLoading, isValidating } = useSWR(customVisionURL, fetcher);

  // This function defines how to fetch data from the Custom Vision endpoint
  async function fetcher(url) {
    // Make a POST request to the provided URL
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // Set the required headers for authentication and content type
        'Prediction-Key': import.meta.env.VITE_PRODUCTION_KEY,
        'Content-Type': 'application/octet-stream',
      },
      // Send the image data as the request body
      body: image,
    });

    // Parse the JSON response from the API
    const result = await response.json();

    // Extract the prediction data from the response (specific logic may vary)
    const prediction = result[4]?.[1]?.[0];

    // Check if a prediction is available and has sufficient confidence
    if (prediction && prediction.probability > PREDICTION_THRESHOLD) {
      // Return a formatted string with the predicted vehicle type (uppercase)
      return `Vehicle type: ${prediction.tagName.toUpperCase()}`;
    } else {
      // Return a message indicating the vehicle could not be identified
      return 'Unable to identify the type of vehicle. Please try a different image.';
    }
  }

  // Render the component content based on the data fetching state
  return (
    <div className='customVision'>
      {isLoading || isValidating ? (
        <h1>Loading data ...</h1>
      ) : error ? (
        <h1>Error occurred while loading data.</h1>
      ) : data ? (
        <p>{data}</p>
      ) : (
        <h1>No data to display.</h1>
      )}
    </div>
  );
};

export default CustomVision;
