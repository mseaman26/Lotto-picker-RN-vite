import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native-web';
import { AuthContext } from '../context/AuthContext';
import NavigateUniversal from './NavigaveUniversal/NavigateUniversal';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    
    // Check if user is authenticated, if not redirect to login
    if (!loading && !user) {
      console.log('redirecting to login page');
      setRedirect(true);
    }
  }, [user, loading]);

  if (redirect) {
    return <NavigateUniversal to="/LoginPage" />;
  }

  // If still loading, show a loading indicator
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If authenticated, render the protected children
  return children;
};

export default ProtectedRoute;
