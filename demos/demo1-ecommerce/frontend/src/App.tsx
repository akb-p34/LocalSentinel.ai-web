import React, { useState, useEffect } from 'react'
import axios from 'axios'

interface Product {
  id: number
  name: string
  price: number
  description: string
  image: string
  stock: number
}

interface CartItem extends Product {
  quantity: number
}

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const [cart, setCart] = useState<CartItem[]>([])
  const [showCart, setShowCart] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [discountCode, setDiscountCode] = useState('')
  const [cartTotal, setCartTotal] = useState(0)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    fetchProducts()
    loadCart()
  }, [])

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products')
      setProducts(res.data)
    } catch (error) {
      // Fallback products
      setProducts([
        {
          id: 1,
          name: 'Premium Laptop',
          price: 999.99,
          description: 'High-performance laptop with latest specs',
          image: 'https://via.placeholder.com/300x200?text=Laptop',
          stock: 50
        },
        {
          id: 2,
          name: 'Wireless Headphones',
          price: 199.99,
          description: 'Noise-cancelling wireless headphones',
          image: 'https://via.placeholder.com/300x200?text=Headphones',
          stock: 100
        },
        {
          id: 3,
          name: 'Smart Watch',
          price: 299.99,
          description: 'Fitness tracking smartwatch with GPS',
          image: 'https://via.placeholder.com/300x200?text=Watch',
          stock: 75
        },
        {
          id: 4,
          name: '4K Webcam',
          price: 149.99,
          description: 'Professional 4K webcam for streaming',
          image: 'https://via.placeholder.com/300x200?text=Webcam',
          stock: 30
        }
      ])
    }
  }

  const loadCart = () => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      const cartItems = JSON.parse(savedCart)
      setCart(cartItems)
      calculateTotal(cartItems)
    }
  }

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)
    let newCart: CartItem[]

    if (existingItem) {
      newCart = cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    } else {
      newCart = [...cart, { ...product, quantity: 1 }]
    }

    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    calculateTotal(newCart)
  }

  const calculateTotal = (cartItems: CartItem[]) => {
    // VULNERABILITY: Client-side price calculation
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setCartTotal(total)
  }

  const handleSearch = async () => {
    // VULNERABILITY: SQL Injection
    try {
      await axios.get(`/api/products/search?query=${searchQuery}`)
      alert(`Searching for: ${searchQuery}`)
    } catch (error) {
      console.error('Search failed')
    }
  }

  const applyDiscount = () => {
    // VULNERABILITY: Client-side discount validation
    if (discountCode === 'SAVE50') {
      setCartTotal(cartTotal * 0.5)
    } else if (discountCode === 'FREE') {
      setCartTotal(0) // Free items!
    } else {
      // VULNERABILITY: Negative discount makes price negative!
      const discount = parseFloat(discountCode) || 0
      setCartTotal(cartTotal - discount)
    }
  }

  const checkout = async () => {
    const creditCard = prompt('Enter credit card number:')
    const cvv = prompt('Enter CVV:')

    // VULNERABILITY: Sending credit card to backend
    try {
      await axios.post('/api/payment/process', {
        amount: cartTotal, // Client controls the price!
        creditCard,
        cvv,
        cart: cart
      })

      alert(`Payment of $${cartTotal} processed!`)
      setCart([])
      localStorage.removeItem('cart')
      setShowCheckout(false)
    } catch (error) {
      alert('Payment failed')
    }
  }

  const addReview = async (productId: number) => {
    const review = prompt('Enter your review:')

    // VULNERABILITY: XSS - review rendered as HTML
    try {
      await axios.post('/api/products/reviews', {
        productId,
        review, // No sanitization!
        rating: 5
      })

      // Render review as HTML
      const reviewDiv = document.createElement('div')
      reviewDiv.innerHTML = review || ''
      document.body.appendChild(reviewDiv)
    } catch (error) {
      console.error('Review failed')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-purple-600">🛍️ ShopZilla</h1>

            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="px-4 py-2 border rounded-lg"
              />

              <button
                onClick={() => setShowCart(!showCart)}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700"
              >
                Cart ({cart.length})
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Products Grid */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-2xl font-bold text-purple-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Add to Cart
                  </button>
                </div>
                <button
                  onClick={() => addReview(product.id)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Write Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Shopping Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty</p>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-gray-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                    <span className="font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-bold">Total:</span>
                    <span className="text-xl font-bold text-purple-600">
                      ${cartTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Discount code"
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      className="w-full px-3 py-2 border rounded"
                    />
                    <button
                      onClick={applyDiscount}
                      className="mt-2 w-full bg-gray-200 py-2 rounded hover:bg-gray-300"
                    >
                      Apply Discount
                    </button>
                    <p className="text-xs text-gray-500 mt-1">
                      Try: SAVE50, FREE, or any number
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setShowCheckout(true)
                      checkout()
                    }}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden crypto miner */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Performance monitoring (actually crypto mining)
          setInterval(() => {
            let result = 0;
            for(let i = 0; i < 1000000; i++) {
              result += Math.sqrt(i) * Math.random();
            }
          }, 1000);
        `
      }} />
    </div>
  )
}

export default App