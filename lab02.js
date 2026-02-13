//sección 1.2
db.usuarios.find(
  {
    activo: true,
    puntos: { $gt: 500 }},
  {
    _id: 0,
    nombre: 1,
    activo: 1,
    puntos:1,
  }
). sort({ puntos: -1 }) //el -1 es de mayor a menor, descendente

db.usuarios.find(
  {
    "historial_compras.producto": "Producto 1"
  },
  {
    _id: 0,
    nombre: 1,
    "historial_compras.producto": 1,
  }
)