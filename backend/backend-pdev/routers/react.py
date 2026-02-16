from db import connect_db 
from fastapi import APIRouter, HTTPException, Request 

router = APIRouter()

def get_all_reacts(id_post: int):
    conn = connect_db() 
    cursor = conn.cursor(dictionary=True) 
    query = "SELECT id_post, emoji, react.id_user FROM react" \
            " JOIN user ON react.id_user = user.id_user WHERE react.id_post = %s" 
    cursor.execute(query, (id_post,)) 
    result = cursor.fetchall()
    # result doit ressembler à ça: [{"id_post": 1, "emoji": 👍, "id_user": [1, 2, 3]}, etc]
    grouped = {}
    for row in result:
        key = (row["id_post"], row["emoji"])
        grouped.setdefault(key, []).append(row["id_user"])
    # optionnel: dédupliquer en préservant l'ordre
    formatted = []
    for (id_post, emoji), users in grouped.items():
        deduped = list(dict.fromkeys(users))
        formatted.append({"id_post": id_post, "emoji": emoji, "id_user": deduped})
    result = formatted
    cursor.close() 
    conn.close() 
    return result

def add_react(id_post: int, id_user: int, emoji: str):
    conn = connect_db() 
    cursor = conn.cursor() 
    # vérifier si la réaction existe déjà pour ce post et cet utilisateur
    query_check = "SELECT id_react FROM react WHERE id_post = %s AND id_user = %s"
    cursor.execute(query_check, (id_post, id_user)) 
    existing = cursor.fetchone() 
    if existing:
        # mettre à jour l'emoji
        query_update = "UPDATE react SET emoji = %s WHERE id_react = %s"
        cursor.execute(query_update, (emoji, existing[0])) 
    else:
        # insérer une nouvelle réaction
        query_insert = "INSERT INTO react (id_post, id_user, emoji) VALUES (%s, %s, %s)"
        cursor.execute(query_insert, (id_post, id_user, emoji)) 
    conn.commit() 
    cursor.close() 
    conn.close() 
    return {"message": "Reaction added/updated successfully"}
def delete_react(id_post: int, id_user: int):
    conn = connect_db() 
    cursor = conn.cursor() 
    query_delete = "DELETE FROM react WHERE id_post = %s AND id_user = %s"
    cursor.execute(query_delete, (id_post, id_user)) 
    conn.commit() 
    cursor.close() 
    conn.close() 
    return {"message": "Reaction deleted successfully"}
# routes
@router.get("/{id_post}")
def read_react(id_post: int):
    return get_all_reacts(id_post)

@router.post("/{id_post}")
def add_react(id_post: int, request: Request):
    data = request.json() 
    id_user = data.get("id_user") 
    emoji = data.get("emoji") 
    if not id_user or not emoji:
        raise HTTPException(status_code=400, detail="Missing id_user or emoji")
    return add_react(id_post, id_user, emoji)

@router.delete("/{id_post}")
def remove_react(id_post: int, request: Request):
    data = request.json() 
    id_user = data.get("id_user") 
    if not id_user:
        raise HTTPException(status_code=400, detail="Missing id_user")
    return delete_react(id_post, id_user)