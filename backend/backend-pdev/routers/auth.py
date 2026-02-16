from fastapi import FastAPI, HTTPException 
from models import LoginPayload
import mysql.connector 
app = FastAPI() 
def connect_db(): 
    return mysql.connector.connect( 
        # host="62.210.144.234", # 
        # user="projet_dev", 
        # base de donnée prod (connection bloqué sur mon pc) 
        # password="projet_dev", 
        host="localhost", 
        user="root", 
        database="projet_dev", 
        connection_timeout=5 
    ) 
def ConnectUser(mail: str, password: str): 
    conn = connect_db() 
    cursor = conn.cursor(dictionary=True) 
    query = "SELECT id_user, mail, pseudo, can_edit FROM user WHERE mail = %s AND password = %s" 
    cursor.execute(query, (mail, password)) 
    result = cursor.fetchone() 
    cursor.close() 
    conn.close() 
    return result 
def LogOutUser(): 
    return True 
# routes 
@app.get("/") 
def read_root(): 
    return {"message": "API is running", "db_status": "connected" if connect_db() else "not connected", "version": "26.15.02"} 
# connection 
@app.post("/login") 
def login(payload: LoginPayload): 
    user = ConnectUser(payload.mail, payload.password) 
    if user: 
        return {"message": "Login successful", "user": user} 
    raise HTTPException(status_code=401, detail="Invalid mail or password") 
# déconnexion 
@app.post("/logout") 
def logout(): 
    if LogOutUser(): 
        return {"message": "Logout successful"} 
    raise HTTPException(status_code=400, detail="Logout failed")