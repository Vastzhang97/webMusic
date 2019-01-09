package com.niit.mapper;


import com.niit.entity.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserMapper {
    List<User> getUser();
    int deleteUser(int uId);
    int register(User user);
}
