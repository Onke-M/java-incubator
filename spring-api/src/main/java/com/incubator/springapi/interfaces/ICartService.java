package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.CartItem;

import java.util.List;

public interface ICartService {
    public List<CartItem> getCart();
    public List<CartItem> getUserCart(Integer userID);
    public CartItem addToCart(CartItem cartItem, Integer userID);
    public Book orderBook(CartItem cartItem);
}
