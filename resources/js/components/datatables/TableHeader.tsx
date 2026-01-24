import { router } from '@inertiajs/react';
import { UserPlus2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface TableHeaderProps {
    title: string;
    search?: string;
    onCreate?: () => void;
}

export default function TableHeader({
    title,
    search = '',
    onCreate,
}: TableHeaderProps) {
    const [value, setValue] = useState(search);

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            router.get(
                window.location.pathname,
                { search: value, page: 1 },
                { preserveState: true, preserveScroll: true },
            );
        }, 400);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* Title */}
            <h1 className="text-lg font-semibold sm:text-2xl">{title}</h1>

            {/* Actions */}
            <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center">
                {/* Search */}
                <Input
                    className="h-8 w-full sm:w-[200px]"
                    placeholder="Search…"
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                />

                {/* Create button */}
                {onCreate && (
                    <Button
                        size="sm"
                        onClick={onCreate}
                        className="w-full sm:w-auto"
                    >
                        <UserPlus2 className="mr-1 h-4 w-4" />
                        Register
                    </Button>
                )}
            </div>
        </div>
    );
}
