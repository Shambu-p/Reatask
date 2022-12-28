import PaginatedListInterface from "../../Application/Common/Interfaces/PaginatedListInterface";

export default class PaginatedList<T> implements PaginatedListInterface<T> {

    Items: Array<T>
    PageNumber: number
    PageSize: number
    TotalCount: number

    Create(list: Array<T>, pageNumber, pageSize): PaginatedList<T> {

        this.TotalCount = list.length;
        this.PageSize = pageSize;
        this.PageNumber = pageNumber;

        let startIndex = pageNumber * pageSize;
        let endIndex = startIndex + pageSize;

        if(startIndex < list.length && startIndex >= 0 && endIndex < list.length && endIndex > 0){
            this.Items = list.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize);
        } else {
            throw new Error("Incorrect pagination!");
        }

        return this;

    }

}