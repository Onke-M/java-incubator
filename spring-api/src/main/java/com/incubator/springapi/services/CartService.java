package com.incubator.springapi.services;

import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.CartItem;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.interfaces.ICartService;
import com.incubator.springapi.repositories.CartItemRepository;
import com.incubator.springapi.repositories.CartRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartService implements ICartService {
    private final CartItemRepository cartItemRepository;
    private final UserService userService;
    private final BookService bookService;
    private final CartRepository cartRepository;

    public CartService(CartItemRepository cartItemRepository, UserService userService, BookService bookService, CartRepository cartRepository){
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.bookService = bookService;
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
    @Transactional
    public void addToCart(CartItem cartItem, Integer userID){
        try{
            User user = userService.getUser(userID);
            if(user!=null)
            {
                Cart userCart = cartRepository.findByUser(user);
                if(userCart!=null)
                {
                    cartItem.setCart(userCart);
                    cartItemRepository.save(cartItem);
                }
            }
        }
        catch(Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }


    @Transactional
    public void orderBook(CartItem cartItem){
        try{
            CartItem existingStock = cartItemRepository.findByCartItemID(cartItem.getCartItemID());
            if(existingStock!=null){
                bookService.updateBookQuantity(cartItem.getBook(), cartItem.getQuantity());
                cartItemRepository.delete(cartItem);
            }
        }
        catch(Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }
}
