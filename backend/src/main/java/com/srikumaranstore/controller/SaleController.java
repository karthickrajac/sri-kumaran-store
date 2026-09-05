package com.srikumaranstore.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.srikumaranstore.dto.SaleRequest;
import com.srikumaranstore.model.Sale;
import com.srikumaranstore.model.SaleItem;
import com.srikumaranstore.service.SaleService;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "http://localhost:5173")
public class SaleController {

    private final SaleService saleService;

    public SaleController(SaleService saleService) {
        this.saleService = saleService;
    }

    // Create a new sale
    @PostMapping
    public ResponseEntity<Sale> createSale(
            @RequestBody SaleRequest request) {

        Sale sale = saleService.createSale(request);

        return ResponseEntity.ok(sale);
    }

    // Get all sales
    @GetMapping
    public ResponseEntity<List<Sale>> getAllSales() {

        List<Sale> sales = saleService.getAllSales();

        return ResponseEntity.ok(sales);
    }

    // Get today's total sales
    @GetMapping("/today")
    public ResponseEntity<Double> getTodaySales() {

        double total = saleService.getTodaySales();

        return ResponseEntity.ok(total);
    }

    // Get items belonging to a particular sale
    @GetMapping("/{saleId}/items")
    public ResponseEntity<List<SaleItem>> getSaleItems(
            @PathVariable Long saleId) {

        List<SaleItem> items =
                saleService.getSaleItems(saleId);

        return ResponseEntity.ok(items);
    }
}