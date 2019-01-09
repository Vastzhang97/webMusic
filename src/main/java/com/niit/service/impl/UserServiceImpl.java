package com.niit.service.impl;

import com.niit.entity.User;
import com.niit.mapper.UserMapper;
import com.niit.service.interfaces.IUserService;
import com.niit.util.JSONUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements IUserService {

    @Autowired
    private JSONUtil jsonUtil;

    @Autowired
    private UserMapper userMapper;

    @Override
    public String getUser() {
        return jsonUtil.toJSon(userMapper.getUser());
    }

    @Override
    public int deleteUser(int uId) {
        return userMapper.deleteUser(uId);
    }

    @Override
    public int register(User user) {
        return userMapper.register(user);
    }
}
