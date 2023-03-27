package com.incubator.springapi.services;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.BookRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository){
        this.bookRepository = bookRepository;
    }

    public List<Book> getAllBooks() {
        Iterable<Book> bookIterable = bookRepository.findAll();

        List<Book> result = new ArrayList<>();
        bookIterable.forEach(result::add);

        return result;
    }

    public Book updateBookQuantity(Book book, Integer quantitySold){
        Book existingBook = bookRepository.findBookByBookName(book.getBookName());
        if(existingBook!=null)
        {
                existingBook.setAvailableQuantity(existingBook.getAvailableQuantity() - quantitySold);
                bookRepository.save(existingBook);
                return existingBook;
        }

        return null;
    }
}
