export type ApiHealthResponse = {
    status: 'ok';
    timestamp: string;
    service: string;
};
export type PaginatedResponse<T> = {
    data: T[];
    meta: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
};
export type ApiErrorResponse = {
    statusCode: number;
    message: string;
    error?: string;
};
//# sourceMappingURL=index.d.ts.map