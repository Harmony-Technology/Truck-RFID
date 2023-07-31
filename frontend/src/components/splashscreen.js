import React, { useEffect, useState } from 'react';

const SplashScreen = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div
      style={{
        display: loading ? 'block' : 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        zIndex: 999999,
      }}>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%,-50%)',
        }}>
        <img
          src='assets/logos/logo-harmony.svg'
          alt='logo'
          style={{ width: 200, height: 200 }}
        />
      </div>
    </div>
  );
};

export default SplashScreen;
