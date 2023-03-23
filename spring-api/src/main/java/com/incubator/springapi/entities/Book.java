package com.incubator.springapi.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "Book", schema = "dbo")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Book {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "BookID")
    private Integer bookID;

    @Basic
    @Column(name = "BookName")
    private String bookName;

    @Basic
    @Column(name = "PublicationDate")
    @JsonFormat(pattern="yyyy-MM-dd")
    private String publicationDate;

    @Basic
    @Column(name = "BookVersion")
    private Integer version;

    @Basic
    @Column(name = "AvailableQuantity")
    private Integer availableQuantity;

    @Basic
    @Column(name = "Price")
    private float price;

    public Book(String bookName, String publicationDate, Integer version, Integer availableQuantity, float price) {
        this.bookName = bookName;
        this.publicationDate = publicationDate;
        this.version = version;
        this.availableQuantity = availableQuantity;
        this.price = price;
    }
}
