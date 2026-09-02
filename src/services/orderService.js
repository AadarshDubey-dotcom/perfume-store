import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { db } from './firebase';

export async function createOrder({ name, address, phone, city, postalCode, paymentMethod, items, product, quantity, user, shipping, total }) {
  const orderReference = doc(collection(db, 'orders'));
  const order = {
    orderId: orderReference.id,
    name,
    address,
    phone,
    city,
    postalCode,
    paymentMethod,
    items,
    product,
    quantity: Number(quantity),
    shipping,
    total,
    userId: user.uid,
    userEmail: user.email,
    status: 'Pending',
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
      console.error('Order saved, but email notification failed:', error);
    }
  } else {
    console.warn('Order saved, but EmailJS is not configured. Add the VITE_EMAILJS_* variables to enable notifications.');
  }

  return { id: orderReference.id, emailSent };
}