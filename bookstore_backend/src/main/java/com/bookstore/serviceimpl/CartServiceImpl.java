package com.bookstore.serviceimpl;

import com.bookstore.dao.CartDao;
import com.bookstore.entity.CartItem;
import com.bookstore.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartServiceImpl implements CartService{
  CartDao cartDao;

  @Autowired
  void setCartDao(CartDao cartDao) {this.cartDao=cartDao;}

  @Override
  public List<CartItem> getCartItems() {
    return cartDao.getCartItems();
  }

  @Override
  public List<CartItem> getRealCartItems() {return cartDao.getRealCartItems();}

  @Override
  public void addCartItem(Integer bookId, Integer amount, Boolean active) {
    cartDao.addCartItem(bookId,amount,active);
  }

  @Override
  public void setCartItem(Integer bookId,Boolean active) {
    cartDao.setCartItem(bookId,active);
  }

  @Override
  public void deleteCartItem(Integer bookId){
    cartDao.deleteCartItem(bookId);
  }

  @Override
  public void submitCart() {
    cartDao.submitCart();
  }

}
