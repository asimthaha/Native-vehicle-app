// components/ProductList.tsx
import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Modal,
  Button,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Make sure Expo icons are installed

interface Product {
  id: string;
  name: string;
  price: number;
}

interface ProductListProps {
  filteredProducts: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ filteredProducts }) => {
  const [products, setProducts] = useState(filteredProducts); // State for products
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const confirmDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const handleDelete = () => {
    if (selectedProduct) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== selectedProduct.id)
      );
      setIsModalVisible(false);
      setSelectedProduct(null);
    }
  };

  const cancelDelete = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem product={item} onConfirmDelete={confirmDelete} />
        )}
      />

      {/* Delete Confirmation Modal */}
      <Modal visible={isModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to delete this product?
            </Text>
            <View style={styles.buttonRow}>
              <Button title="No" onPress={cancelDelete} color="#6c757d" />
              <Button title="Yes" onPress={handleDelete} color="#d9534f" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProductItem = ({
  product,
  onConfirmDelete,
}: {
  product: Product;
  onConfirmDelete: (product: Product) => void;
}) => (
  <View style={styles.productContainer}>
    <View>
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Rs {product.price.toFixed(2)}</Text>
    </View>
    <DeleteButton onPress={() => onConfirmDelete(product)} />
  </View>
);

const DeleteButton = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.deleteButton}>
    <Ionicons name="trash-outline" size={24} color="#d9534f" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  productContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
  deleteButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 30,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
});

export default ProductList;
