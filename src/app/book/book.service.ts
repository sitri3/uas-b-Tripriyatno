import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import {Observable} from "rxjs";
import {Book} from "./book";
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {
  bookUrl : string = 'http://localhost:8000/api/book';
  tokenUrl : string = 'http://localhost:8000/get-token';
  private booksUrl = 'http://localhost:8000/api/book';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private _http: Http) { }

  getBooks():Observable<Book[]>{
    let url = 'http://localhost:8000/api/book';
    return this._http.get(url)
      .map(res=> res.json())
      .catch(this.handleError)
  }

  getBook(id : any) : Observable<Book> {
      let url = this.bookUrl+'/'+id;
      return this._http.get(url)
          .map(res => <Book> res.json());
  }

  getToken() : Observable<string> {
      return this._http.get(this.tokenUrl)
          .map(response => <string> response.json());
  }

  storeData(author : string, bookname : string, description : string) : Observable<string> {
      let body = JSON.stringify({ author : author, bookname : bookname, description : description});
      let headers = new Headers({'content-type' : 'application/json'});
      let options = new RequestOptions({ headers: headers});

      return this._http.post(this.bookUrl, body, options)
          .map(res => (res.json()));
  }

  updateData(id : any, author : string, bookname : string, description : string) : Observable<string> {
      let body = JSON.stringify({ author : author, bookname : bookname, description : description});
      let headers = new Headers({'content-type' : 'application/json'});
      let options = new RequestOptions({ headers: headers});
      let url = this.bookUrl+'/'+id;

      return this._http.post(url, body, options)
          .map(res => (res.json()));
  }


  deleteBook(book: Book): Observable<any> {
      let updateUrl = `${this.booksUrl}/${book.id}`;
      return this._http.delete(updateUrl)
                      .map(this.success)
                      .catch(this.handleError);
  }

  private success(): Observable<any> {
      return Observable.create();
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
