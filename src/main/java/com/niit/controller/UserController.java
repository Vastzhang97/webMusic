package com.niit.controller;

import com.niit.entity.User;
import com.niit.service.interfaces.IUserService;
import com.niit.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@Controller
public class UserController {
    @Autowired
    private JSONUtil jsonUtil;

    @Autowired
    private IUserService userService;

    @RequestMapping(value = "/getUser", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String getUser(@RequestParam(required = false) Integer userId, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getUser");
        String user = userService.getUser();
        return user;
    }

    @RequestMapping(value = "/deleteUser", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String deleteUser(@RequestBody String json, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("deleteUser" + json);
        Map<String, Object> map = jsonUtil.readValue(json, Map.class);
        int uId = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            uId = (Integer) entry.getValue();
        }
        int result = userService.deleteUser(uId);
        System.out.println("result:" + result);
        return jsonUtil.toJSon(result);
    }

    @RequestMapping(value = "/register", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String register(@RequestBody String json, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("register" + json);
        User user = jsonUtil.readValue(json, User.class);
        int result = userService.register(user);
        return jsonUtil.toJSon(result);
    }
}
