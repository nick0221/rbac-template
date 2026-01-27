import '@tanstack/react-table';

declare module '@tanstack/react-table' {
    interface TableMeta {
        currentPage: number;
        perPage: number;
        canEdit?: boolean;
        canDelete?: boolean;
        onEdit?: (role: TData) => void;
        onPermit?: (role: TData) => void;
        onDelete?: (role: TData) => void;
    }
}
