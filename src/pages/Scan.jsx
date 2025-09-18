import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faRedo, faCamera, faStar } from '@fortawesome/free-solid-svg-icons';
import '../css/Scan.css';

export default function Scan({ onSavePlant, onBack }) {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [image, setImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  // Start camera and show frame
  const handleStartCamera = async () => {
    setImage(null);
    setPlantInfo(null);
    setScanning(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    }
  };

  // Retake
  const handleRetake = () => {
    setImage(null);
    setPlantInfo(null);
    setScanning(true);
    handleStartCamera();
  };

  // Capture image from video
  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/png');
    setImage(dataUrl);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    setScanning(false);
    setLoading(true);
    setTimeout(() => {
      setPlantInfo({
        name: 'Sample Plant',
        description: 'This is a sample plant description from AI.',
        care: 'Water weekly. Bright, indirect sunlight.',
      });
      setLoading(false);
    }, 2000);
  };

  // Save plant to favorites
  const handleSavePlant = () => {
    if (plantInfo && onSavePlant) {
      onSavePlant(plantInfo);
    }
  };

  // Back button
  const handleBack = () => {
    if (onBack) onBack();
    setImage(null);
    setPlantInfo(null);
    setScanning(false);
  };

  return (
    <div className="scan-page">
      <div className="scan-topbar">
        <button className="scan-back" onClick={handleBack}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      {!scanning && !image && (
        <div className="scan-actions">
          <button className="scan-btn" onClick={handleStartCamera}>Use Camera</button>
        </div>
      )}
      {scanning && (
        <div className="scan-frame-container">
          <div className="scan-frame">
            <video ref={videoRef} autoPlay className="scan-video" />
          </div>
          <div className="scan-navbar">
            <button className="scan-icon" onClick={handleRetake}>
              <FontAwesomeIcon icon={faRedo} />
            </button>
            <button className="scan-icon scan-capture" onClick={handleCapture}>
              <FontAwesomeIcon icon={faCamera} />
            </button>
            <button className="scan-icon" onClick={handleSavePlant} disabled={!plantInfo}>
              <FontAwesomeIcon icon={faStar} />
            </button>
          </div>
        </div>
      )}
      {loading && <div className="scan-loading">Scanning...</div>}
      {image && (
        <div className="scan-result">
          <img src={image} alt="Plant" className="scan-img" />
          {plantInfo && (
            <div className="scan-info">
              <h2>{plantInfo.name}</h2>
              <p>{plantInfo.description}</p>
              <p><strong>Care:</strong> {plantInfo.care}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
