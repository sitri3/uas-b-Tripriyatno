import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BookService} from "./book.service";
import {Book} from "./book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[];
  errMesg: any;
  infoMsg : string;
  errorMsg : string;

  constructor(
    private bookService: BookService,
    private router : Router
  ) { }

  ngOnInit() {
    this.getBook();
  }

  getBook(){
    this.bookService.getBooks()
      .subscribe(
        book => this.books = book,
        error => this.errMesg = <any>error
      )
  }
  
  editBook(book: Book){
    let link = ['form/edit', book.id];
    this.router.navigate(link);
  }


  removeBook(book: Book) {
    this.bookService.deleteBook(book)
      .subscribe(
        () => this.removeBookFromList(book),
        error => console.log(error)
      );
  }

  private removeBookFromList(book: Book) {
      var index = this.books.indexOf(book, 0);

      if (index > -1) {
          this.books.splice(index, 1);
      }
  }
}
