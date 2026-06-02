export type Department = {
    id: string;
    name: string;
    code: string;
    faculty: string;
}

export type CreateDepartmentInput = {
    name: string;
    code: string;
    faculty: string;
}

export type UpdateDepartmentInput = {
    name?: string;
    code?: string;
    faculty?: string;
}