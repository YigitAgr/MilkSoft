package com.MilkSoft.repository;

import com.MilkSoft.model.Cow;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CowRepository extends JpaRepository<Cow, Integer> {
    Optional<Cow> findByEarTag(String earTag);
}