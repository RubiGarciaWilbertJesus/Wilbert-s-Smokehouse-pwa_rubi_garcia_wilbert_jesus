from django.shortcuts import render

# Create your views here.
# "Base de datos" falsa: una lista de diccionarios en memoria.
# En un proyecto real esto vendría de un modelo (models.py) y una tabla,
# pero para ENTENDER qué es SSR no necesitamos base de datos: lo importante
# es que estos datos se insertan en el HTML *antes* de enviarlo al navegador.
PRODUCTOS = [
  {"id": 1, "nombre": "Brisket (250 g)", "categoria": "Ahumados", "precio": 230},
  {"id": 2, "nombre": "Costillas de cerdo (½ rack)", "categoria": "Ahumados", "precio": 260},
  {"id": 3, "nombre": "Pulled pork (250 g)", "categoria": "Ahumados", "precio": 180},
  {"id": 4, "nombre": "Salchicha ahumada", "categoria": "Ahumados", "precio": 120},
  {"id": 5, "nombre": "Pollo ahumado (½)", "categoria": "Ahumados", "precio": 170},
  {"id": 6, "nombre": "Sándwich de brisket", "categoria": "Sándwiches y platos", "precio": 160},
  {"id": 7, "nombre": "Sándwich de pulled pork", "categoria": "Sándwiches y platos", "precio": 140},
  {"id": 8, "nombre": "Platón para 2", "categoria": "Sándwiches y platos", "precio": 520},
  {"id": 9, "nombre": "Tacos de brisket (3)", "categoria": "Sándwiches y platos", "precio": 130},
  {"id": 10, "nombre": "Papa rellena de brisket", "categoria": "Sándwiches y platos", "precio": 140},
  {"id": 11, "nombre": "Mac & cheese", "categoria": "Guarniciones", "precio": 60},
  {"id": 12, "nombre": "Coleslaw", "categoria": "Guarniciones", "precio": 40},
  {"id": 13, "nombre": "Frijoles BBQ", "categoria": "Guarniciones", "precio": 45},
  {"id": 14, "nombre": "Elote asado", "categoria": "Guarniciones", "precio": 40},
  {"id": 15, "nombre": "Pan de maíz", "categoria": "Guarniciones", "precio": 35}
]


def vista_ssr(request):
    """
    Vista con Renderizado en Servidor (SSR).

    request: el objeto que representa la petición que hizo el navegador.

    render() hace tres cosas:
      1) toma la plantilla 'catalogo/catalogo_ssr.html'
      2) le inyecta el diccionario de "contexto" (aquí: la lista de productos)
      3) devuelve el HTML final, YA CON LOS DATOS DENTRO, listo para el navegador.

    Por eso es "servidor": el HTML que llega al navegador ya trae escritos
    los nombres y precios. Si haces clic derecho > "Ver código fuente de la
    página" verás los productos en el HTML, aunque JavaScript esté desactivado.
    Compáralo con la vista CSR de la Parte B, donde el HTML llega vacío y es
    JavaScript quien dibuja los productos DESPUÉS, ya en el navegador.
    """
    contexto = {"productos": PRODUCTOS}
    return render(request, 'catalogo/catalogo_ssr.html', contexto)