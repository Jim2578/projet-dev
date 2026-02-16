from db import connect_db 
from fastapi import APIRouter, HTTPException, Request 

router = APIRouter() 
def get_comments_by_post_id(post_id: int): 
    conn = connect_db() 
    cursor = conn.cursor(dictionary=True) 
    query = "SELECT id_comment, comment.id_user, id_post, text, createdAt, pseudo FROM comment " \
    "JOIN user ON comment.id_user = user.id_user WHERE id_post = %s" 
    cursor.execute(query, (post_id,)) 
    result = cursor.fetchall() 
    cursor.close() 
    conn.close() 
    return result 
def create_comment(post_id: int, text: str): 
    conn = connect_db() 
    cursor = conn.cursor() 
    query = "INSERT INTO comment (id_post, text) VALUES (%s, %s)" 
    cursor.execute(query, (post_id, text)) 
    conn.commit() 
    comment_id = cursor.lastrowid 
    cursor.close() 
    conn.close() 
    return comment_id 
def delete_comment(comment_id: int): 
    conn = connect_db() 
    cursor = conn.cursor() 
    query = "DELETE FROM comment WHERE id_comment = %s" 
    cursor.execute(query, (comment_id,)) 
    conn.commit() 
    deleted = cursor.rowcount > 0 
    cursor.close() 
    conn.close() 
    return deleted 
def update_comment(comment_id: int, text: str) -> bool: 
    conn = connect_db() 
    cursor = conn.cursor() 
    query = "UPDATE comment SET text=%s WHERE id_comment=%s" 
    cursor.execute(query, (text, comment_id)) 
    conn.commit() 
    updated = cursor.rowcount > 0 
    cursor.close() 
    conn.close() 
    return updated 
# routes 
@router.get("/{post_id}") 
def read_comments(post_id: int): 
    return get_comments_by_post_id(post_id) 
@router.post("/{post_id}") 
def add_comment(post_id: int, text: str): 
    comment_id = create_comment(post_id, text) 
    return {"message": "Comment created", "id_comment": comment_id} 
@router.put("/{comment_id}") 
def modify_comment(comment_id: int, text: str): 
    if update_comment(comment_id, text): 
        return {"message": "Comment updated"} 
    raise HTTPException(status_code=404, detail="Comment not found") 
@router.delete("/{comment_id}") 
def remove_comment(comment_id: int): 
    if delete_comment(comment_id): 
        return {"message": "Comment deleted"} 
    raise HTTPException(status_code=404, detail="Comment not found")