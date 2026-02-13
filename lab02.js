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

//sección 1.3
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
). sort({ puntos: -1 }).explain("executionStats")

db.usuarios.find(
  {
    "historial_compras.producto": "Producto 1"
  },
  {
    _id: 0,
    nombre: 1,
    "historial_compras.producto": 1,
  }
).explain("executionStats")

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
). sort({ vistas: -1 }).explain("executionStats")

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
).explain("executionStats")

//1.4

//1.5

//1.6

//1.7

//2.1

//2.2a

//2.2b
db.vehiculos.updateMany(
  {},
  [
    {
      $set: {
        price: {
          $toDouble: {
            $substrCP: ["$price", 1, { $strLenCP: "$price" }]
          }
        }
      }
    }
  ]
)

db.vehiculos.aggregate([
  { $project: { price: 1, tipo: { $type: "$price" } } }
])

db.vehiculos.aggregate([
  {
    $group: {
      _id: {
        brand: "$brand",
        year: "$year"
      },
      cantidad_modelos: { $sum: 1 },
      precio_promedio: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      brand: "$_id.brand",
      year: "$_id.year",
      cantidad_modelos: 1,
      precio_promedio: { $round: ["$precio_promedio", 2] }
    }
  },
  {
    $sort: { brand: 1, year: 1 }
  }
]);

//2.2c
db.carros.aggregate([
  {
    $match: {
      year: { $gte: 1990, $lte: 1999 }
    }
  },
  {
    $sort: { price: -1 }
  },
  {
    $limit: 20
  },
  {
    $project: {
      _id: 0,
      brand: 1,
      model: 1,
      year: 1,
      price: 1
    }
  }
])
