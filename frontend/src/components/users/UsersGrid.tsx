import { AgGridReact } from "ag-grid-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/types/user";
import { TypographySmall, TypographyMuted } from "../base/Typography";
import { ColDef } from "ag-grid-community";
import { MessageCircle, UserPlus } from "lucide-react";
import { useMemo, useState } from "react";
import { PrimaryButton } from "@/components/base/Buttons";

interface UsersGridProps {
  users: User[];
  theme: any;
  onInvite?: (user: User) => void;
  onMessage?: (user: User) => void;
  onSelectionChanged?: (e: any) => void;
}

export function UsersGrid({
  users,
  theme,
  onInvite,
  onMessage,
  onSelectionChanged,
}: UsersGridProps) {
  const [columnDefs] = useState([
    {
      field: "name",
      headerName: "User",
      flex: 1,
      cellRenderer: (params: any) => {
        const user = params.data;
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback className="bg-blue-500">
                {user.name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <TypographySmall className="font-bold">
                {user.name}
              </TypographySmall>
              <TypographyMuted className="text-xs leading-tight m-0">
                @{user.username}
              </TypographyMuted>
            </div>
          </div>
        );
      },
      sortable: true,
      filter: true,
      headerClass: "ag-header-cell-left",
      cellClass: "ag-cell-left flex items-center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.5,
      cellClass: "ag-cell-left flex items-center",
      headerClass: "ag-header-cell-left",
      sortable: true,
      filter: true,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 1,
      cellRenderer: (params: any) => {
        const variant = params.value === "instructor" ? "default" : "secondary";
        return (
          <div className="flex items-center h-full">
            <Badge className="uppercase font-medium" variant={variant}>
              {params.value}
            </Badge>
          </div>
        );
      },
      cellClass: "ag-cell-left flex items-center",
      headerClass: "ag-header-cell-left",
      sortable: true,
      filter: true,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      cellRenderer: (params: any) => {
        const variant = params.value === "active" ? "outline" : "destructive";
        return (
          <div className="flex items-center h-full">
            <Badge className="uppercase font-medium" variant={variant}>
              {params.value}
            </Badge>
          </div>
        );
      },
      cellClass: "ag-cell-left flex items-center",
      headerClass: "ag-header-cell-left",
      sortable: true,
      filter: true,
    },
    {
      field: "createdAt",
      headerName: "Date Joined",
      flex: 1,
      cellClass: "ag-cell-left flex items-center",
      headerClass: "ag-header-cell-left",
      sortable: true,
      filter: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.8,
      sortable: false,
      filter: false,
      cellRenderer: (params: any) => {
        const user = params.data;
        return (
          <div className="flex items-center gap-2">
            <PrimaryButton
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                params.context.onInvite?.(user);
              }}
              className="h-8 w-8"
            >
              <UserPlus className="h-4 w-4" />
            </PrimaryButton>
            <PrimaryButton
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                params.context.onMessage?.(user);
              }}
              className="h-8 w-8"
            >
              <MessageCircle className="h-4 w-4" />
            </PrimaryButton>
          </div>
        );
      },
      cellClass: "ag-cell-left flex items-center",
      headerClass: "ag-header-cell-left",
    },
  ]);

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
    };
  }, []);

  const defaultColDef = useMemo(() => {
    return { filter: true };
  }, []);

  return (
    <div className="w-full h-full">
      <AgGridReact
        theme={theme}
        rowData={users}
        columnDefs={columnDefs as ColDef<User, any>[]}
        defaultColDef={defaultColDef}
        domLayout="normal"
        rowHeight={56}
        headerHeight={48}
        suppressCellFocus={true}
        rowSelection={rowSelection as any}
        onSelectionChanged={onSelectionChanged}
        onRowDoubleClicked={(params) => {
          const isSelected = params.node.isSelected();
          params.node.setSelected(!isSelected, false);
        }}
        context={{
          onInvite,
          onMessage,
        }}
      />
    </div>
  );
}
