// CustomVision.js
import useSWR from 'swr';
import '../components/CustomVision.css';

const PREDICTION_THRESHOLD = 0.45;

const CustomVision = (image) => {
    const customVisionURL = import.meta.env.VITE_API_ENDPOINT;

    const { data, error, isLoading, isValidating } = useSWR(customVisionURL, fetcher);

    async function fetcher(url) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Prediction-Key': import.meta.env.VITE_PRODUCTION_KEY,
                'Content-Type': 'application/octet-stream',
            },
            body: image,
        });

        const result = await response.json();
        const prediction = result[4]?.[1]?.[0];

        if (prediction && prediction.probability > PREDICTION_THRESHOLD) {
            return `Vehicle type: ${prediction.tagName.toUpperCase()}`;
        } else {
            return 'Unable to identify the type of vehicle. Please try a different image.';
        }
    }

    return (
        <div className='customVision'>
            {isLoading || isValidating ? <h1>Loading data ...</h1> :
                error ? <h1>Error occurred while loading data.</h1> :
                    data ? <p>{data}</p> : <h1>No data to display.</h1>}
        </div>
    );
};

export default CustomVision
