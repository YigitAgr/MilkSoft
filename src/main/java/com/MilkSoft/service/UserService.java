package com.MilkSoft.service;

import com.MilkSoft.model.User;
import com.MilkSoft.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public User getUserById(int id){
        return userRepository.findById(id).orElseThrow( ()->new RuntimeException("User not foundwith id "+id));
    }

    public User createUser(User user) {

        return userRepository.save(user);

    }

    public User updateUser(User user){
        if(userRepository.existsById(user.getId())){
            return userRepository.save(user);
        }else{
            throw new RuntimeException("User not found with id "+user.getId());
        }
    }
}
