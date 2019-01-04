package com.niit.mapper;


import com.niit.entity.Comment;

import java.util.List;

public interface CommentMapper {
    List<Comment> getComment(int mid);
}
