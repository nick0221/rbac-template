import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

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

    return (
        <div className="max-h-[70vh] space-y-2 overflow-y-auto px-4">
            {Object.entries(grouped).map(([pageName, perms]) => (
                <CollapsibleCard
                    key={pageName}
                    pageName={pageName}
                    permissions={perms}
                />
            ))}
        </div>
    );
}

// Reusable single collapsible card
function CollapsibleCard({
    pageName,
    permissions,
}: {
    pageName: string;
    permissions: Permission[];
}) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className="rounded-xl border border-border shadow-sm">
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
