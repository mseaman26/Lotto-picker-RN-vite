import { useParams } from 'react-router-dom'; // Only import for web

export const getUrlParams = () => {
  // Check if we are in a web environment

    return useParams(); // Only access params on the web


};