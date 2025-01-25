import React, { useRef, useState, useEffect } from 'react';
import cv from '@techstark/opencv-js';

const PatternDetector = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    startCamera();
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
    }
  };

  const detectPattern = (imageData) => {
    const src = cv.matFromImageData(imageData);
    const gray = new cv.Mat();
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
    
    const logo = new cv.Mat();
    cv.threshold(gray, logo, 127, 255, cv.THRESH_BINARY);
    
    const contours = new cv.MatVector();
    const hierarchy = new cv.Mat();
    cv.findContours(logo, contours, hierarchy, cv.RETR_EXTERNAL, cv.CHAIN_APPROX_SIMPLE);

    return contours.size() > 0;
  };

  const captureFrame = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    
    const imageData = ctx.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
    return detectPattern(imageData);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        className="w-full max-w-md mb-4 rounded-lg"
      />
      <canvas
        ref={canvasRef}
        className="hidden"
        width={640}
        height={480}
      />
      <button
        onClick={() => {
          setIsDetecting(true);
          const found = captureFrame();
          console.log('Pattern found:', found);
          setIsDetecting(false);
        }}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
      >
        {isDetecting ? 'Scanning...' : 'Scan Pattern'}
      </button>
    </div>
  );
};

export default PatternDetector;