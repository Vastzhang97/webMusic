package com.niit.mapper;

import com.niit.entity.IntroAlbum;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AlbumMapper {
    List<IntroAlbum> getIntroAlbum();
}
