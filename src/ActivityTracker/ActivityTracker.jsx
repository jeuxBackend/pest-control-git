import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance/axioisInstance';



const ActivityTracker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let inactivityTimer;

    
    const Logout = async () => {
       
        try {
          const response = await axiosInstance.get(`admin/logout`);
    
          if (response.data) {
            console.log(response.data);
            localStorage.clear();
            navigate('/')
          }
        } catch (error) {
          console.error(error.response || error);
         
        } finally {
       
        }
      };

  
    const resetTimer = () => {
      clearTimeout(inactivityTimer); 
      inactivityTimer = setTimeout(Logout, 5* 60 * 1000); 
    };

    
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    window.addEventListener('click', resetTimer);

    
    resetTimer();

    
    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      window.removeEventListener('click', resetTimer);
      clearTimeout(inactivityTimer); 
    };
  }, [navigate]);

  return null; 
};

export default ActivityTracker;
