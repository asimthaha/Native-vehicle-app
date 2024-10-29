// components/ProductList.tsx
import { View, FlatList, StyleSheet, Text } from "react-native";
import React from "react";

const products = [
  { id: "1", name: "Product 1", price: 10 },
  { id: "2", name: "Product 2", price: 20 },
  { id: "3", name: "Product 3", price: 30 },
  // Add more products as needed
];

const ProductList = ({
  filteredProducts,
}: {
  filteredProducts: Array<{ id: string; name: string; price: number }>;
}) => {
  return (
    <FlatList
      data={filteredProducts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
};

const ProductItem = ({
  product,
}: {
  product: { id: string; name: string; price: number };
}) => {
  return (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Rs {product.price.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    padding: 15,
    backgroundColor: "#f0f0f0", // Light color for product items
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
  },
});

export default ProductList;
