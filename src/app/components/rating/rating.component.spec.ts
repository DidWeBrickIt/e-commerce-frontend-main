import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StarRatingPipe } from 'src/app/pipes/star-rating.pipe';
import { RatingComponent } from './rating.component';

describe('RatingComponent', () => {
  let component: RatingComponent;
  let fixture: ComponentFixture<RatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RatingComponent, StarRatingPipe]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit', () => {
    const component = fixture.componentInstance;
    spyOn(component.ratingUpdated, 'emit');
    component.setRating(5);
    expect(component.ratingUpdated.emit).toHaveBeenCalledOnceWith(5);
  });
});
