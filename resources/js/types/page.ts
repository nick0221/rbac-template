export interface AuthUser {
    id: number;
    name: string;
    email: string;
}

export interface PageProps {
    auth: {
        user: AuthUser | null;
    };
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    [key: string]: unknown;
}
