import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../ui/button';
import { Input } from '../ui/input';

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
    const [collapsedPages, setCollapsedPages] = useState<
        Record<string, boolean>
    >({});

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
        if (pageName.toLowerCase().includes(search.toLowerCase())) {
            acc[pageName] = perms;
            return acc;
        }
        const matchingPerms = perms.filter((p) =>
            p.name.toLowerCase().includes(search.toLowerCase()),
        );
        if (matchingPerms.length > 0) {
            acc[pageName] = matchingPerms;
        }
        return acc;
    }, {});

    const collapseAll = () => {
        const newState: Record<string, boolean> = {};
        Object.keys(filteredGrouped).forEach((page) => {
            newState[page] = true;
        });
        setCollapsedPages(newState);
    };

    const expandAll = () => {
        const newState: Record<string, boolean> = {};
        Object.keys(filteredGrouped).forEach((page) => {
            newState[page] = false;
        });
        setCollapsedPages(newState);
    };

    return (
        <div className="max-h-[70vh] space-y-2 overflow-y-auto px-4">
            {/* Search + Collapse/Expand All */}
            <div className="flex flex-col gap-4 py-2">
                {/* Search Input */}
                <div className="relative w-full">
                    <Search
                        className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                        size={16}
                    />
                    <Input
                        placeholder="Search pages or permissions..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-8"
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2">
                    <Button size="xs" variant="link" onClick={collapseAll}>
                        Collapse All
                    </Button>
                    <Button size="xs" variant="link" onClick={expandAll}>
                        Expand All
                    </Button>
                </div>
            </div>

            {Object.entries(filteredGrouped).length > 0 ? (
                Object.entries(filteredGrouped).map(([pageName, perms]) => (
                    <CollapsibleCard
                        key={pageName}
                        pageName={pageName}
                        permissions={perms}
                        collapsed={collapsedPages[pageName] ?? false}
                        onToggleCollapse={(val) =>
                            setCollapsedPages((prev) => ({
                                ...prev,
                                [pageName]: val,
                            }))
                        }
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
    collapsed: boolean; // fully controlled
    onToggleCollapse?: (collapsed: boolean) => void;
}

function CollapsibleCard({
    pageName,
    permissions,
    collapsed,
    onToggleCollapse,
}: CollapsibleCardProps) {
    const isOpen = !collapsed;

    return (
        <div className="mb-3 rounded-xl border border-border shadow-sm">
            <button
                type="button"
                onClick={() => onToggleCollapse?.(!collapsed)}
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
