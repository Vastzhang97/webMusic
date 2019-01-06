package com.niit.controller;

import com.niit.entity.Comment;
import com.niit.service.interfaces.ICommentService;
import com.niit.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.util.Date;
import java.util.Map;

@Controller
public class CommentController {

    @Autowired
    private JSONUtil jsonUtil;

    @Autowired
    private ICommentService commentService;

    @RequestMapping(value = "/getMusicCommentByMid", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String getMusicCommentByMid(@RequestBody String json, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getMusicCommentByMid" + json);
        Map<String, Object> map = jsonUtil.readValue(json, Map.class);
        int mid = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            mid = (Integer) entry.getValue();
        }
        System.out.println("getMusicCommentByMid" + mid);
        String comment = commentService.getMusicCommentByMid(mid);
        return comment;
    }

    @RequestMapping(value = "/addComment", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String addComment(@RequestBody String json, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("addComment" + json);
        Map<String, Object> map = jsonUtil.readValue(json, Map.class);
        Comment comment = jsonUtil.readValue(json, Comment.class);
        comment.setcReplyId(0);
        Date now = new Date();
        DateFormat d1 = DateFormat.getDateTimeInstance();
        String str1 = d1.format(now);
        comment.setcDate(str1);
        System.out.println("addComment" + comment);
        int cId = commentService.addComment(comment);//直接返回值为修改行数，不是主键
        System.out.println("cId:" + cId);
        cId = comment.getcId();//获得新插入数据的主键
        System.out.println("cId:" + cId);
        String resultComment = commentService.getMusicCommentByCid(cId);
        System.out.println("getComment" + resultComment);
        return resultComment;
    }

}
