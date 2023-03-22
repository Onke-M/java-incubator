package com.incubator.springapi.entities;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

@Entity
@Table(name = "Role")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Role implements Serializable {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "RoleID")
    private Integer roleId;

    @Column(name = "RoleDesc")
    private String roleDesc;

    public Role(String roleDesc) {
        this.roleDesc = roleDesc;
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, roleDesc);
    }
}
