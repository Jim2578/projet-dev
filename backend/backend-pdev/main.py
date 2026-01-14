from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

class Student(BaseModel):
    id: int
    name: str
    age: int
student_db = [ 
    { "id": 1, "name": "Anne", "age": 22 }, 
    { "id": 2, "name": "Thomas", "age": 23 }, 
    { "id": 3, "name": "Giorno Giovanna", "age": 16 }, 
]

app = FastAPI()
app.add_middleware( CORSMiddleware, allow_origins=["http://localhost:5173"], allow_credentials=True, allow_methods=["*"], allow_headers=["*"], )

# racine
@app.get("/")
def home(): 
    return  { "message" : "API is running" }
    
# affiche tout les étudiants
@app.get("/student")
def students():
    return student_db
# affiche le nombre d'étudiants
@app.get("/student/count")
def Count_student():
    return { "Amt_Student": len(student_db) }


# ajoute un étudiant
@app.post("/student")
def create_student(student: Student):
    student_db.append(student.dict())
    return { "message": "Etudiant ajouté", "étudiant": student }


# cherche un étudiant avec son id
@app.get("/student/{id}")
def get_student(id:int):
    for student in student_db:
        if(student["id"] == id):
            return student
    raise HTTPException(status_code=404, detail="Etudiant inexistant")

# recherche un étudiant avec son nom
@app.get("/student/search/{name}")
def Search_by_name(name: str):
    name = name.lower()
    result = []
    for student in student_db:
        if(name in student["name"].lower()):
            result.append(student)
    if(result): return result
    raise HTTPException(status_code=404, detail="Etudiant inexistant")
