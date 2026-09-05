package com.srikumaranstore.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srikumaranstore.model.Sale;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    // Get all sales, newest first
    List<Sale> findAllByOrderBySaleDateDesc();

    // Get today's sales
    List<Sale> findBySaleDateBetween(
            LocalDateTime startOfDay,
            LocalDateTime endOfDay
    );
}
