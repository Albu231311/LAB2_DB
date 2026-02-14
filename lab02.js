//1.1
db.usuarios.drop();

function randomString(length) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

// Lista de colores reales
var colores = [
  "rojo", "azul", "verde", "amarillo", "morado",
  "naranja", "rosado", "negro", "blanco", "gris",
  "celeste", "turquesa", "dorado", "plateado", "café"
];

function randomColor() {
  return colores[Math.floor(Math.random() * colores.length)];
}

print("Insertando 100,000 usuarios...");

var batch = [];
var batchSize = 1000;

for (var i = 1; i <= 100000; i++) {

  var misCompras = [];
  var numCompras = Math.floor(Math.random() * 5) + 1;

  for (var c = 0; c < numCompras; c++) {
    misCompras.push({
      producto: Math.random() > 0.3 
        ? "Producto 1" 
        : "Producto " + randomString(3),
      fecha: randomDate(new Date(2024, 0, 1), new Date())
    });
  }

  var misTags = ["tag1", "general"];
  if (Math.random() > 0.4) {
    misTags.push("tag2");
  }

  var numAmigos = Math.random() > 0.9
    ? Math.floor(Math.random() * 1000) + 1001
    : Math.floor(Math.random() * 500);

  batch.push({
    nombre: "Usuario " + i,
    email: "user" + i + "@uvg.edu.gt",
    fecha_registro: randomDate(new Date(2020, 0, 1), new Date()),
    puntos: Math.floor(Math.random() * 1000),
    historial_compras: misCompras,
    direccion: {
      calle: "Calle " + randomString(10),
      ciudad: "Guatemala",
      codigo_postal: Math.floor(Math.random() * 90000),
    },
    tags: misTags,
    activo: Math.random() > 0.5,
    notas: "Nota generada: " + randomString(10),
    visitas: Math.floor(Math.random() * 200),
    cantidad_amigos: numAmigos,
    preferencias: {
      color: randomColor(),  
      idioma: "es",
      tema: Math.random() > 0.5 ? "dark" : "light",
    },
  });

  if (batch.length === batchSize) {
    db.usuarios.insertMany(batch);
    batch = [];
  }
}

if (batch.length > 0) {
  db.usuarios.insertMany(batch);
}

print("Proceso terminado.");
print("Total insertados:", db.usuarios.countDocuments());


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

db.usuarios.createIndex(
  {"activo" : 1, "puntos": 1}
)

db.usuarios.createIndex(
  {"historial_compras.producto": 1, "historial_compras.fecha": 1}
)

db.usuarios.createIndex(
  {"tags" : 1, "visitas": 1}
)

db.usuarios.createIndex(
  {"preferencias.color": 1, "cantidad_amigos": 1}
)

//1.5
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

//1.6
//Script para añadir 50,000 usuarios más
function randomString(length) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

var colores = [
  "rojo", "azul", "verde", "amarillo", "morado",
  "naranja", "rosado", "negro", "blanco", "gris",
  "celeste", "turquesa", "dorado", "plateado", "café"
];

function randomColor() {
  return colores[Math.floor(Math.random() * colores.length)];
}

print("Insertando 50,000 usuarios adicionales...");

var batch = [];
var batchSize = 1000;

// Obtener cantidad actual
var inicio = db.usuarios.countDocuments() + 1;
var fin = inicio + 49999;

for (var i = inicio; i <= fin; i++) {

  var misCompras = [];
  var numCompras = Math.floor(Math.random() * 5) + 1;

  for (var c = 0; c < numCompras; c++) {
    misCompras.push({
      producto: Math.random() > 0.3 
        ? "Producto 1" 
        : "Producto " + randomString(3),
      fecha: randomDate(new Date(2024, 0, 1), new Date())
    });
  }

  var misTags = ["tag1", "general"];
  if (Math.random() > 0.4) {
    misTags.push("tag2");
  }

  var numAmigos = Math.random() > 0.9
    ? Math.floor(Math.random() * 1000) + 1001
    : Math.floor(Math.random() * 500);

  batch.push({
    nombre: "Usuario " + i,
    email: "user" + i + "@uvg.edu.gt",
    fecha_registro: randomDate(new Date(2020, 0, 1), new Date()),
    puntos: Math.floor(Math.random() * 1000),
    historial_compras: misCompras,
    direccion: {
      calle: "Calle " + randomString(10),
      ciudad: "Guatemala",
      codigo_postal: Math.floor(Math.random() * 90000),
    },
    tags: misTags,
    activo: Math.random() > 0.5,
    notas: "Nota generada: " + randomString(10),
    visitas: Math.floor(Math.random() * 200),
    cantidad_amigos: numAmigos,
    preferencias: {
      color: randomColor(),
      idioma: "es",
      tema: Math.random() > 0.5 ? "dark" : "light",
    },
  });

  if (batch.length === batchSize) {
    db.usuarios.insertMany(batch);
    batch = [];
  }
}

if (batch.length > 0) {
  db.usuarios.insertMany(batch);
}

print("Proceso terminado.");
print("Total actual:", db.usuarios.countDocuments());


//1.7
db.usuarios.explain("executionStats").find({
  activo: true,
  puntos: { $gt: 500 },
  visitas: { $gte: 100 },
  tags: { $size: 3 }
});

//2.1
use lab02

(db.getCollectionIndos())
//2.2a
db.vehiculos.updateMany(
  {"Id-del-Coche": {$exists: true}},
  { $rename: {"Id-del-Coche": "id"}}
)

db.vehiculos.updateMany(
  {"Marca-del-Coche": {$exists: true}},
  { $rename: {"Marca-del-Coche": "brand"}}
)

db.vehiculos.updateMany(
  {"Precio-del-Coche": {$exists: true}},
  { $rename: {"Precio-del-Coche": "price"}}
)

db.vehiculos.updateMany(
  {"Precio-del-Coche": {$exists: true}},
  { $rename: {"Precio-del-Coche": "price"}}
)

db.vehiculos.updateMany(
  {"Modelo-del-Coche": {$exists: true}},
  { $rename: {"Modelo-del-Coche": "model"}}
)
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
