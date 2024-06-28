// VehicleRecognitionComponent.jsx

import { useState } from 'react';

const VehicleRecognition = () => {
//   const [image, setImage] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('https://southcentralus.api.cognitive.microsoft.com/customvision/v3.0/Prediction/ab55f86b-49ca-45e8-97af-1e8171dbfea9/classify/iterations/Vehicles/image', {
        method: "POST",
        headers: {
            // Using Prediction-Key from environment variables for authentication
            "Prediction-Key": import.meta.env.VITE_PRODUCTION_KEY,
            // Setting the content type as octet-stream for the image data
            "Content-Type": "application/octet-stream",
        },
        body: "image" // Sending the image as the request body
    });

      if (response.ok) {
        const data = await response.json();
        setPrediction(data.prediction); // Update state with predicted vehicle type
      } else {
        console.error('Error processing image');
      }
    } catch (error) {
      console.error('API request failed:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {prediction && <p>Predicted vehicle type: {prediction}</p>}
    </div>
  );
};

export default VehicleRecognition;
