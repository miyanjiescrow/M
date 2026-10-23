import { pgTable, serial, text, integer, timestamp, boolean, decimal, uuid } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').notNull().default('employer'), // employer, freelancer, arbitrator, ambassador
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contracts = pgTable('contracts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(), // Integer cents/tomans
  status: text('status').notNull().default('draft'), // draft, awaiting_payment, active, completed, in_dispute
  buyerId: uuid('buyer_id').references(() => users.id).notNull(),
  sellerId: uuid('seller_id').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const contractHistory = pgTable('contract_history', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractId: uuid('contract_id').references(() => contracts.id).notNull(),
  event: text('event').notNull(),
  actor: text('actor').notNull(), // 'buyer', 'seller', 'system', 'arbitrator'
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const transactions = pgTable('transactions', {
  id: uuid('id').primaryKey().defaultRandom(),
  contractId: uuid('contract_id').references(() => contracts.id),
  type: text('type').notNull(), // lock, release, payout
  amount: decimal('amount', { precision: 15, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
