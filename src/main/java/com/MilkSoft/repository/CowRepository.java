package com.MilkSoft.repository;

import com.MilkSoft.model.Cow;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CowRepository extends JpaRepository<Cow, Integer> {
}
