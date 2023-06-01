import stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeClient = stripe(stripeSecretKey);

export default async (req, res) => {
  const { items, email } = req.body;

  // Create an array of line items based on the items received
  const lineItems = items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.title,
      },
      unit_amount: item.price * 100, // Stripe expects the amount in cents
    },
    quantity: item.quantity,
  }));

  try {
    // Create a checkout session with the line items
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://example.com/success',
      cancel_url: 'https://example.com/cancel',
      customer_email: email,
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the checkout session' });
  }
};
