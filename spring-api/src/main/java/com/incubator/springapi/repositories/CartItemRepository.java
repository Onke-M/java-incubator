package com.incubator.springapi.repositories;

import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.CartItem;
import com.incubator.springapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    public List<CartItem> findByCart(Cart cart);
    public CartItem findByCartItemID(Integer cartItemID);
}
