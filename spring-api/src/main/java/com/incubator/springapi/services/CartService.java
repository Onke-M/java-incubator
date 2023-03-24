package com.incubator.springapi.services;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.CartItem;
import com.incubator.springapi.repositories.BookRepository;
import com.incubator.springapi.repositories.CartItemRepository;
import com.incubator.springapi.repositories.CartRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {
    private final CartItemRepository cartItemRepository;
    private final CartRepository cartRepository;

    public CartService(CartItemRepository cartItemRepository, CartRepository cartRepository){
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
    }

    public List<CartItem> getCart() {
        Iterable<CartItem> userCart = cartItemRepository.findAll();

        List<CartItem> result = new ArrayList<>();
        userCart.forEach(result::add);

        return result;
    }

    public CartItem addToCart(CartItem cartItem){
        Optional<Cart> userCart = cartRepository.findById(cartItem.getCart().getCartID());
        if(userCart.isPresent())
        {
            cartItemRepository.save(cartItem);
        }
        return null;
    }
}
