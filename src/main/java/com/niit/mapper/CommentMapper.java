package com.niit.mapper;


import com.niit.entity.Comment;

import java.util.List;

public interface CommentMapper {
    List<Comment> getMusicCommentByMid(int mid);
    List<Comment> getMusicCommentByCid(int cid);
    int addComment(Comment comment);
}
