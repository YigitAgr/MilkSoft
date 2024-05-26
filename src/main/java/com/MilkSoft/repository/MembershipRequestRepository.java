package com.MilkSoft.repository;

import com.MilkSoft.model.MembershipRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MembershipRequestRepository extends JpaRepository<MembershipRequest, Integer> {
}
