package com.incubator.springapi.controllers;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.User;
import com.incubator.springapi.repositories.BookRepository;
import com.incubator.springapi.repositories.UserRepository;
import com.incubator.springapi.services.BookService;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/books")
@CrossOrigin(origins ={"http://localhost:4200"}, methods={RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class BookController {
    private BookService bookService;
    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping()
//    @Secured({"ROLE_ADMIN"})
    public ResponseEntity<List<Book>> getAllBooks() {
        LOGGER.info("Fetching all Books");
        List<Book> books = bookService.getAllBooks();

        if (!books.isEmpty()) {
            LOGGER.trace("Found books");
            return new ResponseEntity<>(books, HttpStatus.OK);
        }

        LOGGER.info("No books could be found");
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book newBook){
        try {
            bookService.createNewBook(newBook);
            log.info("Book: {} was created successfully", newBook.getBookName());
            return new ResponseEntity<>(newBook, HttpStatus.OK);

        } catch (Exception e) {
            log.warn("Book: {} failed to create", newBook.getBookName());
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @PutMapping
    public ResponseEntity<Book> updateBook(@RequestBody Book updateBook){
        try {
            bookService.updateBook(updateBook);
            log.info("Book: {} was updated successfully", updateBook);
            return new ResponseEntity<>(updateBook, HttpStatus.OK);

        } catch (Exception e) {
            log.warn("Book: {} failed to update", updateBook.getBookName());
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

    @DeleteMapping
    public ResponseEntity<Book> deleteBook(@RequestBody Book book){
        try {
            bookService.deleteBook(book);
            log.info("Book: {} was deleted successfully", book.getBookName());
            return new ResponseEntity<>(HttpStatus.OK);

        } catch (Exception e) {
            log.warn("Book: {} failed to delete", book.getBookName());
            return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);
        }
    }

}
