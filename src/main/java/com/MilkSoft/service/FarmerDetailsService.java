package com.MilkSoft.service;

import com.MilkSoft.model.Farmer;
import com.MilkSoft.repository.FarmerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class FarmerDetailsService implements UserDetailsService {

    private final FarmerRepository farmerRepository;

    public FarmerDetailsService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Farmer farmer = farmerRepository.findByEmail(email);
        if (farmer == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return farmer;
    }
}