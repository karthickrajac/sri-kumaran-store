package com.srikumaranstore.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.srikumaranstore.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

}
