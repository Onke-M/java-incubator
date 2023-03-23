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
@CrossOrigin(origins ={"http://localhost:4200"}, methods={RequestMethod.GET, RequestMethod.POST})
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
}
