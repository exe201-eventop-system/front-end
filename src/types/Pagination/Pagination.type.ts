export class Pagination {
    page_number: number = 1;
    page_size: number = 12;
    constructor(data: Partial<Pagination>) {
        Object.assign(this, data);
    }
}