package com.srikumaranstore.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.srikumaranstore.model.Product;
import com.srikumaranstore.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Add product
    public Product addProduct(Product product) {

        validateProduct(product);

        return productRepository.save(product);
    }

    // Update product
    public Product updateProduct(
            Long id,
            Product updatedProduct) {

        Product existingProduct =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"));

        validateProduct(updatedProduct);

        existingProduct.setName(
                updatedProduct.getName());

        existingProduct.setCategory(
                updatedProduct.getCategory());

        existingProduct.setUnit(
                updatedProduct.getUnit());

        existingProduct.setMrp(
                updatedProduct.getMrp());

        existingProduct.setSellingPrice(
                updatedProduct.getSellingPrice());

        existingProduct.setStock(
                updatedProduct.getStock());

        existingProduct.setImage(
                updatedProduct.getImage());

        return productRepository.save(existingProduct);
    }

    // Delete product
    public void deleteProduct(Long id) {

        if (!productRepository.existsById(id)) {
            throw new RuntimeException(
                    "Product not found");
        }

        productRepository.deleteById(id);
    }

    // Validate product data
    private void validateProduct(Product product) {

        if (product.getName() == null ||
                product.getName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Product name cannot be empty");
        }

        if (product.getCategory() == null ||
                product.getCategory().trim().isEmpty()) {

            throw new RuntimeException(
                    "Category cannot be empty");
        }

        if (product.getUnit() == null ||
                product.getUnit().trim().isEmpty()) {

            throw new RuntimeException(
                    "Unit cannot be empty");
        }

        if (product.getMrp() <= 0) {

            throw new RuntimeException(
                    "MRP must be greater than zero");
        }

        if (product.getSellingPrice() <= 0) {

            throw new RuntimeException(
                    "Selling price must be greater than zero");
        }

        if (product.getSellingPrice() >
                product.getMrp()) {

            throw new RuntimeException(
                    "Selling price cannot be greater than MRP");
        }

        if (product.getStock() < 0) {

            throw new RuntimeException(
                    "Stock cannot be negative");
        }
    }
}