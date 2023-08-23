import { Observable, map } from "rxjs";
import { IPaginatedResource, IPaginatedResourcePage } from "../models";

export class PaginationHelper {
  static isCurrentPage$<T>(page: Observable<IPaginatedResourcePage<T[]>>, currentPageNumber: number): Observable<boolean> {
    return page.pipe(map((p) => {
      return p.page === currentPageNumber
    }));
  }

  static getTotalItems$<T>(paginatedResource: Observable<IPaginatedResource<T[]> | null>) {
    return paginatedResource.pipe(map((resource) => {
      return resource?.totalItems;
    }));
  }

  static getPages$<T>(paginatedResource: Observable<IPaginatedResource<T[]> | null>) {
    return paginatedResource.pipe(map((resource) => {
      return resource?.pages || [];
    }))
  }

  static getPage$<T>(paginatedResource: Observable<IPaginatedResource<T[]> | null>, targetPage: number) {
    return paginatedResource.pipe(map((resource) => {
      return resource?.pages.find((p) => p.page === targetPage)
    }))
  }

  static paginate$<T>(arr$: Observable<T[] | null>, itemPerPage: number): Observable<IPaginatedResource<T[]> | null>  {
    return arr$.pipe(map((arr) => {
      if (arr === null) {
        return null;
      }

      if (arr.length < 1) {
        return {
          totalItems: arr.length,
          pages: []
        } as IPaginatedResource<T[]>;
      }

      const pageCount = Math.ceil(arr.length / itemPerPage);
      const pages: IPaginatedResourcePage<T[]>[] = [];

      for (let i = 0; i < pageCount; i++) {
        const startIndex = i * itemPerPage;
        const endIndex = startIndex + itemPerPage;
    
        const itemsInPage = arr.slice(startIndex, endIndex);
        const paginatedResource: IPaginatedResourcePage<T[]> = {
          page: i,
          nextPage: i + 1 > pageCount ? undefined : i + 1,
          previousPage: i - 1 < 1 ? undefined : i - 1,
          data: itemsInPage
        }
        
        pages.push(paginatedResource);
      }

      const paginatedResource: IPaginatedResource<T[]> = {
        totalItems: arr.length,
        pages: pages
      }

      return paginatedResource;
    }));
  }
}
