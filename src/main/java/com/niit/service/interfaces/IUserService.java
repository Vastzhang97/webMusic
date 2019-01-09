package com.niit.service.interfaces;

import com.niit.entity.User;

public interface IUserService {
    String getUser();
    int deleteUser(int uId);
    int register(User user);
}
