import { useState } from "react";
import CustomVision from "./components/CustomVision";
import './App.css'

function App() {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleClear = () => {
    setImage(null);
    setFile(null);
  };

  return (
    <div className="container">
      <h1 className="prototype">Turners Cars Type Recognition</h1> <br />
      <h2 className="upload">Select Image:</h2> <input className="input" type="file" onChange={handleChange} />
      <button className="button" onClick={handleClear}>Clear Image</button>
      {image && <img className="image" src={file} />}
      {image && <CustomVision image={image} />}
    </div>
  );
}

export default App;