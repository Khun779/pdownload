import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [url, setUrl] = useState('');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await axios.post('https://backend-service-uaag.onrender.com/download', { url }, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'video.mkv'); // or extract the original file name from response headers
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading the video:', error);
    }
    setDownloading(false);
  };

  return (
    <div className="App">
      <h1>YouTube Video Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter YouTube video URL"
      />
      <button onClick={handleDownload} disabled={downloading}>
        {downloading ? 'Downloading...' : 'Download'}
      </button>
    </div>
  );
};

export default App;