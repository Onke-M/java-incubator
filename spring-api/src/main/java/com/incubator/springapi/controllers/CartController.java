package com.incubator.springapi.controllers;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.CartItem;
import com.incubator.springapi.interfaces.ICartService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/cart")
@CrossOrigin(origins ={"http://localhost:4200"}, methods={RequestMethod.GET, RequestMethod.POST})
public class CartController {
    private final ICartService cartService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    public CartController(ICartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping()
    public ResponseEntity<List<CartItem>> getUserCart(@RequestParam Integer userID) {
        LOGGER.info("Fetching user's cart");
        List<CartItem> cartItems = cartService.getUserCart(userID);

        if (!cartItems.isEmpty()) {
            LOGGER.trace("Found cart items");
            return new ResponseEntity<>(cartItems, HttpStatus.OK);
        }

        LOGGER.info("No cart items could be found");
       return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping
    public ResponseEntity<?> addToCart(@RequestBody CartItem cartItem, @RequestParam Integer userID) {
        try{
            LOGGER.info("Adding book={} to cart", cartItem);
            cartService.addToCart(cartItem, userID);
            LOGGER.trace("Book Added To Cart");
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @PostMapping
    @RequestMapping("/orderBook")
    public ResponseEntity<?> orderBook(@RequestBody CartItem cartItem) {
        try{
            LOGGER.info("Adding book={} to order", cartItem);
            cartService.orderBook(cartItem);
            LOGGER.trace("Book Added To Order");
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        catch(Exception e){
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }
}
