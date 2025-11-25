export interface Departement {
  idDepartement: Key | null | undefined;
  id: number;
  nomDepartement: string;
  createAt: string;
  createBy: string;
  updateAt: string;
  updateBy: string;
  delect: boolean;
}

export interface DepartementDto {
  nomDepartement: string;
}
