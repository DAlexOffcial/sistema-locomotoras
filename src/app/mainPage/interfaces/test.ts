// Generated by https://quicktype.io

export interface Ctalogos {
    Catalog: Catalog;
}

export interface Catalog {
    mantenedores: Mantenedore[];
}

export interface Mantenedore {
    id_mantenedor:       number;
    desc_mantenedor:     string;
    activo:              string;
    fecha_registro:      string;
    fecha_actualizacion: string;
    s:1
}

