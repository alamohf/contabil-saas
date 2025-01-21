#!/bin/bash

# Inicia o servidor backend
cd backend
uvicorn main:app --reload &

# Inicia o servidor frontend
cd ../frontend
npm start
