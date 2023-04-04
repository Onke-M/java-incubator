package com.incubator.springapi.repositories;

import com.incubator.springapi.entities.Book;
import com.incubator.springapi.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book,Integer> {

    public Book findBookByBookName(String bookName);
    public Book findByBookID(Integer bookID);
}
