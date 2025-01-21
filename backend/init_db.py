from datetime import datetime, timedelta, date
import os
import sys

# Adiciona o diretório backend ao PYTHONPATH
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

from backend.database import SessionLocal, engine
from backend.models import Base, Client, Employee, Vacation, Termination, Document, User
from passlib.context import CryptContext

# Drop and recreate all tables
Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)

# Create password context
pwd_context = CryptContext(schemes=["bcrypt"], default="bcrypt")

# Create a database session
db = SessionLocal()

try:
    # Add admin user
    admin_user = User(
        name="Administrador",
        email="admin@contabil.com",
        password=pwd_context.hash("admin123"),
        role="admin"
    )
    db.add(admin_user)
    
    # Add partner user
    partner_user = User(
        name="João Silva",
        email="joao@contabil.com",
        password=pwd_context.hash("joao123"),
        role="partner"
    )
    db.add(partner_user)
    
    # Add sample clients
    clients = [
        Client(
            name="Tech Solutions Ltda",
            cnpj="12345678000101",
            email="contato@techsolutions.com",
            phone="11999988888",
            address="Rua da Tecnologia, 123",
        ),
        Client(
            name="Café & Sabor Comercial",
            cnpj="23456789000102",
            email="contato@cafesabor.com",
            phone="11999977777",
            address="Avenida do Café, 456",
        ),
    ]
    
    for client in clients:
        db.add(client)
    db.commit()

    # Add sample employees for Tech Solutions
    tech_employees = [
        Employee(
            client_id=1,
            name="João Silva",
            cpf="12345678901",
            role="Desenvolvedor",
            salary=5000.0,
            admission_date=date(2023, 1, 15),
            last_vacation_start=date(2023, 1, 15),
            last_vacation_end=date(2023, 1, 30),
            next_vacation_due=date(2024, 1, 15),
            payroll_taxes={
                "inss": 550.0,
                "fgts": 400.0,
                "ir": 220.0
            },
            company_taxes={
                "inss": 1100.0,
                "fgts": 400.0,
                "outras_entidades": 150.0
            }
        ),
        Employee(
            client_id=1,
            name="Maria Santos",
            cpf="23456789012",
            role="Designer",
            salary=4500.0,
            admission_date=date(2023, 2, 20),
            last_vacation_start=date(2023, 2, 20),
            last_vacation_end=date(2023, 3, 7),
            next_vacation_due=date(2024, 2, 20),
            payroll_taxes={
                "inss": 495.0,
                "fgts": 360.0,
                "ir": 180.0
            },
            company_taxes={
                "inss": 990.0,
                "fgts": 360.0,
                "outras_entidades": 135.0
            }
        ),
    ]
    
    # Add sample employees for Café & Sabor
    cafe_employees = [
        Employee(
            client_id=2,
            name="Pedro Costa",
            cpf="34567890123",
            role="Cozinheiro",
            salary=3500.0,
            admission_date=date(2023, 12, 15),
            payroll_taxes={
                "inss": 385.0,
                "fgts": 280.0,
                "ir": 0.0
            },
            company_taxes={
                "inss": 770.0,
                "fgts": 280.0,
                "outras_entidades": 105.0
            }
        ),
        Employee(
            client_id=2,
            name="Ana Paula",
            cpf="45678901234",
            role="Atendente",
            salary=2500.0,
            admission_date=date(2023, 6, 1),
            last_vacation_start=date(2023, 12, 20),
            last_vacation_end=date(2024, 1, 18),
            next_vacation_due=date(2024, 6, 1),
            payroll_taxes={
                "inss": 275.0,
                "fgts": 200.0,
                "ir": 0.0
            },
            company_taxes={
                "inss": 550.0,
                "fgts": 200.0,
                "outras_entidades": 75.0
            }
        ),
        Employee(
            client_id=2,
            name="Carlos Eduardo",
            cpf="56789012345",
            role="Gerente",
            salary=4000.0,
            admission_date=date(2023, 3, 1),
            payroll_taxes={
                "inss": 440.0,
                "fgts": 320.0,
                "ir": 150.0
            },
            company_taxes={
                "inss": 880.0,
                "fgts": 320.0,
                "outras_entidades": 120.0
            }
        ),
    ]
    
    for employee in tech_employees + cafe_employees:
        db.add(employee)
    db.commit()

    print("Database initialized successfully!")

except Exception as e:
    print(f"Error initializing database: {e}")
    db.rollback()
finally:
    db.close()
