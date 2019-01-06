package com.niit.service.interfaces;

import com.niit.entity.Comment;

public interface ICommentService {
    String getMusicCommentByCid(int cId);
    String getMusicCommentByMid(int mId);
    int addComment(Comment comment);
}
