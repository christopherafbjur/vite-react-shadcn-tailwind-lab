import { ColumnDef } from "@tanstack/react-table";
import { RowDragHandleCell } from "./RowDragHandleCell";
import { Person } from "./makeData";

export const draggableTableColumns: ColumnDef<Person>[] = [
  {
    id: "drag-handle",
    cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
    size: 60,
  },
  {
    accessorKey: "firstName",
    cell: (info) => info.getValue(),
    header: () => <span>First Name</span>,
  },
  {
    accessorFn: (row) => row.lastName,
    id: "lastName",
    cell: (info) => info.getValue(),
    header: () => <span>Last Name</span>,
  },
  {
    accessorKey: "age",
    header: () => "Age",
  },
  {
    accessorKey: "visits",
    header: () => <span>Visits</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "progress",
    header: "Profile Progress",
  },
];
