package com.incubator.springapi.repositories;

import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {
    public Cart findByUser(User user);
}
