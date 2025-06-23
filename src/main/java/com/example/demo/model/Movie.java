package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity //specifica che questa classe è un entità nel database
@Table(name = "movie")
@Data   //crea da sologetter e setter  
@NoArgsConstructor  //crea costruttore vuoto
@AllArgsConstructor //crea costruttore con tutti gli argomenti
public class Movie{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 25, nullable = false)
    private String titolo;
    
    @Column(length=15)
    private String genere;

    @Column
    private boolean watched;

    @ManyToOne  //specifica relazione many-to-one: molti film per un utente
    @JoinColumn(name = "user_id",nullable=false)   //specifica foreign key
    private User user;  

}