package com.niit.controller;

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

    @Autowired
    private IMusicService musicService;

    @Autowired
    private JSONUtil jsonUtil;

    @RequestMapping(value = "/getIntroAlbum", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String getIntroAlbum(@RequestParam(required = false) Integer userId, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getIntroAlbum");
        String introAlbums = musicService.getIntroAlbum();
        return introAlbums;
    }

    @RequestMapping(value = "/getNewMusic", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String getNewMusic(@RequestParam(required = false) Integer userId, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getNewMusic");
        String newMusic = musicService.getNewMusic();
        System.out.println(newMusic);
        return newMusic;
    }

    @RequestMapping(value = "/getMusicComment", produces = "plain/text; charset=UTF-8")
    @ResponseBody
    public String getMusicComment(@RequestBody String json, HttpServletRequest request, HttpServletResponse response) {
        System.out.println("getMusicComment" + json);
        Map<String, Object> map = jsonUtil.readValue(json, Map.class);
        int mid = 0;
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            mid = (Integer) entry.getValue();
        }
        System.out.println("getMusicComment" + mid);
        String comment = musicService.getComment(mid);
        return comment;
    }
}