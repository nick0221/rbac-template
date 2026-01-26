import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';

import { Input } from '../ui/input'; // replace with your Input component

interface Permission {
    id: number;
    name: string;
    page: {
        name: string;
    };
}

interface CollapsiblePermissionsProps {
    permissions: Permission[];
}

export default function CollapsiblePermissions({
    permissions,
}: CollapsiblePermissionsProps) {
    const [search, setSearch] = useState('');

    // Group permissions by page.name
    const grouped = permissions.reduce<Record<string, Permission[]>>(
        (acc, perm) => {
            const pageName = perm.page.name;
            if (!acc[pageName]) acc[pageName] = [];
            acc[pageName].push(perm);
            return acc;
        },
        {},
    );

    // Filter pages and permissions based on global search
    const filteredGrouped = Object.entries(grouped).reduce<
        Record<string, Permission[]>
    >((acc, [pageName, perms]) => {
        // Keep page if pageName matches search
        if (pageName.toLowerCase().includes(search.toLowerCase())) {
            acc[pageName] = perms;
            return acc;
        }

        // Otherwise, keep only permissions that match search
        const matchingPerms = perms.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
        if (matchingPerms.length > 0) {
            acc[pageName] = matchingPerms;
        }

        return acc;
    }, {});

    return (
        <div className="max-h-[70vh] space-y-2 overflow-y-auto px-4">
            {/* Global Search */}
            <div className="relative mb-2 py-3">
                <Search
                    className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                    size={16}
                />
                <Input
                    placeholder="Search pages or permissions..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-8"
                />
            </div>

            {Object.entries(filteredGrouped).length > 0 ? (
                Object.entries(filteredGrouped).map(([pageName, perms]) => (
                    <CollapsibleCard
                        key={pageName}
                        pageName={pageName}
                        permissions={perms}
                    />
                ))
            ) : (
                <p className="text-sm text-muted-foreground">
                    No pages or permissions match your search.
                </p>
            )}
        </div>
    );
}

interface CollapsibleCardProps {
    pageName: string;
    permissions: Permission[];
}

function CollapsibleCard({ pageName, permissions }: CollapsibleCardProps) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="rounded-xl border border-border shadow-sm">
            {/* Header */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-t-xl bg-gray-100 px-4 py-2 transition hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
                <span className="font-semibold">{pageName}</span>
                {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {isOpen && (
                <div className="flex flex-wrap gap-2 p-4">
                    {permissions.map((perm) => (
                        <span
                            key={perm.id}
                            className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                        >
                            {perm.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
