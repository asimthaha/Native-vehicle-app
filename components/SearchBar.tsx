// components/SearchBar.tsx
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";

interface SearchBarProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
}

const SearchBar = ({ searchTerm, onSearchTermChange }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search inventory..."
        value={searchTerm}
        onChangeText={onSearchTermChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginBottom: 10,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
  },
});

export default SearchBar;
