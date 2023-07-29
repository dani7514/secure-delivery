const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (items) => {
    return await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: items.map((item) => ({
            price_data: {
                currency: 'INR',
                product_data: {
                    name: item.food.name,
                    images: []
                },
                unit_amount: item.food.price * 100
            },
            quantity: item.quantity
        })),
        mode: 'payment',
        success_url: 'https://gorana-food-house.vercel.app/payment-success',
        cancel_url: 'https://gorana-food-house.vercel.app/payment-failed'
    });
};

exports.retrieveCheckoutSession = async (c_id) => {
    return await stripe.checkout.sessions.retrieve(c_id);
};

exports.retrievePaymentIntent = async (paymentIntentId) => {
    return await stripe.paymentIntents.retrieve(paymentIntentId);
};
