package com.incubator.springapi.services;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.Cart;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    public Book createNewBook(Book newBook){
        try {
            newBook = bookRepository.save(newBook);
            return newBook;

        } catch (Exception e) {
            return null;
        }
    }

    public ResponseEntity<?> deleteBook(Book book){
        try {
            Book existingBook = bookRepository.findBookByBookName(book.getBookName());
            if(existingBook!=null) {
                bookRepository.delete(existingBook);
                return new ResponseEntity<>(null, HttpStatus.OK);
            }
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_MODIFIED);
        }
    }

    public Book updateBookQuantity(Book book, Integer quantitySold){
        try{
            Book existingBook = bookRepository.findBookByBookName(book.getBookName());
            if(existingBook!=null)
            {
                existingBook.setAvailableQuantity(existingBook.getAvailableQuantity() - quantitySold);
                bookRepository.save(existingBook);
                return existingBook;
            }
            return null;
        } catch (Exception e){
            return null;
        }
    }

    public ResponseEntity<?> updateBook(Book book){
        try{
            Book existingBook = bookRepository.findBookByBookName(book.getBookName());
            if(existingBook!=null)
            {
                existingBook.setBookName(book.getBookName());
                existingBook.setAvailableQuantity(book.getAvailableQuantity());
                existingBook.setVersion(book.getVersion());
                existingBook.setPrice(book.getPrice());
                existingBook.setPublicationDate(book.getPublicationDate());
                bookRepository.save(existingBook);
                return new ResponseEntity<>(existingBook, HttpStatus.OK);
            }

            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        } catch (Exception e){
            return new ResponseEntity<>(e, HttpStatus.NOT_MODIFIED);
        }
    }
}
