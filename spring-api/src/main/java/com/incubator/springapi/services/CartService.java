package com.incubator.springapi.services;

import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.CartItem;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.CartItemRepository;
import com.incubator.springapi.repositories.CartRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final CartRepository cartRepository;

    public CartService(CartItemRepository cartItemRepository, UserService userService, CartRepository cartRepository){
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    public List<CartItem> getCart() {
        Iterable<CartItem> userCart = cartItemRepository.findAll();

        List<CartItem> result = new ArrayList<>();
        userCart.forEach(result::add);

        return result;
    }

    public List<CartItem> getUserCart(Integer userID) {
        User user = userService.getUser(userID);
        if(user!=null)
        {
            Cart userCart = cartRepository.findByUser(user);
            if(userCart!=null)
            {
                List<CartItem> userCartItems = cartItemRepository.findByCart(userCart);
                return userCartItems;
            }
        }
        return null;
    }

    public CartItem addToCart(CartItem cartItem, Integer userID){
        User user = userService.getUser(userID);
        if(user!=null)
        {
            Cart userCart = cartRepository.findByUser(user);
            if(userCart!=null)
            {
                cartItem.setCart(userCart);
                cartItemRepository.save(cartItem);

                return cartItem;
            }
        }

        return null;
    }
}
