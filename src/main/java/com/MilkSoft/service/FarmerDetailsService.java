package com.MilkSoft.service;

import com.MilkSoft.model.Farmer;
import com.MilkSoft.repository.FarmerRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmerDetailsService implements UserDetailsService {

    private final FarmerRepository farmerRepository;

    public FarmerDetailsService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Farmer farmer = farmerRepository.findByUsername(username);
        if (farmer == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return farmer;
    }

    public List<Farmer> getAllUsers() {
        return farmerRepository.findAll();
    }


}