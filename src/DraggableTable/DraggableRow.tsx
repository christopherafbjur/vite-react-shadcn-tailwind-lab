import { useSortable } from "@dnd-kit/sortable";
import { flexRender, Row } from "@tanstack/react-table";
import { CSS } from "@dnd-kit/utilities";
import { TableCell, TableRow } from "@/components/ui/table";
import { Person } from "./makeData";
import { cn } from "@/lib/utils";

// Row Component
export const DraggableRow = ({ row }: { row: Row<Person> }) => {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.userId,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
    <TableRow
      ref={setNodeRef}
      style={style}
      className={cn("relative", {
        "opacity-80 z-10": isDragging,
        "opacity-100 z-0": !isDragging,
      })}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          key={cell.id}
          className="text-left"
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
};
