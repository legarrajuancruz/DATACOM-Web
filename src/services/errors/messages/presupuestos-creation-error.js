export const generatePresupuestosErrorInfo = (presupuesto) => {
  return `Una o mas propiedades fueron enviadas incompletas o no son validas
          Lista de propiedades:
              --> title: type Number, recibido: ${presupuesto.orden}
              --> price: type String, recibido: ${presupuesto.fecha}
              --> stock: type String, recibido: ${presupuesto.nombre}
          `;
};

export const eliminatePresupuestoErrorInfo = (_id) => {
  return `Una o mas propiedades fueron enviadas incompletas o no no coinciden con el _id
            Lista de propiedades del producto:
                      --> Object._id: type String, recibido: ${_id}
            `;
};

export const getPresupuestoByIdErrorInfo = (_id) => {
  return `Una o mas propiedades fueron enviadas incompletas o no no coinciden con el _id
              Lista de propiedades del presupuesto:
                      --> Object._id: type String, recibido: ${_id}
              `;
};
