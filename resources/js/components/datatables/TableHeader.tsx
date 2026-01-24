import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import type { FC } from 'react';

interface TableHeaderProps {
    title: string;
    search?: string;
    onSearch?: (value: string) => void;
    onCreate?: () => void;
}

const TableHeader: FC<TableHeaderProps> = ({
    title,
    search,
    onSearch,
    onCreate,
}) => {
    return (
        <div className="flex items-center justify-between py-4">
            <h2 className="text-lg font-bold">{title}</h2>
            <div className="flex gap-2">
                {onSearch && (
                    <Input
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => onSearch(e.target.value)}
                    />
                )}
                {onCreate && (
                    <Button onClick={onCreate} size={'sm'}>
                        Create
                    </Button>
                )}
            </div>
        </div>
    );
};

export default TableHeader;
