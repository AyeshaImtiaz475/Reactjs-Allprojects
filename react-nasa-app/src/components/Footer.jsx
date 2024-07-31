import React from 'react';

export default function Footer(props) {
    const { showModal, handleToggleModal, data, isLoading } = props; // Added isLoading prop

    return (
        <footer>
            <div className='bgGradient'>
                <h1>APOD PROJECT</h1>
                <h2>{data?.title}</h2>
            </div>
            <button 
                onClick={handleToggleModal} 
                className={isLoading ? 'spin' : ''}
                aria-label="Info"
            >
                <i className="fas fa-info-circle"></i>
            </button>
        </footer>
    );
}

