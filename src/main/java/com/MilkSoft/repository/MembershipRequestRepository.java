package com.MilkSoft.repository;

import com.MilkSoft.model.MembershipRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MembershipRequestRepository extends JpaRepository<MembershipRequest, Integer> {
    MembershipRequest findByFarmerIdAndAssociationId(int farmerId, int associationId);
}
