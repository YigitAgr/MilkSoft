package com.MilkSoft.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.MilkSoft.model.User;
public interface UserRepository extends JpaRepository<User, Integer> {
}
