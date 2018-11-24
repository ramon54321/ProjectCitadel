import * as Stripe from 'stripe'
import config from './config'
import { logPayments } from './logger/logger';
import { LogLevel } from './logger/logLevel';

const stripe = Stripe(config.stripeApiKey)

export async function createCustomer(token: string, email: string) {
  try {
    const customer = await stripe.customers.create({
      source: token,
      email: email,
    })
    return customer
  } catch (error) {
    logPayments(error, LogLevel.Error)
    return undefined
  }
}

export async function createCharge(token: string, amount: number) {
  try {
    const charge = await stripe.charges.create({
      source: token,
      amount: amount,
    })
    return charge
  } catch (error) {
    logPayments(error, LogLevel.Error)
    return undefined
  }
}
