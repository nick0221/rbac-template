import { useState } from 'react';

import { DataTable } from '@/components/datatables/DataTable';

import { pagesColumns } from '../datatable/pages-column';
import DialogEditPage from '../dialog/dialog-edit-page';

import type {
    Page,
    RolesPermissionsPageProps,
} from '@/types/roles-permissions';

interface TabContentPageProps {
    pages: RolesPermissionsPageProps['pages'];
}

export default function TabContentPage({ pages }: TabContentPageProps) {
    const [editPageOpen, setEditPageOpen] = useState(false);
    const [selectedPage, setSelectedPage] = useState<Page | null>(null);

    return (
        <>
            {/* Pages */}
            <DataTable
                data={pages.data}
                columns={pagesColumns}
                title="Pages"
                total={pages.total}
                onCreate={() => {}}
                meta={{
                    onEdit: (page: Page) => {
                        setSelectedPage(page);
                        setEditPageOpen(true);
                    },
                }}
                currentPage={pages.current_page}
                lastPage={pages.last_page}
                perPage={pages.per_page}
                filterKey="pages_search"
                defaultHiddenColumns={['created_at']}
            />

            {/* Edit Page */}
            {selectedPage && (
                <DialogEditPage
                    open={editPageOpen}
                    setOpen={setEditPageOpen}
                    page={selectedPage}
                />
            )}
        </>
    );
}
