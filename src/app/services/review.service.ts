import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReadableReview } from '../models/readable-review';
import { environment } from 'src/environments/environment';
import { Review } from '../models/review';
import { env } from 'process';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http: HttpClient) { }

  reviewUrl :string = "/reviews";

  registerProductReview(review : Review) : Observable<Review>
  {
    const payload = JSON.stringify(review);
    return this.http.post<Review>(`${environment.baseUrl}${this.reviewUrl}/register`, payload, {headers: environment.headers, withCredentials: environment.withCredentials})
  }

  getReviewsForProduct(id :number) : Observable<ReadableReview[]>
  {
    return this.http.get<ReadableReview[]>(`${environment.baseUrl}${this.reviewUrl}/${id}`, {headers: environment.headers, withCredentials: environment.withCredentials});
  }
}
