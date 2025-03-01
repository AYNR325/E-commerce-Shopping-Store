require('dotenv').config();
const Stripe=require("stripe")

const stripe=Stripe(process.env.STRIPE_SECRET_KEY)
console.log('Stripe API Key:', process.env.STRIPE_SECRET_KEY);

module.exports=stripe