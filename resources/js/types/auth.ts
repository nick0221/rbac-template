import type { Permission, Role } from './roles-permissions';

export type User = {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_confirmed_at: string | null;
    status: string;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    roles: Role[];
    permissions: Permission[];
    [key: string]: unknown;
};

export type Auth = {
    user: User;
    role: {
        name: string;
        id: number;
    };
    permissions: Permission[];
};

export type TwoFactorSetupData = {
    svg: string;
    url: string;
};

export type TwoFactorSecretKey = {
    secretKey: string;
};
