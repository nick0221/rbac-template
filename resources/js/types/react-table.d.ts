import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface TableMeta<TData> {
        currentPage: number;
        perPage: number;
        canEdit?: boolean;
        canDelete?: boolean;
    }
}
