import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

const LinkWrapper = ({ href, children, style }) => {
  return (
    <Link href={href} asChild>
      <Pressable>
        <Text style={styles.linkText}>{children}</Text>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  linkContainer: {
    padding: 10,
    margin: 5,
    backgroundColor: '#e0e0e0', // Optional styling
    borderRadius: 5,
  },
  linkText: {
    color: '#007bff', // Link color
    fontSize: 16,
  },
});

export default LinkWrapper;