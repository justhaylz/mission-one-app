import useSWR from 'swr';
import '../components/CustomVision.css';
 
// Define the minimum confidence threshold for a prediction to be considered valid
const PREDICTION_THRESHOLD = 0.45;
 
// This functional component handles processing an image using the Custom Vision service
// eslint-disable-next-line react/prop-types
const CustomVision = ({ image }) => {
  // Define the URL of the Custom Vision prediction endpoint (likely retrieved from environment variables)
  const customVisionURL = import.meta.env.VITE_API_ENDPOINT;
 
  // Use the `useSWR` hook to fetch data from the Custom Vision endpoint
  // The fetcher function is responsible for making the API call
  const { data, error, isLoading, isValidating } = useSWR(customVisionURL, fetcher);
 
  // This function defines how to fetch data from the Custom Vision endpoint
  async function fetcher(url) {
    // Making a POST request to the custom vision API
    const response = await fetch(url, {
      method: "POST",
      headers: {
        // Using Prediction-Key from environment variables for authentication
        "Prediction-Key": import.meta.env.VITE_PRODUCTION_KEY,
        // Setting the content type as octet-stream for the image data
        "Content-Type": "application/octet-stream",
      },
      body: image // Sending the image as the request body
    });
    console.log(image);
    // Parsing the JSON response from the API
    const data = await response.json();
    console.log(data);
    // Extracting the probability and vehicle type from the response
    const probability = Object.entries(data)[4][1][0].probability;
    const vehicle = Object.entries(data)[4][1][0].tagName.toUpperCase();
    // Checking if the probability is greater than a threshold to ensure accuracy
    if (probability > PREDICTION_THRESHOLD) {
      // Returning the vehicle type if the probability is high enough
      return "Vehicle type is: " + vehicle;
    } else {
      // Returning an error message if the vehicle type cannot be reliably determined
      return "Unable to detect the type of vehicle. Please try a different image.";
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