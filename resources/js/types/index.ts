export type * from './auth';
export type * from './navigation';
export type * from './ui';

import type { Auth } from './auth';

export type SharedData = {
    name: string;
    auth: Auth;
    flash?: {
        success?: string;
        error?: string;
        warning?: string;
        info?: string;
    };
    sidebarOpen: boolean;
    [key: string]: unknown;
};
