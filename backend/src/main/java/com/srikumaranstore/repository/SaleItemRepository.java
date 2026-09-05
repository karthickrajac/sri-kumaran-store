package com.srikumaranstore.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srikumaranstore.model.SaleItem;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {

    List<SaleItem> findBySaleId(Long saleId);
}
