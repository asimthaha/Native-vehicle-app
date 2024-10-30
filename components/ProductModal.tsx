// components/ProductModal.tsx
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ProductModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  productToEdit?: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  onClose,
  onSave,
  productToEdit,
}) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  // Pre-fill fields if editing a product
  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setPrice(productToEdit.price.toString());
      setQuantity(productToEdit.quantity.toString());
    } else {
      setName("");
      setPrice("");
      setQuantity("");
    }
  }, [productToEdit]);

  const handleSave = () => {
    if (name && price && quantity) {
      const product: Product = {
        id: productToEdit ? productToEdit.id : Date.now().toString(),
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
      };
      onSave(product);
      onClose(); // Close the modal after saving
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {productToEdit ? "Edit Product" : "Add Product"}
            </Text>

            {/* Product Name Field */}
            <Text style={styles.label}>Product Name</Text>
            <TextInput
              placeholder="Enter product name"
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            {/* Price Field */}
            <Text style={styles.label}>Price (Rs.)</Text>
            <TextInput
              placeholder="Enter price"
              value={price}
              onChangeText={setPrice}
              keyboardType="numeric"
              style={styles.input}
            />

            {/* Quantity Field */}
            <Text style={styles.label}>Quantity</Text>
            <TextInput
              placeholder="Enter quantity"
              value={quantity}
              onChangeText={setQuantity}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.buttonRow}>
              <Button title="Cancel" color="#6c757d" onPress={onClose} />
              <Button title="Save" color="#28a745" onPress={handleSave} />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default ProductModal;
