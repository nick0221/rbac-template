import type { Role } from './roles-permissions';

export interface User {
    id: number;
    name: string;
    email: string;
    created_at: string;
    roles: Role[];
}

export interface PaginationLinks {
    active: boolean;
    label: string;
    url: string;
    page: number;
}

export interface UsersIndexPageProps {
    users: {
        data: User[];
        total: number;
        per_page: number;
        current_page: number;
        first_page: number;
        last_page: number;
        from: number;
        to: number;
        path: string;
        link: PaginationLinks[];
        first_page_url: string;
        next_page_url: string;
        last_page_url: string;
        prev_page_url: string;
    };
    allRoles: Role[];
    filters: {
        search?: string;
    };
    flash: {
        success?: string;
        error?: string;
    };
}
