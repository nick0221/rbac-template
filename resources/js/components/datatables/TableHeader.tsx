import { router } from '@inertiajs/react';
import { Plus, type LucideIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TableHeaderProps {
    title: string;
    onCreate?: () => void;
    hideFilter?: boolean;
    createButtonLabel?: string | null;
    createButtonIcon?: LucideIcon | null;
    filterKey?: string;
}

export default function TableHeader({
    title,
    onCreate,
    hideFilter,
    createButtonIcon,
    createButtonLabel = 'Create',
    filterKey = 'search',
}: TableHeaderProps) {
    //  initialize from URL
    const [value, setValue] = useState(
        new URLSearchParams(window.location.search).get(filterKey) ?? '',
    );

    const isFirstRender = useRef(true);
    const Icon = createButtonIcon;

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeout = setTimeout(() => {
            router.get(
                window.location.pathname,
                value ? { [filterKey]: value, page: 1 } : { page: 1 },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [value, filterKey]);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* On mobile, aligned the title and create button */}
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold sm:text-2xl">{title}</h1>
                {onCreate && (
                    <Button
                        size="sm"
                        onClick={onCreate}
                        className="inline-flex sm:hidden"
                    >
                        {(Icon && <Icon className="h-4 w-4" />) || (
                            <Plus className="h-4 w-4" />
                        )}
                        {createButtonLabel}
                    </Button>
                )}
            </div>

            {/* On desktop, show the search and create button */}
            <div className="flex w-full flex-col gap-2 py-2 sm:w-auto sm:flex-row sm:items-center">
                {hideFilter ?? (
                    <Input
                        id="live-search-textbox"
                        className="h-8 w-full sm:w-[200px]"
                        placeholder="Search…"
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                )}

                {onCreate && (
                    <Button
                        size="sm"
                        onClick={onCreate}
                        className="hidden sm:inline-flex"
                    >
                        {(Icon && <Icon className="h-4 w-4" />) || (
                            <Plus className="h-4 w-4" />
                        )}
                        {createButtonLabel}
                    </Button>
                )}
            </div>
        </div>
    );
}
