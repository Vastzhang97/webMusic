package com.niit.service.impl;

import com.niit.mapper.AlbumMapper;
import com.niit.mapper.CommentMapper;
import com.niit.mapper.NewMusicMapper;
import com.niit.service.interfaces.IMusicService;
import com.niit.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class MusicServiceImpl implements IMusicService {
    @Autowired
    private AlbumMapper albumMapper;

    @Autowired
    private NewMusicMapper newMusicMapper;

    @Autowired
    private CommentMapper commentMapper;

    @Autowired
    private JSONUtil jsonUtil;

    @Override
    public String getIntroAlbum() {
        return jsonUtil.toJSon(albumMapper.getIntroAlbum());
    }

    @Override
    public String getNewMusic() {
        return jsonUtil.toJSon(newMusicMapper.getNewMusic());
    }

    @Override
    public String getComment(int mid) {
        return jsonUtil.toJSon(commentMapper.getComment(mid));
    }
}
