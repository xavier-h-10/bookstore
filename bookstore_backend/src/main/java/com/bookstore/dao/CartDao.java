package com.bookstore.dao;

import com.bookstore.entity.CartItem;
import java.util.List;
import org.springframework.web.bind.annotation.RequestMapping;

public interface CartDao {
  List<CartItem> getCartItems();

  void addCartItem(Integer bookId, Integer amount, Boolean active);

  void setCartItem(Integer bookId,Boolean active);

  void deleteCartItem(Integer bookId);

  void submitCart();

  List<CartItem> getRealCartItems();


}