export class APIfeatures {
    query: {
        skip: any
        limit: any
        sort: (event: string) => any
    };
    queryString: {
        page: number
        limit: number
    };

    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString
    }

    paginating() {
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
}