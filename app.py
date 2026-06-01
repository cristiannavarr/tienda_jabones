from flask import Flask, render_template
import webbrowser
import threading

app = Flask(__name__)

@app.route("/")
def inicio():
    productos = [
        {"id": 1, "nombre": "Oxígeno Activo - Kilo", "descripcion": "Oxígeno activo por kilo, ideal para apoyar la limpieza y el tratamiento de manchas difíciles.", "precio": 15000, "imagen": "oxigeno_activo.png"},
        {"id": 2, "nombre": "Pastilla Cloro - Paquete", "descripcion": "Pastillas de cloro para limpieza y desinfección.", "precio": 3000, "imagen": "pastilla_cloro.jpeg"},
        {"id": 3, "nombre": "Lavaloza Líquido - Galón", "descripcion": "Jabón lavaloza líquido en presentación de galón.", "precio": 23000, "imagen": "lavaloza_liquido.jpg"},
        {"id": 4, "nombre": "Lavaloza Líquido - Litro", "descripcion": "Jabón lavaloza líquido en presentación de litro.", "precio": 10000, "imagen": "lava_loza_liquido.png"},
        {"id": 5, "nombre": "Jabón Tipo Rey - Galón", "descripcion": "Jabón tipo Rey en presentación de galón, producto multiusos para limpieza.", "precio": 23000, "imagen": "jabon_tipo_rey.jpg"},
        {"id": 6, "nombre": "Jabón Azul Tipo Rey - Litro", "descripcion": "Jabón azul tipo Rey en presentación de litro.", "precio": 10000, "imagen": "jabon_azul_tipo_rey.png"},
        {"id": 7, "nombre": "Desengrasante Multiusos - Galón", "descripcion": "Desengrasante multiusos en presentación de galón, ideal para remover grasa y suciedad.", "precio": 23000, "imagen": "desengrasante_multiusosgalon.jpg"},
        {"id": 8, "nombre": "Desengrasante Multiusos - Litro", "descripcion": "Desengrasante multiusos en presentación de litro.", "precio": 10000, "imagen": "desengrasante_multi_uso_litro.png"},
        {"id": 9, "nombre": "Jabón en Polvo - Kilo", "descripcion": "Jabón en polvo por kilo para lavado y limpieza.", "precio": 8000, "imagen": "jabon_en_polvo.jpg"},
        {"id": 10, "nombre": "Varsol Biodegradable - Litro", "descripcion": "Varsol biodegradable en presentación de litro para limpieza de superficies.", "precio": 12000, "imagen": "varsol_biodegradable.jpg"},
        {"id": 11, "nombre": "Limpia Pisos - Galón", "descripcion": "Limpia pisos en presentación de galón.", "precio": 18000, "imagen": "limpia_pisos_galon.png"},
        {"id": 12, "nombre": "Limpia Pisos - Litro", "descripcion": "Limpia pisos en presentación de litro. Precio pendiente de confirmar.", "precio": 0, "imagen": "limpia_pisos.jpg"},
        {"id": 13, "nombre": "Suavizante Textil - Galón", "descripcion": "Suavizante textil en presentación de galón, ideal para dejar la ropa suave y con buen aroma.", "precio": 23000, "imagen": "suavizante_textil_galon.jpg"},
        {"id": 14, "nombre": "Suavizante Textil - Litro", "descripcion": "Suavizante textil en presentación de litro.", "precio": 10000, "imagen": "suavizante_textil_litro.jpg"},
        {"id": 15, "nombre": "Ácido Bórico", "descripcion": "Ácido bórico en presentación de bolsa.", "precio": 18000, "imagen": "acido_borico.jpg"},
        {"id": 16, "nombre": "Soda Cáustica", "descripcion": "Soda cáustica para limpieza profunda y usos especializados.", "precio": 15000, "imagen": "soda_caustica.jpg"},
        {"id": 17, "nombre": "Bolsa Negra - Paquete", "descripcion": "Bolsas negras resistentes en presentación de paquete.", "precio": 2500, "imagen": "bolsa_negra.jpg.png"},
        {"id": 18, "nombre": "Bicarbonato de Sodio - Kilo", "descripcion": "Bicarbonato de sodio por kilo para limpieza y otros usos.", "precio": 10000, "imagen": "bicarbonato_sodio.jpg"},
        {"id": 19, "nombre": "Pastilla Azul Sanitario - Unidad", "descripcion": "Pastilla azul sanitaria por unidad, ideal para mantener limpieza y frescura.", "precio": 3000, "imagen": "pastilla_azul_unidad.jpg"},
        {"id": 20, "nombre": "Alcohol Industrial - Galón", "descripcion": "Alcohol industrial en presentación de galón.", "precio": 32000, "imagen": "alcohol_industrial_galon.jpg"},
        {"id": 21, "nombre": "Alcohol Industrial - Litro", "descripcion": "Alcohol industrial en presentación de litro.", "precio": 12000, "imagen": "alcohol_industrial_galon.jpg"}
    ]

    contacto = {
        "nombre": "Jairo Arévalo",
        "celular": "3134730264",
        "ciudad": "Bogotá",
        "horario": "9:00 a.m. a 6:00 p.m.",
        "extra": "En algunos casos, horario extendido."
    }

    return render_template("index.html", productos=productos, contacto=contacto)

# Función para abrir el navegador automáticamente
def abrir_navegador():
    webbrowser.open("http://127.0.0.1:5000/")

if __name__ == "__main__":
    # Ejecuta el navegador en un hilo separado
    threading.Timer(1.0, abrir_navegador).start()
    app.run(debug=False)