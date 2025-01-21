from werkzeug.security import generate_password_hash

# Lista de usuários iniciais (sócios do escritório)
initial_users = [
    {
        "id": 1,
        "name": "Administrador",
        "email": "admin@contabil.com",
        "password": generate_password_hash("admin123"),
        "role": "admin"
    },
    {
        "id": 2,
        "name": "João Silva",
        "email": "joao@contabil.com",
        "password": generate_password_hash("joao123"),
        "role": "partner"
    }
]

def get_user_by_email(email):
    return next((user for user in initial_users if user["email"] == email), None)
