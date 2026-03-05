import { useState } from 'react';
import './index.css';
import logo from './assets/Yoode.svg';
const productsList = [
  "Men's Crew Neck Set-in Half Sleeve Jersey",
  "Men's Crew Neck Set-in Full Sleeve Jersey",
  "Men's Crew Neck Raglan Half Sleeve Jersey",
  "Men's Crew Neck Raglan Full Sleeve Jersey",
  "Men's V-Neck Set-in Half Sleeve Jersey",
  "Men's V-Neck Set-in Full Sleeve Jersey",
  "Men's V-Neck Raglan Half Sleeve Jersey",
  "Men's V-Neck Raglan Full Sleeve Jersey",
  "Men's Mandarin Collar Set-in Half Sleeve Jersey",
  "Men's Mandarin Collar Set-in Full Sleeve Jersey",
  "Men's Mandarin Collar Raglan Half Sleeve Jersey",
  "Men's Mandarin Collar Raglan Full Sleeve Jersey",
  "Men's Mandarin Collar Set-in Half Sleeve Jersey With Buttons",
  "Men's Mandarin Collar Set-in Full Sleeve Jersey With Buttons",
  "Men's Mandarin Collar Raglan Half Sleeve Jersey With Buttons",
  "Men's Mandarin Collar Raglan Full Sleeve Jersey With Buttons",
  "Men's Mandarin Collar Set-in Half Sleeve With Zipper Jersey",
  "Men's Mandarin Collar Set-in Full Sleeve With Zipper Jersey",
  "Men's Mandarin Collar Raglan Half Sleeve With Zipper Jersey",
  "Men's Mandarin Collar Raglan Full Sleeve With Zipper Jersey",
  "Men's Mandarin Collar Set-in Half Sleeve With YKK Zipper Jersey",
  "Men's Mandarin Collar Set-in Full Sleeve With YKK Zipper Jersey",
  "Men's Mandarin Collar Raglan Half Sleeve With YKK Zipper Jersey",
  "Men's Mandarin Collar Raglan Full Sleeve With YKK Zipper Jersey",
  "Men's Polo Set-in Half Sleeve Jersey",
  "Men's Polo Set-in Full Sleeve Jersey",
  "Men's Polo Raglan Half Sleeve Jersey",
  "Men's Polo Raglan Full Sleeve Jersey",
  "Men's Polo Self Collar With Stand Set-in Half Sleeve Jersey",
  "Men's Polo Self Collar With Stand Set-in Full Sleeve Jersey",
  "Men's Polo Self Collar With Stand Raglan Half Sleeve Jersey",
  "Men's Polo Self Collar With Stand Raglan Full Sleeve Jersey",
  "Men's Polo V-Neck Set-in Half Sleeve Jersey",
  "Men's Polo V-Neck Set-in Full Sleeve Jersey",
  "Men's Polo V-Neck Raglan Half Sleeve Jersey",
  "Men's Polo V-Neck Raglan Full Sleeve Jersey",
  "Men's Polo Set-in Half Sleeve With Zipper Jersey",
  "Men's Polo Set-in Full Sleeve With Zipper Jersey",
  "Men's Polo Raglan Half Sleeve With Zipper Jersey",
  "Men's Polo Raglan Full Sleeve With Zipper Jersey",
  "Men's Polo Set-in Half Sleeve With YKK Zipper Jersey",
  "Men's Polo Set-in Full Sleeve With YKK Zipper Jersey",
  "Men's Polo Raglan Half Sleeve With YKK Zipper Jersey",
  "Men's Polo Raglan Full Sleeve With YKK Zipper Jersey",
  "Men's Crew Neck Tank Top",
  "Men's V-Neck Tank Top",
  "Oversized Raglan Half Sleeve Jersey",
  "Oversized Set-in Half Sleeve Jersey",
  "Oversized Set-in Half Sleeve Button Jersey",
  "Oversized Raglan Half Sleeve Button Jersey",
  "Men's Football Shorts",
  "Men's Athletic Shorts",
  "Men's Track Pants",
  "Men's Track Pants - Superpoly 220 GSM",
  "Men's Athletic Shorts - Superpoly 220 GSM"
];

const sizesList = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    customerName: '',
    company: '',
    email: '',
    phone: '',
    eventName: '',
    orderDate: getTodayDate(),
    deliveryDate: '',
    shippingMethod: '',
    deliveryAddress: '',
    product: '',
    quantity: '',
    size: '',
    printingMethod: '',
    paymentMethod: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.quantity || !formData.size || !formData.printingMethod) {
      alert("Please select product, quantity, size, and printing method.");
      return;
    }
    const newItem = {
      product: formData.product,
      quantity: formData.quantity,
      size: formData.size,
      printingMethod: formData.printingMethod
    };
    setCartItems(prev => [...prev, newItem]);
    alert(`${formData.quantity}x ${formData.product} added to cart!`);
  };

  const handleProceed = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }
    if (!formData.customerName || !formData.phone || !formData.paymentMethod || !formData.amount) {
      alert("Please provide at least your Name, Phone, Payment Method, and Amount.");
      return;
    }
    alert(`Prebooking completed! Notification sent to: ${formData.phone}`);
    setCartItems([]);
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <header className="header">
        <img src={logo} alt="YOODE Logo" className="brand-logo" />
      </header>

      <main className="main-content">

        {/* Column 1: Customer Details */}
        <div className="column">
          <div className="card">
            <h2 className="card-title">Customer Details</h2>
            <div className="form-group">
              <input type="text" name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" name="company" placeholder="Company" value={formData.company} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} />
            </div>
          </div>
          <div className="card">
            <div className="row-group">
              <div className="form-group date-input-container">
                <input className="date-input" type="text" name="orderDate" placeholder="Order Date"
                  value={formData.orderDate}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                  onChange={handleChange} title="Order Date" />
              </div>
              <div className="form-group date-input-container">
                <input className="date-input" type="text" name="deliveryDate" placeholder="Delivery Date"
                  value={formData.deliveryDate}
                  onFocus={(e) => e.target.type = 'date'}
                  onBlur={(e) => { if (!e.target.value) e.target.type = 'text'; }}
                  onChange={handleChange} title="Delivery Date" />
              </div>
            </div>
            <div className="form-group">
              <select name="shippingMethod" value={formData.shippingMethod} onChange={handleChange}>
                <option value="" disabled>Shipping Method</option>
                <option value="standard">Standard Shipping</option>
                <option value="express">Express Delivery</option>
                <option value="pickup">Local Pickup</option>
              </select>
            </div>
            <div className="form-group">
              <textarea name="deliveryAddress" placeholder="Delivery Address" value={formData.deliveryAddress} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* Column 2: Product Selection */}
        <div className="column">
          <div className="card">
            <h2 className="card-title">Product Selection</h2>
            <div className="form-group">
              <select name="product" value={formData.product} onChange={handleChange}>
                <option value="" disabled>Products</option>
                {productsList.map(prod => <option key={prod} value={prod}>{prod}</option>)}
              </select>
            </div>
            <div className="row-group">
              <div className="form-group" style={{ flex: 2 }}>
                <input type="number" name="quantity" placeholder="Quantity" min="1" value={formData.quantity} onChange={handleChange} />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <select name="size" value={formData.size} onChange={handleChange}>
                  <option value="" disabled>Size</option>
                  {sizesList.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <select name="printingMethod" value={formData.printingMethod} onChange={handleChange}>
                <option value="" disabled>Printing Method</option>
                <option value="aop">AOP</option>
                <option value="other">Other Printing Method</option>
              </select>
            </div>
            <button onClick={handleAddToCart} style={{ marginTop: "8px" }}>Add to Cart</button>
            <div className="cart-items-container">
              {cartItems.length > 0 ? (
                <>
                  <div className="cart-items-list">
                    {cartItems.map((item, index) => (
                      <div key={index} className="cart-item">
                        <div className="cart-item-details">
                          <p className="cart-item-title">{item.product}</p>
                          <div className="cart-item-meta">
                            <span>Size: <strong>{item.size}</strong></span>
                            <span>Qty: <strong>{item.quantity}</strong></span>
                            <span className="print-method">Print: <strong>{item.printingMethod === 'aop' ? 'AOP' : 'Other'}</strong></span>
                          </div>
                        </div>
                        <button className="remove-btn" onClick={() => handleRemoveItem(index)} title="Remove Item">✕</button>
                      </div>
                    ))}
                  </div>
                  <div className="cart-total">
                    Total Items: {cartItems.reduce((acc, item) => acc + parseInt(item.quantity, 10), 0)}
                  </div>
                </>
              ) : (
                <div className="summary-text">Your cart is empty</div>
              )}
            </div>
          </div>
        </div>

        {/* Column 3: Payment */}
        <div className="column">
          <div className="card">
            <h2 className="card-title">Payment</h2>
            <div className="form-group">
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <option value="" disabled>Payment Method</option>
                <option value="upi">UPI / QR Code</option>
                <option value="card">Credit/Debit Card</option>
                <option value="bank">Bank Transfer</option>
                <option value="cash">Cash in Hand</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="number"
                name="amount"
                placeholder="Amount (₹)"
                min="0"
                value={formData.amount}
                onChange={handleChange}
              />
            </div>


            <div style={{ marginTop: "20px" }}>
              <button onClick={handleProceed} style={{ width: "100%", padding: "16px 24px", fontSize: "1.1rem" }}>Proceed to Order</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
