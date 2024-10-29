// screens/inventory.tsx
import { View, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import SearchBar from "@/components/SearchBar"; // Adjust the import path as necessary
import { Colors } from "@/constants/Colors"; // Adjust the import path as necessary
import { useColorScheme } from "@/hooks/useColorScheme";
import ProductList from "@/components/ProductList"; // Import the new ProductList component

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const colorScheme = useColorScheme() || "light";

  const products = [
    { id: "1", name: "Product 1", price: 10 },
    { id: "2", name: "Product 2", price: 20 },
    { id: "3", name: "Product 3", price: 30 },
    // Add more products as needed
  ];

  // Filter products based on the search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: Colors[colorScheme].background },
      ]}
    >
      <Text style={[styles.title, { color: Colors[colorScheme].text }]}>
        Inventory
      </Text>
      <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />
      <ProductList filteredProducts={filteredProducts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1, // Ensure it takes the full height
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
});

export default Inventory;
