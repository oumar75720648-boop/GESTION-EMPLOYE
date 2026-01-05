export interface Departement {
  idDepartement: null | undefined;
  id: number;
  nomDepartement: string;
  createAt: string;
  createBy: string;
  updateAt: string;
  updateBy: string;
  delect: boolean;
}

export interface DepartementDto {
  idDepartement: number; 
  nomDepartement: string;
}


export interface SpecialiteDto {
  idSpecialite: number;
  nomSpecialite: string;
}
