import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';

import { Book } from './book';
import { BookService } from './book.service';


@Component({
    selector: 'form-component',
    templateUrl: './form.component.html'
})

export class FormComponent implements OnInit{
    formtitle : String = '';
    book : Book;
    action : String;
    errorMsg : String;
    infoMsg : String;
    selectedId : number;
    formBook: Book;
    books: Book[];

    constructor(
       private activeRoute : ActivatedRoute,
       private location : Location,
       private bookService : BookService
    ){ }

    ngOnInit(){
        this.activeRoute.params.forEach((param : Params) => {
            let act = param['act'];
            if(act == 'add'){
                this.formtitle = 'Tambah Data Buku';
                this.action = 'add';
            }else{
                let id = param['id'];

                this.selectedId = id;
                this.formtitle = 'Edit Data Buku';
                this.action = 'edit';
            }
        });

        if(this.action == 'edit') {
            this.getData(this.selectedId);
        }
    }

    getData(id : number) : void{
        this.bookService.getBook(id)
            .subscribe(
                books => this.book = books,
                error => console.log(error)
            );
    }

    goBack() : void{
        this.location.back();
    }

    addBook(author : string, bookname : string, description : string) : void{
        author = author.trim();
        bookname = bookname.trim();;
        description = description.trim();

        if(!author || !bookname || !description){
            this.errorMsg = 'Ada field yang belum terisi!';
            return;
        }

        this.bookService.storeData(author, bookname, description)
            .subscribe(
                res => {
                    this.location.back();
                });
    }

    editBook() : void{
        let author = this.book.author;
        let bookname = this.book.bookname;
        let description = this.book.description;
        let id = this.book.id;

        if(!author || !bookname || !description){
            this.errorMsg = 'Ada field yang belum terisi!';
            return;
        }

        this.bookService.updateData(id, author, bookname, description)
            .subscribe(
                res => {
                    this.location.back();
                });
    }
}