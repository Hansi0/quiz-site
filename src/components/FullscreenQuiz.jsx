import React, { useEffect, useState } from 'react';
import Quiz from './Quiz';
//import './FullscreenQuiz.css';

const FullscreenQuiz = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const enableFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    }
  };

  return (
    <div className="fullscreen-quiz">
      {isFullscreen ? (
        <Quiz />
      ) : (
        <div className="fullscreen-prompt">
          <h1>Please enable full screen mode to take the quiz</h1>
          <button onClick={enableFullscreen}>Enter Full Screen</button>
        </div>
      )}
    </div>
  );
};

export default FullscreenQuiz;
