const CartWidget = () => {
  // En un futuro, el número podría venir del estado global o de una API
  const itemsInCart = 0;

  return (
    <button className="cart-btn" aria-label="Carrito de compras">
      <span className="cart-icon" role="img" aria-hidden>🛒</span>
      <span className="cart-count" aria-live="polite">{itemsInCart}</span>
    </button>
  );
};

export default CartWidget;