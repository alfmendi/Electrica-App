# Electrica App

Aplicación que permite gestionar los clientes de una hipotética compañía eléctrica. Permite la creación, consulta, modificación y eliminación de dichos clientes, así como de los datos de consumos y facturas asociados a cada uno de elllos. Toda la información relativa a cada cliente se almacena de forma permanente en una base de datos. La gestión de la información de los clientes se lleva a cabo por el personal registrado en la aplicación. Dicho personal puede adoptar 2 roles diferentes:

- Administrador.
- Empleado.

El administrador tiene la capacidad de gestionar tanto la información de los clientes como las cuentas de los empleados que podrán acceder a esta aplicación.

El empleado tan solo tiene acceso a las opciones para gestionar los clientes de la compañía.

El proyecto completo está formado por un servidor RESTful API desarrollado mediante NodeJS y Express. Para dar vida a la base de datos se ha utilizado MongoDB. El acceso a los diferentes recursos privados del servidor se lleva a cabo empleando TOKENS (Json Web Token). La interfaz de usuario se ha desarrollado empleando React.

### Características de la Aplicación

El acceso a la misma se puede llevar a cabo empleando 2 roles diferentes:

- Administrador.
- Usuario.

Para realizar pruebas sobre la aplicación se ha definido la siguiente cuenta:

| Username | Password |
| -------- | -------- |
| invitado | invitado |

Dicha cuenta permite probar la aplicación empleando el rol de administrador.

Asímismo, se ha definido un cliente con datos de consumos y facturas para que se pueda comprobar la funcionalidad completa de la aplicación. Dicho cliente es...

| Nombre de cliente |
| ----------------- |
| Luis Perez        |

A continuación, se detalla de manera escueta el funcionamiento de cada una de las diferentes opciones presentes en la aplicación.

#### Gestión Empleados

Esta opción es exclusiva de los usuarios con el rol de administrador y permite gestionar las cuentas de los diferentes empleados que tienen acceso a la aplicación. Las funciones que ofrece este apartado son:

- Crear una nueva cuenta de empleado.
- Editar una cuenta de empleado.
- Eliminar una cuenta de empleado.
- Cambiar la contraseña de una cuenta de empleado.
- Localizar una cuenta de empleado específica.

#### Gestión Clientes

Esta opción permite gestionar los diferentes clientes de la empresa. Las funciones que ofrece este apartado son:

- Crear un nuevo cliente.
- Editar los datos de un cliente.
- Eliminar los datos de un cliente.
- Localizar un cliente tanto por su nombre como por su DNI.

#### Gestión Tarifas

Esta opción permite gestionar las diferentes tarifas ofrecidas por la empresa. Las funciones que ofrece este apartado son:

- Crear una nueva tarifa.
- Editar los datos de una tarifa.
- Eliminar los datos de una tarifa.
- Localizar una tarifa por su nombre.

###### Parámetros de las tarifas

Durante el proceso de creación y modificación de una tarifa, se pueden asignar diversos valores que permiten cierto nivel de parametrización. Se definen 2 posibles tipos de parámetros:

- Intervalo por días.
- Intervalo por horas.

El primero de ellos permite establecer un periodo de tiempo en el que la tarifa se aplicará. Los valores definidos son:

- Primavera (Desde el 15 marzo hasta el 14 junio, ambos inclusive).
- Verano (Desde el 15 junio hasta el 14 septiembre, ambos inclusive).
- Otoño (Desde el 15 septiembre hasta el 14 diciembre, ambos inclusive).
- Invierno (Desde el 15 diciembre hasta el 14 marzo, ambos inclusive).
- Noches (Desde las 00:00h hasta las 13:59h).
- Fines de semana (Desde el viernes a las 15:00h hasta el domingo a las 23:59h).

El segundo de ellos permite indicar un periodo de horas a lo largo de un día (permite seleccionar cualquier cantidad de horas para un día).

A modo de ejemplo, si quisieramos definir una tarifa que se aplicase durante el periodo de invierno y los fines de semana, se debería seleccionar la opción `intervalo por días` y marcar las casillas `invierno` y `fines de semana`.

Por otro lado, si quisieramos definir una tarifa que se aplicase desde las 10:00h hasta las 14:00h y desde las 20:00h hasta las 00:00h, se debería seleccionar la opción `intervalo por horas` y marcar las casillas `10,11,12,13,20,21,22,23`.

#### Gestión Consumos

Esta opción permite gestionar los consumos energéticos asociados a un cliente. Las funciones que ofrece este apartado son:

- Consultar los consumos energéticos anuales, mensuales o diarios de un cliente.
- Localizar los consumos energéticos de un cliente tanto por su nombre como por su DNI.

#### Gestión Facturas

Esta opción permite gestionar las facturas asociadas a un cliente. Las funciones que ofrece este apartado son:

- Consultar los facturas de un cliente tanto anuales como mensuales.
- Localizar los facturas de un cliente tanto por su nombre como por su DNI.

#### Cargar Consumos

Esta opción permite subir los consumos asociados a un cliente tanto al servidor como a la BBDD.
Los consumos asociados a cada cliente deben crearse empleando el formato JSON. El siguiente fichero muestra un ejemplo de consumo mensual perteneciente a un cliente...

```
{
  "consumo": [
    {
      "cups": "es3456767895456001ab",
      "mes": 10,
      "año": 2021,
      "datos": [
        [
          0.162, 0.438, 0.873, 0.287, 0.39, 0.52, 0.209, 0.103, 0.685, 0.461, 0.45, 0.699, 0.292, 0.132, 0.414, 0.266,
          0.75, 0.399, 0.356, 0.548, 0.724, 0.429, 0.783, 0.859
        ],
        [
          0.858, 0.256, 0.361, 0.278, 0.435, 0.103, 0.848, 0.549, 0.299, 0.741, 0.106, 0.658, 0.455, 0.466, 0.211,
          0.807, 0.584, 0.41, 0.258, 0.431, 0.273, 0.78, 0.404, 0.146
        ],
        [
          0.257, 0.335, 0.853, 0.392, 0.885, 0.119, 0.845, 0.658, 0.276, 0.683, 0.138, 0.658, 0.366, 0.235, 0.875,
          0.225, 0.444, 0.697, 0.109, 0.473, 0.455, 0.111, 0.259, 0.743
        ],
        [
          0.233, 0.893, 0.134, 0.388, 0.52, 0.422, 0.738, 0.331, 0.283, 0.161, 0.711, 0.286, 0.888, 0.264, 0.717, 0.897,
          0.627, 0.798, 0.244, 0.614, 0.206, 0.376, 0.759, 0.831
        ],
        [
          0.814, 0.783, 0.243, 0.127, 0.314, 0.705, 0.74, 0.157, 0.56, 0.813, 0.627, 0.894, 0.384, 0.46, 0.532, 0.141,
          0.411, 0.496, 0.367, 0.192, 0.19, 0.578, 0.869, 0.64
        ],
        [
          0.283, 0.415, 0.355, 0.209, 0.368, 0.444, 0.19, 0.205, 0.565, 0.352, 0.211, 0.791, 0.85, 0.188, 0.615, 0.616,
          0.734, 0.224, 0.588, 0.616, 0.322, 0.559, 0.355, 0.712
        ],
        [
          0.664, 0.798, 0.396, 0.163, 0.833, 0.37, 0.248, 0.46, 0.71, 0.538, 0.753, 0.536, 0.732, 0.725, 0.755, 0.22,
          0.403, 0.225, 0.885, 0.675, 0.368, 0.779, 0.176, 0.645
        ],
        [
          0.874, 0.542, 0.168, 0.72, 0.17, 0.771, 0.232, 0.504, 0.499, 0.219, 0.568, 0.207, 0.356, 0.161, 0.694, 0.299,
          0.846, 0.187, 0.325, 0.558, 0.774, 0.801, 0.724, 0.254
        ],
        [
          0.333, 0.438, 0.25, 0.637, 0.512, 0.703, 0.373, 0.587, 0.2, 0.523, 0.334, 0.79, 0.441, 0.595, 0.537, 0.596,
          0.732, 0.446, 0.44, 0.704, 0.508, 0.101, 0.782, 0.538
        ],
        [
          0.454, 0.664, 0.348, 0.445, 0.333, 0.514, 0.541, 0.293, 0.83, 0.234, 0.266, 0.105, 0.237, 0.764, 0.398, 0.807,
          0.89, 0.336, 0.265, 0.145, 0.725, 0.313, 0.892, 0.798
        ],
        [
          0.663, 0.619, 0.899, 0.169, 0.429, 0.731, 0.468, 0.89, 0.83, 0.347, 0.534, 0.84, 0.393, 0.424, 0.147, 0.842,
          0.131, 0.511, 0.1, 0.414, 0.753, 0.289, 0.272, 0.537
        ],
        [
          0.549, 0.559, 0.204, 0.633, 0.72, 0.267, 0.898, 0.795, 0.17, 0.533, 0.639, 0.12, 0.589, 0.217, 0.552, 0.336,
          0.76, 0.765, 0.452, 0.353, 0.486, 0.299, 0.444, 0.178
        ],
        [
          0.584, 0.813, 0.514, 0.742, 0.198, 0.278, 0.46, 0.664, 0.413, 0.543, 0.848, 0.303, 0.422, 0.512, 0.298, 0.412,
          0.325, 0.522, 0.404, 0.512, 0.501, 0.253, 0.432, 0.448
        ],
        [
          0.753, 0.267, 0.639, 0.895, 0.145, 0.496, 0.669, 0.624, 0.644, 0.767, 0.38, 0.748, 0.369, 0.405, 0.687, 0.768,
          0.546, 0.514, 0.601, 0.365, 0.885, 0.503, 0.464, 0.805
        ],
        [
          0.396, 0.189, 0.731, 0.301, 0.476, 0.229, 0.828, 0.571, 0.373, 0.382, 0.89, 0.196, 0.127, 0.777, 0.581, 0.203,
          0.819, 0.762, 0.418, 0.255, 0.692, 0.546, 0.501, 0.143
        ],
        [
          0.224, 0.161, 0.475, 0.391, 0.47, 0.878, 0.832, 0.527, 0.602, 0.58, 0.183, 0.452, 0.623, 0.14, 0.551, 0.785,
          0.627, 0.444, 0.538, 0.613, 0.186, 0.696, 0.889, 0.211
        ],
        [
          0.138, 0.705, 0.494, 0.323, 0.299, 0.418, 0.32, 0.771, 0.387, 0.799, 0.131, 0.731, 0.77, 0.851, 0.254, 0.535,
          0.258, 0.837, 0.205, 0.593, 0.616, 0.855, 0.266, 0.77
        ],
        [
          0.319, 0.33, 0.47, 0.663, 0.136, 0.393, 0.379, 0.853, 0.127, 0.7, 0.162, 0.254, 0.558, 0.294, 0.165, 0.872,
          0.204, 0.528, 0.449, 0.506, 0.177, 0.472, 0.596, 0.847
        ],
        [
          0.571, 0.486, 0.235, 0.248, 0.636, 0.683, 0.179, 0.433, 0.464, 0.583, 0.542, 0.858, 0.659, 0.415, 0.182,
          0.251, 0.818, 0.484, 0.18, 0.296, 0.576, 0.745, 0.272, 0.739
        ],
        [
          0.478, 0.844, 0.387, 0.21, 0.128, 0.254, 0.391, 0.85, 0.581, 0.522, 0.829, 0.731, 0.225, 0.313, 0.44, 0.271,
          0.467, 0.416, 0.181, 0.33, 0.649, 0.889, 0.522, 0.795
        ],
        [
          0.558, 0.694, 0.499, 0.169, 0.737, 0.521, 0.804, 0.133, 0.717, 0.118, 0.13, 0.177, 0.309, 0.547, 0.271, 0.84,
          0.592, 0.692, 0.84, 0.375, 0.862, 0.611, 0.114, 0.817
        ],
        [
          0.381, 0.494, 0.847, 0.435, 0.277, 0.785, 0.805, 0.839, 0.175, 0.84, 0.566, 0.266, 0.798, 0.29, 0.437, 0.67,
          0.395, 0.744, 0.81, 0.689, 0.567, 0.152, 0.548, 0.518
        ],
        [
          0.699, 0.184, 0.426, 0.379, 0.781, 0.561, 0.603, 0.682, 0.877, 0.546, 0.173, 0.465, 0.731, 0.208, 0.641,
          0.674, 0.608, 0.84, 0.141, 0.714, 0.805, 0.128, 0.778, 0.332
        ],
        [
          0.73, 0.248, 0.813, 0.568, 0.165, 0.811, 0.782, 0.107, 0.488, 0.855, 0.824, 0.523, 0.312, 0.443, 0.393, 0.432,
          0.553, 0.882, 0.67, 0.7, 0.718, 0.688, 0.127, 0.597
        ],
        [
          0.558, 0.832, 0.465, 0.231, 0.601, 0.63, 0.546, 0.895, 0.126, 0.645, 0.688, 0.855, 0.772, 0.156, 0.424, 0.519,
          0.6, 0.623, 0.426, 0.258, 0.867, 0.35, 0.556, 0.842
        ],
        [
          0.122, 0.765, 0.304, 0.848, 0.404, 0.894, 0.301, 0.856, 0.102, 0.719, 0.787, 0.721, 0.872, 0.323, 0.181,
          0.579, 0.282, 0.37, 0.877, 0.515, 0.874, 0.418, 0.701, 0.645
        ],
        [
          0.338, 0.152, 0.53, 0.676, 0.817, 0.343, 0.527, 0.715, 0.216, 0.164, 0.651, 0.665, 0.428, 0.572, 0.665, 0.588,
          0.574, 0.831, 0.798, 0.564, 0.746, 0.498, 0.426, 0.369
        ],
        [
          0.69, 0.215, 0.34, 0.587, 0.383, 0.615, 0.807, 0.699, 0.779, 0.173, 0.32, 0.649, 0.449, 0.814, 0.773, 0.41,
          0.617, 0.357, 0.727, 0.852, 0.652, 0.334, 0.15, 0.208
        ],
        [
          0.363, 0.314, 0.694, 0.767, 0.194, 0.293, 0.848, 0.452, 0.601, 0.592, 0.308, 0.332, 0.878, 0.241, 0.75, 0.414,
          0.273, 0.584, 0.724, 0.713, 0.406, 0.556, 0.469, 0.668
        ],
        [
          0.302, 0.557, 0.247, 0.657, 0.556, 0.521, 0.343, 0.361, 0.28, 0.359, 0.245, 0.452, 0.123, 0.838, 0.23, 0.795,
          0.127, 0.196, 0.501, 0.364, 0.329, 0.595, 0.104, 0.403
        ],
        [
          0.203, 0.435, 0.618, 0.831, 0.825, 0.419, 0.385, 0.119, 0.738, 0.484, 0.624, 0.732, 0.243, 0.213, 0.857,
          0.302, 0.681, 0.2, 0.582, 0.188, 0.192, 0.635, 0.389, 0.52
        ]
      ]
    }
  ]
}
```

Una vez se dispone de un fichero con los consumos de un cliente, es necesario subirlo al servidor. Para ello, se debe seleccionar el fichero con los consumos y pulsar sobre el botón `Aceptar`. Tras realizar la operación anterior, solo faltará subir los consumos del servidor a la base da datos, donde quedarán almacenados de forma permanente. Para realizar esta operación, se debe pulsar el botón `Subir a la BBDD`. Una vez almacenados en la base de datos, el fichero con los consumos es movido a una carpeta dentro del servidor (`consumosLeidos`) a la espera de ser borrado.

#### Gestión Conceptos Factura

Para la creación de las facturas asociadas a un cliente, es necesario que previamente exista un registro con los diferentes conceptos económicos aplicables a cada factura. Dichos conceptos son:

- Importe por la potencia contratada.
- Impuesto a la electricidad.
- Alquiler de equipos de medida y control.
- IVA.

Este registro es único y puede ser modificado pero no borrado.
