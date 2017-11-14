export class Usuario {
    idUsuario = 0;
    nombre = '';
    apellido = '';
    telefono = '';
    correo = '';
    contrasenia = '';
    poblacion?: Poblacion;
}

export class Pais {
    idPais = 0;
    nombre = '';
    estadoRegionList?: EstadoRegion[];
}

export class EstadoRegion {
    idEstadoRegion = 0;
    nombre = '';
    pais?: Pais;
    poblacionList?: Poblacion[];
}

export class Poblacion {
    idPoblacion = 0;
    nombre = '';
    estadoRegion?: EstadoRegion;
}

export class Categoria {
    idCategoria = 0;
    nombre = '';
    subCategoriaLista?: SubCategoriaSimple[];
    numeroMensajes = 0;
}

export class SubCategoriaSimple {
    idSubCategoria = 0;
    nombre = '';
    numeroMensajes = 0;
}

export class SubCategoria {
    idSubCategoria = 0;
    nombre = '';
    categoria: Categoria;
}

export class Imagen {
    idImagen = 0;
    imagen = '';
}

export class Mensaje {
    idMensaje = 0;
    creacion = '';
    contenido = '';
    subCategoria: SubCategoriaSimple;
    usuario: Usuario;
    imagen?: Imagen[];
}

export class RespuestaFiltro {
    idCategoria = 0;
    idSubCategoria = 0;
    idEstadoRegion = 0;
    idPoblacion = 0;
    cancelar = 0;
}