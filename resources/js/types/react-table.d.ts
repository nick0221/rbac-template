import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface TableMeta {
        currentPage: number;
        perPage: number;
        canEdit?: boolean;
        canDelete?: boolean;
        onEditRole?: (role: TData) => void;
    }
}
