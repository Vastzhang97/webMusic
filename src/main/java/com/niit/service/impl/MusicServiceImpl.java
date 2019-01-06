package com.niit.service.impl;

import com.niit.entity.Comment;
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
    public String getSearchMusic(String search) {
        return jsonUtil.toJSon(newMusicMapper.getSearchMusic(search));
    }

    @Override
    public int deleteNewMusic(int mid) {
        return newMusicMapper.deleteNewMusic(mid);
    }


}
