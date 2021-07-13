package com.bookstore.controller;

import com.bookstore.entity.Order;
import com.bookstore.entity.CartItem;
import com.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class CartController {
  CartService cartService;

  @Autowired
  void setCartService(CartService cartService) {this.cartService=cartService;}
  //标注在方法上，Spring容器创建当前对象，就会调用方法，完成赋值；方法使用的参数，自定义类型的值从ioc容器中获取

  @RequestMapping("/getCartItems")
  public List<CartItem> getCartItems() {
    return cartService.getCartItems();
  }


  /*设置是否选中*/
  @RequestMapping("/setCartItem")
  public void setCartItem(@RequestParam("bookId") Integer bookId,@RequestParam("active") Boolean active)
  {cartService.setCartItem(bookId,active);}

  /* 获取打钩的购物车item*/
  @RequestMapping("/getRealCartItems")
  public List<CartItem> getRealCartItems() {return cartService.getRealCartItems();}

  @RequestMapping("/addCartItem")
  public void addCartItem(@RequestParam("bookId") Integer bookId, @RequestParam("amount") Integer amount, @RequestParam("active") Boolean active) {
    cartService.addCartItem(bookId,amount,active);
  }

  @RequestMapping("/submitCart")
  public void submitCart() {   //提交订单后，需将购物车清空
    cartService.submitCart();
  }

  @RequestMapping("/deleteCartItem")
  public void deleteCartItem(@RequestParam("bookId") Integer bookId) {
    cartService.deleteCartItem(bookId);
  }

}
