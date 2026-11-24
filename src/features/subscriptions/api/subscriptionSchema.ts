import { z } from 'zod';
import { SUBSCRIPTION_STATUSES, type Subscription } from '../model/types';

export const subscriptionSchema = z.object({
    id: z.string().min(1),
    customerName: z.string().min(1),
    productName: z.string().min(1),
    status: z.enum(SUBSCRIPTION_STATUSES),
    quantity: z.number().int().positive(),
    monthlyCost: z.number().nonnegative(),
    renewalDate: z.iso.date(),
}) satisfies z.ZodType<Subscription>;


export const subscriptionsSchema = z.array(subscriptionSchema);
