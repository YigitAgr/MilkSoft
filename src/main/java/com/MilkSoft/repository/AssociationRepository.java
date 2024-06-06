package com.MilkSoft.repository;

import com.MilkSoft.model.Association;
import com.MilkSoft.model.MembershipRequest;
import com.MilkSoft.dto.MembershipRequestDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface AssociationRepository extends JpaRepository<Association, Integer> {

    @Query("SELECT new com.MilkSoft.dto.MembershipRequestDTO(m.id, m.farmer.id, f.name, m.association.id, m.status) FROM MembershipRequest m JOIN m.farmer f WHERE m.association.id = :associationId AND m.status = :status")
    List<MembershipRequestDTO> findPendingRequests(@Param("associationId") Integer associationId, @Param("status") MembershipRequest.RequestStatus status);

    @Query("SELECT a.id FROM Association a WHERE a.user.id = :userId")
    Integer findAssociationIdByUserId(@PathVariable("userId") Integer userId);
}