import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from './firebase';

export async function createCodOrder({ name, address, phone, city, postalCode, paymentMethod = 'Cash on Delivery', items, product, quantity, user, shipping, total }) {
  const isCod = paymentMethod === 'Cash on Delivery';
  const storedPaymentMethod = isCod ? 'Cash on Delivery' : 'Razorpay Payment Link';
  const orderReference = doc(collection(db, 'orders'));
  const order = {
    orderId: orderReference.id,
    name,
    address,
    phone,
    city,
    postalCode,
    paymentMethod: storedPaymentMethod,
    items,
    product,
    quantity: Number(quantity),
    shipping,
    total,
    userId: user.uid,
    userEmail: user.email,
    status: isCod ? 'Pending Payment (COD)' : 'Payment Pending (Razorpay)',
    createdAt: serverTimestamp(),
  };

  await setDoc(orderReference, order);

  const emailConfig = [
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  ];
  let emailSent = false;

  if (emailConfig.every(Boolean)) {
    try {
      await emailjs.send(
        emailConfig[0],
        emailConfig[1],
        {
          to_email: 'harshpandat014@gmail.com',
          order_id: order.orderId,
          amount: `INR ${Number(order.total || 0).toFixed(2)}`,
          payment_method: order.paymentMethod,
          order_status: order.status,
          customer_name: order.name,
          delivery_address: order.address,
          mobile_number: order.phone,
          product_name: order.product,
          quantity: order.quantity,
          user_email: order.userEmail,
        },
        emailConfig[2],
      );
      emailSent = true;
    } catch (error) {
      console.error('Order saved, but EmailJS notification failed:', error);
    }
  }

  return { id: orderReference.id, emailSent };
}

export async function createOrder(orderData) {
  return createCodOrder(orderData);
}