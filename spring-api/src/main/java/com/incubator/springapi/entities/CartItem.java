package com.incubator.springapi.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "CartItem", schema = "dbo")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class CartItem {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "CartItemID")
    private Integer cartItemID;

    @Basic
    @OneToOne
    @JoinColumn(name = "CartID")
    private Cart cart;

    @Basic
    @OneToOne
    @JoinColumn(name = "BookID")
    private Book book;

    @Basic
    @Column(name = "Quantity")
    private Integer quantity;

    public CartItem(Cart cart, Book book, Integer quantity) {
        this.cart = cart;
        this.book = book;
        this.quantity = quantity;
    }
}
