"use client";

import * as React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Employee {
  nom: string;
  prenom: string;
  contact: string;
  email: string;
  departement: string;
  specialite: string;
}

interface DataTableProps {
  data?: Employee[];
  readonly?: boolean;
}

export function DataTable({ data = [], readonly = true }: DataTableProps) {

  return (
    <div className="flex flex-col gap-4">
    
      <div className="flex justify-between items-center mb-2">
        <Input
          placeholder="Rechercher..."
          className="w-64 h-8"
          disabled={readonly}
        />
      </div>

  
    </div>
  );
}
