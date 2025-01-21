from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, JSON, Date, Text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Client(Base):
    __tablename__ = 'clients'
    
    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    cnpj = Column(String(14), unique=True, nullable=False)
    email = Column(String(100))
    phone = Column(String(20))
    address = Column(String(200))
    created_at = Column(DateTime, default=datetime.utcnow)
    active = Column(Boolean, default=True)
    
    employees = relationship("Employee", back_populates="client")
    documents = relationship("Document", back_populates="client")

class Employee(Base):
    __tablename__ = 'employees'
    
    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey('clients.id'))
    name = Column(String(100), nullable=False)
    cpf = Column(String(11), unique=True, nullable=False)
    role = Column(String(100))
    salary = Column(Float)
    admission_date = Column(Date, nullable=False)
    termination_date = Column(Date, nullable=True)
    last_vacation_start = Column(Date, nullable=True)
    last_vacation_end = Column(Date, nullable=True)
    next_vacation_due = Column(Date, nullable=True)
    active = Column(Boolean, default=True)
    payroll_taxes = Column(JSON)  # {inss: valor, fgts: valor, ir: valor}
    company_taxes = Column(JSON)  # {inss: valor, fgts: valor, outras_entidades: valor}
    
    client = relationship("Client", back_populates="employees")
    vacations = relationship("Vacation", back_populates="employee")
    terminations = relationship("Termination", back_populates="employee")

class Vacation(Base):
    __tablename__ = 'vacations'
    
    id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, ForeignKey('employees.id'))
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    status = Column(String(20))  # 'scheduled', 'in_progress', 'completed'
    payment_date = Column(Date, nullable=True)
    payment_amount = Column(Float, nullable=True)
    
    employee = relationship("Employee", back_populates="vacations")

class Termination(Base):
    __tablename__ = 'terminations'
    
    id = Column(Integer, primary_key=True)
    employee_id = Column(Integer, ForeignKey('employees.id'))
    termination_date = Column(Date, nullable=False)
    reason = Column(String(100))
    payment_date = Column(Date, nullable=True)
    payment_amount = Column(Float, nullable=True)
    status = Column(String(20))  # 'pending', 'processed', 'completed'
    
    employee = relationship("Employee", back_populates="terminations")

class Document(Base):
    __tablename__ = 'documents'
    
    id = Column(Integer, primary_key=True)
    client_id = Column(Integer, ForeignKey('clients.id'))
    type = Column(String(50))  # 'ferias', 'rescisao', 'comprovante'
    description = Column(String(200))
    file_path = Column(String(500))
    uploaded_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String(20))  # 'pending', 'approved', 'rejected'
    month = Column(Integer)
    year = Column(Integer)
    
    client = relationship("Client", back_populates="documents")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
