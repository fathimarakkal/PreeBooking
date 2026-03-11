import { useState } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './index.css';
import logo from './assets/Yoode.svg';
const productsList = [
  "cricket kit",
  "Football kit",
  "Volleyball kit",
  "Basketball kit",
  "Throwball kit",
  "Other",
];

const gendersList = ["Male", "Female"];

function App() {
  const [cartItems, setCartItems] = useState([]);
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    customerName: '',
    company: '',
    phone: '',
    eventName: '',
    orderDate: getTodayDate(),
    deliveryDate: '',
    pickupMethod: '',
    product: '',
    quantity: '',
    gender: '',
    paymentMethod: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    if (!formData.product || !formData.quantity || !formData.gender) {
      alert("Please select product, quantity, and gender.");
      return;
    }
    const newItem = {
      product: formData.product,
      quantity: formData.quantity,
      gender: formData.gender
    };
    setCartItems(prev => [...prev, newItem]);
    /*  alert(`${formData.quantity}x ${formData.product} added to cart!`); */
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
    // setCartItems([]); // Uncomment to clear cart after proceed, but keeping to allow PDF download.
  };

  const handleRemoveItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Brand Colors
    const primaryColor = [242, 102, 34]; // Yoode Orange
    const darkGray = [51, 51, 51];
    const lightGray = [240, 240, 240];

    // Fetch and Draw Logo from DOM
    const logoImg = document.querySelector('.brand-logo');
    let shiftY = 0;
    if (logoImg) {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = logoImg.width * 3 || 300;
        canvas.height = logoImg.height * 3 || 100;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(logoImg, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL('image/png', 1.0);

        const imgWidth = 70;
        const imgHeight = (canvas.height / canvas.width) * imgWidth;
        const imgX = (210 - imgWidth) / 2;
        doc.addImage(imgData, 'PNG', imgX, 10, imgWidth, imgHeight);

        shiftY = Math.max(imgHeight + 20, 30);
      } catch (e) {
        console.error("Logo addition failed: ", e);
      }
    }

    // Header Background
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, shiftY, 210, 30, 'F');

    // Header Title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    const headerTitle = "INVOICE";
    const titleWidth = doc.getTextWidth(headerTitle);
    const titleX = (210 - titleWidth) / 2;
    doc.text(headerTitle, titleX, shiftY + 19);

    // Header Dates
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const orderDateText = `Order Date: ${formData.orderDate}`;
    doc.text(orderDateText, 196 - doc.getTextWidth(orderDateText), shiftY + 12);
    const deliveryDateText = `Delivery Date: ${formData.deliveryDate || 'N/A'}`;
    doc.text(deliveryDateText, 196 - doc.getTextWidth(deliveryDateText), shiftY + 18);

    // Section 1: Customer Details
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Customer Details", 14, shiftY + 45);

    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(0.5);
    doc.line(14, shiftY + 47, 95, shiftY + 47);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Name:`, 14, shiftY + 55);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.customerName || 'N/A'}`, 35, shiftY + 55);

    doc.setFont('helvetica', 'normal'); doc.text(`Company:`, 14, shiftY + 62);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.company || 'N/A'}`, 35, shiftY + 62);

    doc.setFont('helvetica', 'normal'); doc.text(`Phone:`, 14, shiftY + 69);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.phone || 'N/A'}`, 35, shiftY + 69);

    doc.setFont('helvetica', 'normal'); doc.text(`Event:`, 14, shiftY + 76);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.eventName || 'N/A'}`, 35, shiftY + 76);

    // Section 2: Order Information
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("Order Information", 110, shiftY + 45);
    doc.line(110, shiftY + 47, 196, shiftY + 47);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal'); doc.text(`Pickup Method:`, 110, shiftY + 55);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.pickupMethod === 'store' ? 'Store Pickup' : formData.pickupMethod === 'counter' ? 'Counter Pickup' : 'N/A'}`, 145, shiftY + 55);

    doc.setFont('helvetica', 'normal'); doc.text(`Payment:`, 110, shiftY + 62);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.paymentMethod ? formData.paymentMethod.toUpperCase() : 'N/A'}`, 145, shiftY + 62);

    doc.setFont('helvetica', 'normal'); doc.text(`Total Amount:`, 110, shiftY + 69);
    doc.setFont('helvetica', 'bold'); doc.text(`${formData.amount ? 'Rs. ' + formData.amount : 'N/A'}`, 145, shiftY + 69);

    // Itemized Table
    let finalY = shiftY + 85;
    if (cartItems.length > 0) {
      const tableColumn = ["Product", "Gender", "Quantity"];
      const tableRows = cartItems.map(item => [item.product, item.gender, item.quantity]);

      autoTable(doc, {
        startY: shiftY + 80,
        head: [tableColumn],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: primaryColor,
          textColor: 255,
          fontSize: 11,
          fontStyle: 'bold',
          halign: 'left'
        },
        bodyStyles: {
          fontSize: 10,
          textColor: darkGray,
        },
        alternateRowStyles: {
          fillColor: lightGray
        },
        margin: { left: 14, right: 14 }
      });

      finalY = doc.lastAutoTable.finalY + 15;

      const totalQty = cartItems.reduce((acc, item) => acc + parseInt(item.quantity, 10), 0);
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Total Quantity: ${totalQty}`, 196 - doc.getTextWidth(`Total Quantity: ${totalQty}`), finalY);

    } else {
      doc.setFont('helvetica', 'italic');
      doc.text("No items added to this order.", 14, shiftY + 80);
    }

    // Page Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(150, 150, 150);
      doc.text(`Generated on ${new Date().toLocaleString()}`, 14, 290);
      doc.text(`Page ${i} of ${pageCount}`, 196 - doc.getTextWidth(`Page ${i} of ${pageCount}`), 290);
    }

    doc.save(`Invoice_${formData.customerName || 'Order'}.pdf`);
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
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" name="eventName" placeholder="Event Name" value={formData.eventName} onChange={handleChange} />
            </div>
            <div className="row-group">
              <div className="form-group date-input-container">
                <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: "4px" }}>Order Date</label>
                <input className="date-input" type="date" name="orderDate"
                  value={formData.orderDate}
                  onChange={handleChange} title="Order Date" />
              </div>
              <div className="form-group date-input-container">
                <label style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginLeft: "4px" }}>Delivery Date</label>
                <input className="date-input" type="date" name="deliveryDate"
                  min={formData.orderDate}
                  value={formData.deliveryDate}
                  onChange={handleChange} title="Delivery Date" />
              </div>
            </div>
            <div className="form-group">
              <select name="pickupMethod" value={formData.pickupMethod} onChange={handleChange}>
                <option value="" disabled>Pickup Method</option>
                <option value="store">Store Pickup</option>
                <option value="counter">Counter Pickup</option>
              </select>
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
              <div className="form-group">
                <input type="number" name="quantity" placeholder="Quantity" min="1" value={formData.quantity} onChange={handleChange} />
              </div>
              <div className="form-group">
                <select name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="" disabled>Gender</option>
                  {gendersList.map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
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
                            <span>Gender: <strong>{item.gender}</strong></span>
                            <span>Qty: <strong>{item.quantity}</strong></span>
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


            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={handleProceed} style={{ width: "100%", padding: "16px 24px", fontSize: "1.1rem" }}>Proceed to Order</button>
              <button onClick={handleDownloadPDF} style={{ width: "100%", padding: "12px 24px", fontSize: "1rem", backgroundColor: "var(--bg-card)", color: "var(--primary)", border: "1px solid var(--primary)" }}>Download PDF</button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;
