package com.niit.controller;

import com.niit.entity.Comment;
import com.niit.service.interfaces.IMusicService;
import com.niit.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.util.Date;
import java.util.Map;

@Controller
public class MainController {

    @RequestMapping("/")
    public String goToIndex() {
        return "index";
    }

    @RequestMapping("/index")
    public String index() {
        return "index";
    }

    @RequestMapping("/musicPlay")
    public String musicPlay() {
        return "musicPlay";
    }

    @RequestMapping("/search")
    public String search() {
        return "search";
    }

    @RequestMapping("/userInfo")
    public String userInfo() {
        return "userInfo";
    }

    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    @RequestMapping("/register")
    public String register() {
        return "register";
    }

    @RequestMapping("/admin")
    public String admin() {
        return "admin";
    }

    @RequestMapping("/adminMusic")
    public String adminMusic() {
        return "adminMusic";
    }

    @RequestMapping("/adminUser")
    public String adminUser() {
        return "adminUser";
    }

    @Autowired
    private IMusicService musicService;

    @Autowired
    private JSONUtil jsonUtil;

}