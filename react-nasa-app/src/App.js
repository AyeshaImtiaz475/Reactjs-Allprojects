import React, { useState, useEffect } from 'react';
import Footer from './components/Footer';
import Main from './components/Main';
import SideBar from './components/SideBar';

export default function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.REACT_APP_NASA_API_KEY}`);
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div className="App">
      {loading ? (
        <div className="loadingState">
          <i className="fa-solid fa-gear spin"></i> {/* Ensure correct class names */}
        </div>
      ) : (
        <>
          {data ? <Main data={data} /> : (
            <div className="loadingState" >
              <i className="fa-solid fa-gear spin"></i>
            </div>
          )}
          {showModal && <SideBar handleToggleModal={handleToggleModal} data={data} />}
          <Footer showModal={showModal} handleToggleModal={handleToggleModal} data={data} />
        </>
      )}
    </div>
  );
}
