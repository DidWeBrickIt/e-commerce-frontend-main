import { StarRatingPipe } from "./star-rating.pipe";




describe('StarRatingPipe', () => {
  const star: string = "assets/images/Star.png";
  const outline: string = "assets/images/Star_Outline.png"
  const halfStar: string = "assets/images/Half_Star.png"
  it('create an instance', () => {
    const pipe = new StarRatingPipe();
    expect(pipe).toBeTruthy();
  });

  it ('should return halfstar', () => {
    const pipe = new StarRatingPipe();
 
    expect(pipe.transform(2)).toBe(halfStar);
  });
  
  it('should return outline', () => {
    const pipe = new StarRatingPipe();
    expect(pipe.transform(0)).toBe(outline);
  });
  it('should return star', () => {
    const pipe = new StarRatingPipe();
    expect(pipe.transform(1)).toBe(star);
  });
});
