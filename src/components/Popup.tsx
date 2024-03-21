import React, { useEffect } from 'react';

const Popup = ({ message, color, onClose }) => {
	useEffect(() => {
    const timer = setTimeout(() => {
      // Remove the popup after 1 second
      onClose()
    }, 1000);

    return () => clearTimeout(timer); // Cleanup function to clear the timer on unmount
  }, []);

  return (
    <div
		id="popup"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'rgba(255, 0, 0, 0.8)', // Red background color
        color: '#fff', // White text color
        padding: '10px',
        borderRadius: '5px',
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
};

export default Popup;