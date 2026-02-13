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
). sort({ puntos: -1 }) 

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

db.usuarios.find(
  {
    tags: "tag2",
    visitas: { $gt: 100 }},
  {
    _id: 0,
    nombre: 1,
    tags: 1,
    visitas:1,
  }
). sort({ vistas: -1 }) 

db.usuarios.find(
  {
    "preferencias.color": "azul",
    cantidad_amigos: { $gte: 1000, $lte: 2000 }
  },
  {
    _id: 0,
    nombre: 1,
    "preferencias.color": 1,
    cantidad_amigos: 1
  }
)