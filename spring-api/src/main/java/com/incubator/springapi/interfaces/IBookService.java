package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.Book;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IBookService {
    public List<Book> getAllBooks();
    public Book createNewBook(Book newBook);
    public ResponseEntity<?> deleteBook(Integer bookID);
    public Book updateBookQuantity(Book book, Integer quantitySold);
    public ResponseEntity<?> updateBook(Book book);
}
