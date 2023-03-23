package com.incubator.springapi.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "Cart", schema = "dbo")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Cart {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "CartID")
    private Integer cartID;

    @Basic
    @OneToOne
    @JoinColumn(name = "UserID")
    private User user;

    public Cart(User user) {
        this.user = user;
    }
}
