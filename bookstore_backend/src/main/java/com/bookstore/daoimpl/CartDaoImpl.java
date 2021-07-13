package com.bookstore.daoimpl;

import com.bookstore.dao.CartDao;
import com.bookstore.entity.Book;
import com.bookstore.entity.Order;
import com.bookstore.entity.CartItem;
import com.bookstore.repository.BookRepository;
import com.bookstore.repository.CartRepository;
import com.bookstore.repository.OrderRepository;
import com.bookstore.repository.OrderItemRepository;
import com.bookstore.utils.sessionUtils.SessionUtil;
import java.math.BigDecimal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;

@Repository
public class CartDaoImpl implements CartDao {

  CartRepository cartRepository;
  BookRepository bookRepository;
  OrderRepository orderRepository;
  OrderItemRepository orderItemRepository;

  @Autowired
  void setCartRepository(CartRepository cartRepository) {
    this.cartRepository = cartRepository;
  }

  @Autowired
  void setBookRepository(BookRepository bookRepository) {
    this.bookRepository = bookRepository;
  }

  @Autowired
  void setOrderRepository(OrderRepository orderRepository) {
    this.orderRepository = orderRepository;
  }

  @Autowired
  void setOrderItemRepository(OrderItemRepository orderItemRepository) {
    this.orderItemRepository = orderItemRepository;
  }

  @Override
  public List<CartItem> getCartItems() {
    Integer userId = SessionUtil.getUserId();
    if (userId == null) {
      return null;
    }
    List<CartItem> item = cartRepository.getItems(userId);
    System.out.println("cartSize:" + item.size());
    System.out.println(item);
    return item;
  }

  @Override
  public List<CartItem> getRealCartItems() {
    Integer userId = SessionUtil.getUserId();
    if (userId == null) {
      return null;
    }
    List<CartItem> item = cartRepository.getRealCartItems(userId);
    return item;
  }

  @Override
  public void addCartItem(Integer bookId, Integer amount, Boolean active) {
    Integer userId = SessionUtil.getUserId();
    if (userId == null) {
      return;
    }
    CartItem item = cartRepository.getCartItemById(userId, bookId);
    if (item != null) {
      amount += item.getAmount();
      System.out.println("addItem:" + userId + " " + bookId + " " + amount);
    }
    cartRepository.addCartItem(userId, bookId, amount, active);
  }

  @Override
  public void setCartItem(Integer bookId, Boolean active) {
    Integer userId = SessionUtil.getUserId();
    if (userId == null) {
      return;
    }
    System.out.println("setCartItem" + bookId + " " + active);
    cartRepository.setCartItem(userId, bookId, active);
  }


  @Override
  public void deleteCartItem(Integer bookId) {
    Integer userId = SessionUtil.getUserId();
    if (userId == null) {
      return;
    }
    cartRepository.deleteCartItem(userId, bookId);
  }

  @Override
  public void submitCart() {
    System.out.println("submitCart dao executed");
    Integer userId = SessionUtil.getUserId();
    if (userId == null) {
      return;
    }
    //SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    Timestamp nowDate= new Timestamp(new Date().getTime());
    System.out.println("date: "+nowDate);
    List<CartItem> myCart = cartRepository.getRealCartItems(userId);
    BigDecimal myPrice =BigDecimal.ZERO;

    for(int i=0;i<myCart.size();i++)
    {
      CartItem myItem = myCart.get(i);
      Book myBook = bookRepository.getBookByBookId(myItem.getBookId());
      if (myItem.getAmount() > myBook.getInventory()) {
        continue;
      } else {
        bookRepository
            .modifyInventory(myItem.getBookId(), myBook.getInventory() - myItem.getAmount());
        myPrice = myPrice.add( BigDecimal.valueOf( myItem.getAmount()).multiply(myBook.getPrice()));

      }
    }

    orderRepository.addOrder(userId, nowDate,myPrice); //加订单
    cartRepository.submitCart(userId);  //清空购物车

    Order myOrder = orderRepository.getMaxOrder();

    for (int i = 0; i < myCart.size(); i++) {
      CartItem myItem = myCart.get(i);
      Book myBook = bookRepository.getBookByBookId(myItem.getBookId());

      BigDecimal amount=new BigDecimal(myItem.getAmount().toString());
      if (myItem.getAmount() > myBook.getInventory()) {
        continue;
      } else {
        orderItemRepository.addItem(myOrder.getOrderId(), myBook.getBookId(), myItem.getAmount(),
             amount.multiply(myBook.getPrice()));    //增加订单项
      }
    }
  }


}
