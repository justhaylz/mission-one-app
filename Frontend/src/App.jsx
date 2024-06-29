import { useState } from "react";
import CustomVision from "./components/CustomVision";
import './App.css';
 
// This is the main functional component for our application
function App() {
  // This state variable holds the selected image file object
  const [file, setFile] = useState(null);
  // This state variable holds a URL to the selected image for display
  const [image, setImage] = useState(null);
 
  // This function handles the change event for the file input
  const handleChange = (e) => {
    // Check if a file was selected
    if (e.target.files.length > 0) {
      // Get the first selected file
      const selectedFile = e.target.files[0];
      // Update the image state with the selected file
      setImage(selectedFile);
      // Create a URL for the selected file using URL.createObjectURL
      // This allows us to display the image in the browser
      setFile(URL.createObjectURL(selectedFile));
    }
  };
 
  // This function handles clearing the selected image and URL
  const handleClear = () => {
    // Reset both image and file state variables to null
    setImage(null);
    setFile(null);
  };
 
  return (
    <div className="container">
      <h1 className="prototype">Turners Car Type Recognition</h1>
      <br />
      <h2 className="upload">Select Image:</h2>
      {/* Conditionally render the image element based on the image state */}
      {image && <img className="image" src={file} alt="Selected Image" />}
      {/* Pass the selected image to the CustomVision component */}
      <br />
      {image && <CustomVision image={image} />}
      <input className="input" type="file" onChange={handleChange} onClick={handleClear} />
      <button className="button" onClick={handleClear}>Clear Image</button>
    </div>
  );
}
 
export default App;
