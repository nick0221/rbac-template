export interface Role {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
}

export interface Permission {
    id: number;
    name: string;
    created_at: string;
    page: {
        name: string;
    };
    roles: Role[];
}

export interface PaginationLinks {
    active: boolean;
    label: string;
    url: string;
    page: number;
}

export interface RolesPermissionsPageProps {
    roles: {
        data: Role[];
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        path: string;
        link: PaginationLinks[];
        first_page_url: string;
        next_page_url: string;
        last_page_url: string;
        prev_page_url: string;
    };
    permissions: {
        data: Permission[];
        total: number;
        current_page: number;
        last_page: number;
        per_page: number;
        from: number;
        to: number;
        path: string;
        link: PaginationLinks[];
        first_page_url: string;
        next_page_url: string;
        last_page_url: string;
        prev_page_url: string;
    };
    filters: {
        search: string;
        permissions_search?: string;
        roles_search?: string;
    };
}
