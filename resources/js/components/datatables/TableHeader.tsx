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
    actions?: React.ReactNode;
}

export default function TableHeader({
    title,
    onCreate,
    hideFilter,
    createButtonIcon,
    createButtonLabel = 'Create',
    filterKey = 'search',
    actions,
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
        <div className="flex flex-col gap-2 sm:justify-between">
            {/* On mobile, aligned the title and create button */}
            <h1 className="sm:text-1xl flex w-full flex-row text-2xl font-semibold">
                {title}
            </h1>

            {/* On desktop, show the search and create button */}
            <div className="flex items-start justify-end gap-3">
                <div className="flex items-center">
                    {hideFilter ?? (
                        <Input
                            id="live-search-textbox"
                            className="h-8 w-full sm:w-50"
                            placeholder="Search…"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    )}
                </div>
                <div className="flex flex-row items-center gap-1">
                    {onCreate && (
                        <>
                            {/* Show on desktop mode */}
                            <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={onCreate}
                                className="hidden sm:inline-flex"
                            >
                                {(Icon && <Icon className="h-4 w-4" />) || (
                                    <Plus className="h-4 w-4" />
                                )}
                                {createButtonLabel}
                            </Button>
                            {/* ------------------- */}

                            {/* Hide on mobile mode */}
                            <Button
                                variant="outline"
                                size="icon-sm"
                                onClick={onCreate}
                                className="inline-flex sm:hidden"
                            >
                                {(Icon && <Icon className="h-4 w-4" />) || (
                                    <Plus className="h-4 w-4" />
                                )}
                                {createButtonLabel}
                            </Button>
                            {/* ------------------- */}
                        </>
                    )}

                    {/* Column visibility */}
                    {actions}
                </div>
            </div>
        </div>
    );
}
