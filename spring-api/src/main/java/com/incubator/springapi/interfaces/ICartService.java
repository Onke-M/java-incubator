package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.CartItem;

import java.util.List;

public interface ICartService {
    public List<CartItem> getCart();
    public List<CartItem> getUserCart(Integer userID);
    public void addToCart(CartItem cartItem, Integer userID);
    public void orderBook(CartItem cartItem);
}
