package com.incubator.springapi.services;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.interfaces.IBookService;
import com.incubator.springapi.repositories.BookRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.interceptor.TransactionAspectSupport;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService implements IBookService {
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
    @Transactional
    public void createNewBook(Book newBook){
        try {
            newBook = bookRepository.save(newBook);
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }
    @Transactional
    public void deleteBook(Integer bookID){
        try {
            Book existingBook = bookRepository.findByBookID(bookID);
            if(existingBook!=null) {
                bookRepository.delete(existingBook);
            }
        } catch (Exception e) {
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }
    @Transactional
    public void updateBookQuantity(Book book, Integer quantitySold){
        try{
            Book existingBook = bookRepository.findByBookID(book.getBookID());
            if(existingBook!=null)
            {
                existingBook.setAvailableQuantity(existingBook.getAvailableQuantity() - quantitySold);
                bookRepository.save(existingBook);
            }
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }
    @Transactional
    public void updateBook(Book book){
        try{
            Book existingBook = bookRepository.findByBookID(book.getBookID());
            if(existingBook!=null)
            {
                existingBook.setBookName(book.getBookName());
                existingBook.setAvailableQuantity(book.getAvailableQuantity());
                existingBook.setVersion(book.getVersion());
                existingBook.setPrice(book.getPrice());
                existingBook.setPublicationDate(book.getPublicationDate());
                bookRepository.save(existingBook);
            }
        } catch (Exception e){
            TransactionAspectSupport.currentTransactionStatus().setRollbackOnly();
        }
    }
}
