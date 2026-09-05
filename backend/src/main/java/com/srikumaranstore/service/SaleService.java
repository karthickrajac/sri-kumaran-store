package com.srikumaranstore.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.srikumaranstore.dto.SaleItemRequest;
import com.srikumaranstore.dto.SaleRequest;
import com.srikumaranstore.model.Product;
import com.srikumaranstore.model.Sale;
import com.srikumaranstore.model.SaleItem;
import com.srikumaranstore.repository.ProductRepository;
import com.srikumaranstore.repository.SaleItemRepository;
import com.srikumaranstore.repository.SaleRepository;

@Service
public class SaleService {

    private final SaleRepository saleRepository;
    private final SaleItemRepository saleItemRepository;
    private final ProductRepository productRepository;

    public SaleService(
            SaleRepository saleRepository,
            SaleItemRepository saleItemRepository,
            ProductRepository productRepository) {

        this.saleRepository = saleRepository;
        this.saleItemRepository = saleItemRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public Sale createSale(SaleRequest request) {

        // Validate request
        if (request == null) {
            throw new RuntimeException("Sale request cannot be empty");
        }

        if (request.getPaymentMethod() == null
                || request.getPaymentMethod().trim().isEmpty()) {

            throw new RuntimeException("Payment method is required");
        }

        if (!request.getPaymentMethod().equals("CASH")
                && !request.getPaymentMethod().equals("UPI")
                && !request.getPaymentMethod().equals("CARD")) {

            throw new RuntimeException(
                    "Payment method must be CASH, UPI or CARD"
            );
        }

        if (request.getItems() == null
                || request.getItems().isEmpty()) {

            throw new RuntimeException(
                    "At least one product is required"
            );
        }

        // Create sale
        Sale sale = new Sale();

        sale.setSaleDate(LocalDateTime.now());
        sale.setPaymentMethod(request.getPaymentMethod());
        sale.setTotalAmount(0);

        Sale savedSale = saleRepository.save(sale);

        double totalAmount = 0;

        // Process every product in the bill
        for (SaleItemRequest itemRequest : request.getItems()) {

            if (itemRequest.getProductId() == null) {
                throw new RuntimeException(
                        "Product ID is required"
                );
            }

            Product product = productRepository
                    .findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Product not found"
                            )
                    );

            double quantity = itemRequest.getQuantity();

            // Validate quantity
            if (quantity <= 0) {
                throw new RuntimeException(
                        "Quantity must be greater than zero"
                );
            }

            // Validate stock
            if (quantity > product.getStock()) {
                throw new RuntimeException(
                        "Not enough stock for "
                                + product.getName()
                );
            }

            // Get current selling price
            double unitPrice = product.getSellingPrice();

            // Calculate product total
            double itemTotal = quantity * unitPrice;

            // Create sale item
            SaleItem saleItem = new SaleItem();

            saleItem.setSale(savedSale);
            saleItem.setProduct(product);
            saleItem.setQuantity(quantity);
            saleItem.setUnitPrice(unitPrice);
            saleItem.setTotalPrice(itemTotal);

            saleItemRepository.save(saleItem);

            // Reduce stock
            product.setStock(
                    product.getStock() - quantity
            );

            productRepository.save(product);

            // Add to bill total
            totalAmount = totalAmount + itemTotal;
        }

        // Save final bill total
        savedSale.setTotalAmount(totalAmount);

        return saleRepository.save(savedSale);
    }

    // Get all sales, newest first
    public List<Sale> getAllSales() {

        return saleRepository.findAllByOrderBySaleDateDesc();
    }

    // Get all items belonging to a particular sale
    public List<SaleItem> getSaleItems(Long saleId) {

        return saleItemRepository.findBySaleId(saleId);
    }

    // Get today's total sales
    public double getTodaySales() {

        LocalDate today = LocalDate.now();

        LocalDateTime startOfDay =
                today.atStartOfDay();

        LocalDateTime endOfDay =
                today.atTime(23, 59, 59);

        List<Sale> todaySales =
                saleRepository.findBySaleDateBetween(
                        startOfDay,
                        endOfDay
                );

        double total = 0;

        for (Sale sale : todaySales) {

            total = total + sale.getTotalAmount();
        }

        return total;
    }
}