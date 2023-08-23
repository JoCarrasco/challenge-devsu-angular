import { Observable } from "rxjs";

export function awaitStream<T>(stream$: Observable<any>, skipTime?: number): T | null {
  let response = null;
  stream$.subscribe(data => {
    response = data;
  });
  if (skipTime) {
    /**
     * use jasmine clock to artificially manipulate time-based web apis like setTimeout and setInterval
     * we can easily refactor this and use async/await but that means that we will have to actually wait out the time needed for every delay/mock request
     */
    jasmine.clock().tick(skipTime);
  }

  return response;
}
