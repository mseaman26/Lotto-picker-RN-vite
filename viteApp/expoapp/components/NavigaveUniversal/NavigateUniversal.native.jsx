import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';

const NavigateUniversal = ({ to, replace = false, state = {} }) => {
    console.log('NavigateUniversal to:', to);
    const router = useRouter();

    useEffect(() => {
      if (replace) {
        router.replace(to);  // Replace the current route
      } else {
        router.push(to);     // Push the new route
      }
    }, [to, replace, router]);
  
    return null;
};

export default NavigateUniversal;
