import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, Grid, List, X, Minus, Plus, CheckCircle } from 'lucide-react';

// Mock product data
const productsData = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-fidelity audio with comfortable over-ear design and long-lasting battery.',
    price: 99.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Headphones',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smartwatch with Heart Rate Monitor',
    description: 'Track your fitness, receive notifications, and monitor your health with this sleek smartwatch.',
    price: 149.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Smartwatch',
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    description: 'Compact and powerful speaker with rich bass and crystal-clear sound, perfect for outdoor adventures.',
    price: 59.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Speaker',
    category: 'Audio',
  },
  {
    id: '4',
    name: 'Ergonomic Office Chair',
    description: 'Designed for ultimate comfort and support during long working hours. Adjustable features for personalized fit.',
    price: 249.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Office+Chair',
    category: 'Home Office',
  },
  {
    id: '5',
    name: '4K Ultra HD Smart TV',
    description: 'Immerse yourself in stunning visuals with vibrant colors and incredible detail. Smart features for endless entertainment.',
    price: 799.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Smart+TV',
    category: 'Electronics',
  },
  {
    id: '6',
    name: 'Stainless Steel Coffee Maker',
    description: 'Brew delicious coffee at home with this sleek and durable coffee maker. Programmable timer for convenience.',
    price: 79.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Coffee+Maker',
    category: 'Kitchen',
  },
  {
    id: '7',
    name: 'Noise-Cancelling Earbuds',
    description: 'Enjoy your music without distractions. Comfortable fit and exceptional sound quality for on-the-go listening.',
    price: 129.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Earbuds',
    category: 'Audio',
  },
  {
    id: '8',
    name: 'Gaming Laptop',
    description: 'Powerful performance for an immersive gaming experience. High-refresh-rate display and advanced cooling.',
    price: 1299.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Gaming+Laptop',
    category: 'Electronics',
  },
  {
    id: '9',
    name: 'Digital Camera',
    description: 'Capture stunning photos and videos with this easy-to-use digital camera. Multiple shooting modes for creativity.',
    price: 349.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Camera',
    category: 'Photography',
  },
  {
    id: '10',
    name: 'Robot Vacuum Cleaner',
    description: 'Effortlessly clean your home with this smart robot vacuum. Schedule cleanings and control from your smartphone.',
    price: 299.99,
    imageUrl: 'https://placehold.co/400x300/F0F4F8/333333?text=Robot+Vacuum',
    category: 'Home Appliances',
  },
];

// ProductCard Component
const ProductCard = ({ product, onAddToCart, viewMode }) => {
  const isGrid = viewMode === 'grid';
  return (
    <div className={`
      bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300
      ${isGrid ? 'flex flex-col' : 'flex flex-row items-center'}
      overflow-hidden border border-gray-200
    `}>
      <div className={`
        ${isGrid ? 'w-full h-48' : 'w-48 h-32 flex-shrink-0'}
        overflow-hidden rounded-t-xl ${!isGrid && 'rounded-l-xl rounded-t-none'}
      `}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/400x300/F0F4F8/333333?text=${encodeURIComponent(product.name.split(' ')[0])}`; }}
        />
      </div>
      <div className={`p-4 ${isGrid ? 'flex-grow' : 'flex-grow flex flex-col justify-center'}`}>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className={`flex ${isGrid ? 'flex-col' : 'flex-row justify-between items-center'} mt-auto`}>
          <span className="text-2xl font-bold text-indigo-600 mb-2">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product)}
            className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-md"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// ProductList Component
const ProductList = ({ products, onAddToCart, onGoToCart }) => {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [searchTerm, setSearchTerm] = useState('');

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    if (!searchTerm) {
      return products;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.description.toLowerCase().includes(lowerCaseSearchTerm) ||
        product.category.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [products, searchTerm]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold text-gray-900">Our Products</h2>
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="Grid View"
            >
              <Grid size={24} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              title="List View"
            >
              <List size={24} />
            </button>
          </div>
          <button
            onClick={onGoToCart}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center space-x-2 shadow-md w-full sm:w-auto justify-center"
          >
            <ShoppingCart size={20} />
            <span>View Cart</span>
          </button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">No products found matching your search.</p>
      ) : (
        <div
          className={`
            grid gap-6
            ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}
          `}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} viewMode={viewMode} />
          ))}
        </div>
      )}
    </div>
  );
};

// CartItem Component
const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-sm p-4 mb-4 border border-gray-200 space-y-4 sm:space-y-0 sm:space-x-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/F0F4F8/333333?text=${encodeURIComponent(item.name.split(' ')[0])}`; }}
      />
      <div className="flex-grow text-center sm:text-left">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-gray-600 text-sm">${item.price.toFixed(2)} each</p>
        <div className="flex items-center justify-center sm:justify-start mt-2 space-x-2">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          <span className="font-medium text-gray-800">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <div className="text-right flex flex-col items-center sm:items-end mt-4 sm:mt-0">
        <span className="text-xl font-bold text-indigo-600 mb-2">${(item.price * item.quantity).toFixed(2)}</span>
        <button
          onClick={() => onRemoveItem(item.id)}
          className="text-red-500 hover:text-red-700 transition-colors duration-200 p-1 rounded-full bg-red-100 hover:bg-red-200"
          title="Remove item"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

// Cart Component
const Cart = ({ cart, onUpdateCartItemQuantity, onRemoveFromCart, onProceedToCheckout, onGoToProducts }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.00 : 0; // Example shipping fee
  const taxRate = 0.08; // 8% tax
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-3xl font-bold text-gray-900">Your Shopping Cart</h2>
        <button
          onClick={onGoToProducts}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 shadow-md w-full sm:w-auto"
        >
          Continue Shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600 text-lg mt-10">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {cart.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateCartItemQuantity}
                onRemoveItem={onRemoveFromCart}
              />
            ))}
          </div>
          <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 text-gray-700">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({taxRate * 100}%):</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between text-xl font-bold text-indigo-700">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={onProceedToCheckout}
              className="mt-6 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold shadow-md"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Checkout Component
const Checkout = ({ cart, onPlaceOrder, onGoToCart, onGoToProducts }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 5.00 : 0;
  const taxRate = 0.08;
  const tax = subtotal * taxRate;
  const total = subtotal + shipping + tax;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Information (Placeholder) */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Shipping Information</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input type="text" id="city" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" placeholder="Anytown" />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State</label>
                <input type="text" id="state" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" placeholder="CA" />
              </div>
              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP Code</label>
                <input type="text" id="zip" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2" placeholder="90210" />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Summary</h3>
          <div className="space-y-3 text-gray-700">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-gray-300 pt-3 mt-3 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax ({taxRate * 100}%):</span>
                <span className="font-semibold">${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-300 pt-3 mt-3 flex justify-between text-xl font-bold text-indigo-700">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 mt-6">
            <button
              onClick={onPlaceOrder}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold shadow-md"
            >
              Confirm Order & Pay
            </button>
            <button
              onClick={onGoToCart}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-lg shadow-md"
            >
              Back to Cart
            </button>
            <button
              onClick={onGoToProducts}
              className="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-lg shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// PaymentSimulation Component
const PaymentSimulation = ({ onPaymentSuccess, onPaymentFailure }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Simulate API call for payment
    const timer = setTimeout(() => {
      // Randomly simulate success or failure
      const success = Math.random() > 0.1; // 90% success rate
      if (success) {
        setIsSuccess(true);
        onPaymentSuccess();
      } else {
        setErrorMessage('Payment failed. Please try again.');
        onPaymentFailure();
      }
      setIsLoading(false);
    }, 2000); // Simulate 2 seconds loading

    return () => clearTimeout(timer);
  }, [onPaymentSuccess, onPaymentFailure]);

  return (
    <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-100px)]">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200 w-full max-w-md">
        {isLoading && (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500 mx-auto mb-6"></div>
            <p className="text-xl font-semibold text-gray-800">Processing your payment...</p>
            <p className="text-gray-600 mt-2">Please do not close this window.</p>
          </>
        )}
        {!isLoading && isSuccess && (
          <>
            <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-green-700 mb-3">Payment Successful!</h3>
            <p className="text-gray-700">Your order has been placed successfully.</p>
          </>
        )}
        {!isLoading && !isSuccess && (
          <>
            <X size={64} className="text-red-500 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-red-700 mb-3">Payment Failed!</h3>
            <p className="text-gray-700 mb-4">{errorMessage}</p>
            <button
              onClick={onPaymentFailure} // This will just navigate back, could be retried
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold shadow-md"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [currentPage, setCurrentPage] = useState('products'); // 'products', 'cart', 'checkout', 'paymentProcessing', 'paymentSuccess'
  const [cart, setCart] = useState([]);

  // Add item to cart
  const handleAddToCart = (productToAdd) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === productToAdd.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...productToAdd, quantity: 1 }];
      }
    });
  };

  // Update quantity of item in cart
  const handleUpdateCartItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        return prevCart.filter((item) => item.id !== productId);
      }
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Navigate functions
  const goToProducts = () => setCurrentPage('products');
  const goToCart = () => setCurrentPage('cart');
  const goToCheckout = () => setCurrentPage('checkout');
  const goToPaymentProcessing = () => setCurrentPage('paymentProcessing');
  const goToPaymentSuccess = () => {
    setCart([]); // Clear cart after successful payment
    setCurrentPage('paymentSuccess');
  };
  const goToPaymentFailure = () => setCurrentPage('checkout'); // Go back to checkout on failure

  // Render content based on current page
  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return (
          <ProductList
            products={productsData}
            onAddToCart={handleAddToCart}
            onGoToCart={goToCart}
          />
        );
      case 'cart':
        return (
          <Cart
            cart={cart}
            onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onProceedToCheckout={goToCheckout}
            onGoToProducts={goToProducts}
          />
        );
      case 'checkout':
        return (
          <Checkout
            cart={cart}
            onPlaceOrder={goToPaymentProcessing}
            onGoToCart={goToCart}
            onGoToProducts={goToProducts}
          />
        );
      case 'paymentProcessing':
        return (
          <PaymentSimulation
            onPaymentSuccess={goToPaymentSuccess}
            onPaymentFailure={goToPaymentFailure}
          />
        );
      case 'paymentSuccess':
        return (
          <div className="flex flex-col items-center justify-center p-6 min-h-[calc(100vh-100px)]">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center border border-gray-200 w-full max-w-md">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-green-700 mb-3">Order Confirmed!</h3>
              <p className="text-gray-700 mb-6">Thank you for your purchase. Your order will be processed shortly.</p>
              <button
                onClick={goToProducts}
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-lg font-semibold shadow-md"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter antialiased">
      {/* The script and link tags for Tailwind and Inter font are now in public/index.html for better practice. */}
      {/* The custom scrollbar styles are now in index.css for better practice. */}

      {/* Header */}
      <header className="bg-white shadow-md py-4 px-6 flex flex-col sm:flex-row justify-between items-center rounded-b-xl space-y-4 sm:space-y-0">
        <h1 className="text-3xl font-extrabold text-indigo-700">E-Store</h1>
        <nav className="flex space-x-6">
          <button
            onClick={goToProducts}
            className={`text-lg font-medium transition-colors duration-200 ${
              currentPage === 'products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            Products
          </button>
          <button
            onClick={goToCart}
            className={`text-lg font-medium transition-colors duration-200 flex items-center space-x-1 ${
              currentPage === 'cart' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-600 hover:text-indigo-600'
            }`}
          >
            <ShoppingCart size={20} />
            <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})</span>
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;
