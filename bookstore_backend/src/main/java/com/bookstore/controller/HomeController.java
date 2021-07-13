package com.bookstore.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.bookstore.entity.HomeItem;
import com.bookstore.service.HomeService;

import java.util.List;

@RestController
public class HomeController {
    HomeService homeService;

    @Autowired
    void setHomepageService(HomeService homeService)
    {
        this.homeService=homeService;
    }

    @ResponseBody
    @RequestMapping("/getHomeContent")
    public List<HomeItem> getHomeContent()
    {
        System.out.println("home controller executed");
        return homeService.getHomeContent();
    }
}
