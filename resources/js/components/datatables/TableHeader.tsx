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
        <div className="flex items-center justify-between gap-2">
            <h1 className="text-2xl font-semibold">{title}</h1>

            <div className="flex items-center gap-2">
                <Input
                    className="h-8 w-[200px]"
                    placeholder="Search…"
                    value={value ?? ''}
                    onChange={(e) => setValue(e.target.value)}
                />

                {onCreate && (
                    <Button size="sm" onClick={onCreate}>
                        <UserPlus2 className="h-4 w-4" /> Register
                    </Button>
                )}
            </div>
        </div>
    );
}
