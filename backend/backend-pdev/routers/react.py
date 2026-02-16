from db import connect_db 
from fastapi import APIRouter, HTTPException, Request 

router = APIRouter()
def get_all_posts():
    conn = connect_db() 
    cursor = conn.cursor(dictionary=True) 
    query = "SELECT id_post, title, text FROM post" 
    cursor.execute(query) 
    result = cursor.fetchall() 
    cursor.close() 
    conn.close() 
    return result

def get_post_by_id(post_id: int):
    conn = connect_db() 
    cursor = conn.cursor(dictionary=True) 
    query = "SELECT id_post, title, text FROM post WHERE id_post = %s" 
    cursor.execute(query, (post_id,)) 
    result = cursor.fetchone() 
    cursor.close() 
    conn.close() 
    return result

def create_post(title: str, text: str):
    conn = connect_db() 
    cursor = conn.cursor() 
    query = "INSERT INTO post (title, text) VALUES (%s, %s)" 
    cursor.execute(query, (title, text)) 
    conn.commit() 
    post_id = cursor.lastrowid 
    cursor.close() 
    conn.close() 
    return post_id

def delete_post(post_id: int):
    conn = connect_db() 
    cursor = conn.cursor() 
    query = "DELETE FROM post WHERE id_post = %s" 
    cursor.execute(query, (post_id,)) 
    conn.commit() 
    deleted = cursor.rowcount > 0 
    cursor.close() 
    conn.close() 
    return deleted

def update_post(post_id: int, title: str, text: str) -> bool:
    conn = connect_db() 
    cursor = conn.cursor() 
    query = "UPDATE post SET title=%s, text=%s WHERE id_post=%s" 
    cursor.execute(query, (title, text, post_id)) 
    conn.commit() 
    updated = cursor.rowcount > 0 
    cursor.close() 
    conn.close() 
    return updated

# routes
@router.get("/")
def read_posts():
    return get_all_posts()
@router.get("/{post_id}")
def read_post(post_id: int):
    post = get_post_by_id(post_id) 
    if post: 
        return post 
    raise HTTPException(status_code=404, detail="Post not found")
@router.post("/")
def add_post(title: str, text: str):
    post_id = create_post(title, text) 
    return {"message": "Post created", "id_post": post_id}
@router.patch("/{post_id}")
def modify_post(post_id: int, title: str, text: str):
    if update_post(post_id, title, text): 
        return {"message": "Post updated"} 
    raise HTTPException(status_code=404, detail="Post not found")
@router.delete("/{post_id}")
def remove_post(post_id: int):
    if delete_post(post_id): 
        return {"message": "Post deleted"} 
    raise HTTPException(status_code=404, detail="Post not found")