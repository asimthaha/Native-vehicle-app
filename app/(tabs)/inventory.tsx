// screens/inventory.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SearchBar from "@/components/SearchBar"; // Adjust the path as needed
import { Colors } from "@/constants/Colors"; // Adjust the path as needed
import { useColorScheme } from "@/hooks/useColorScheme";
import ProductModal from "@/components/ProductModal"; // Adjust the path as needed
import { Ionicons } from "@expo/vector-icons"; // Install expo icons if needed
import ProductList from "@/components/ProductList"; // Import the ProductList component
import { Product, productsData } from "@/constants/productsData";

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>(productsData); // Initialize state with imported products
  const [modalVisible, setModalVisible] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const colorScheme = useColorScheme() || "light";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = (product: Product) => {
    setProducts((prev) => [...prev, product]);
  };

  const handleEditProduct = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const openModal = (product?: Product) => {
    setProductToEdit(product || null);
    setModalVisible(true);
  };

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

      {/* Render ProductList component */}
      <ProductList filteredProducts={filteredProducts} />

      <TouchableOpacity style={styles.fab} onPress={() => openModal()}>
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>

      <ProductModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={productToEdit ? handleEditProduct : handleAddProduct}
        productToEdit={productToEdit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#28a745",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
});

export default Inventory;
