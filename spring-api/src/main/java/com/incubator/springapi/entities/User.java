package com.incubator.springapi.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "[User]", schema = "dbo")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class User implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "UserID")
    private Integer userID;

    @Basic
    @Column(name = "Username")
    private String username;

    @Basic
    @Column(name = "Email")
    private String email;

    @Basic
    @Column(name = "Password")
    private String password;

    @Basic
    @Column(name = "DateOfBirth")
    @JsonFormat(pattern="yyyy-MM-dd")
    private String dateOfBirth;

    @Basic
    @OneToOne
    @JoinColumn(name = "RoleID")
    private Role role;

    public User(String username, String email, String password, String dateOfBirth, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.role = role;
    }
}
