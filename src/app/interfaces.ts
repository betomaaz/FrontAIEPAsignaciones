
export interface userToken{
    ok:boolean,
    token:string
}

export interface User{
    USR_CORREO?:string,
    USR_CONTRASENA?:string
}

export interface userResponse {
    ok: boolean,
    usuario: usuario[]
}

export interface usuario {
    USR_ID: string,
    USR_NOMBRES: string,
    USR_AP_PATERNO: string,
    USR_CORREO: string,
    USR_RUT: string,
    ROL_NOMBRE: string
}

export interface actividad {
    ACT_ID: number,
    USR_NOMBRES: string,
    USR_AP_PATERNO: string,
    COM_NOMBRE: string
}