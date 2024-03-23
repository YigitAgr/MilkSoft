package com.MilkSoft.service;

import com.MilkSoft.model.Farmer;
import com.MilkSoft.repository.FarmerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FarmerService {
    private FarmerRepository farmerRepository;

    @Autowired
    public FarmerService(FarmerRepository farmerRepository) {
        this.farmerRepository = farmerRepository;
    }


    public List<Farmer> getUsers(){
        return farmerRepository.findAll();
    }

    public Farmer getUserById(int id){
        return farmerRepository.findById(id).orElseThrow( ()->new RuntimeException("User not foundwith id "+id));
    }

    public Farmer createUser(Farmer farmer) {

        return farmerRepository.save(farmer);

    }

    public Farmer updateUser(Farmer farmer){
        if(farmerRepository.existsById(farmer.getId())){
            return farmerRepository.save(farmer);
        }else{
            throw new RuntimeException("User not found with id "+ farmer.getId());
        }
    }
}
