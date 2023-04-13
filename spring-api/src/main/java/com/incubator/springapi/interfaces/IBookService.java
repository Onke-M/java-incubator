package com.incubator.springapi.interfaces;

import com.incubator.springapi.entities.Book;

import java.util.List;

public interface IBookService {
    public List<Book> getAllBooks();
    public void createNewBook(Book newBook);
    public void deleteBook(Integer bookID);
    public void updateBookQuantity(Book book, Integer quantitySold);
    public void updateBook(Book book);
}
