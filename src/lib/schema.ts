import { relations } from 'drizzle-orm'
import {
  boolean,
  decimal,
  integer,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'

export const review = pgTable('Review', {
  id: text().primaryKey().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  bookId: text()
    .notNull()
    .references(() => book.id, { onDelete: 'cascade' }),
  rating: integer().notNull(),
  text: text().notNull(),
})

export const book = pgTable('Book', {
  id: text().primaryKey().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  title: text().notNull(),
  isbn: text().notNull().unique(),
  publishedAt: timestamp({ withTimezone: true }).notNull(),
  price: decimal().notNull(),
  inStock: boolean().notNull(),
})

export const genre = pgTable('Genre', {
  id: text().primaryKey().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  name: text().notNull().unique(),
})

export const genresOnBooks = pgTable('GenresOnBooks', {
  bookId: text()
    .notNull()
    .references(() => book.id, { onDelete: 'cascade' }),
  genreId: text()
    .notNull()
    .references(() => genre.id, { onDelete: 'restrict' }),
})

export const reviewRelations = relations(review, ({ one }) => ({
  book: one(book, {
    fields: [review.bookId],
    references: [book.id],
  }),
}))

export const bookRelations = relations(book, ({ many }) => ({
  reviews: many(review),
  genresOnBooks: many(genresOnBooks),
}))

export const genresOnBooksRelations = relations(genresOnBooks, ({ one }) => ({
  book: one(book, {
    fields: [genresOnBooks.bookId],
    references: [book.id],
  }),
  genre: one(genre, {
    fields: [genresOnBooks.genreId],
    references: [genre.id],
  }),
}))

export const genreRelations = relations(genre, ({ many }) => ({
  genresOnBooks: many(genresOnBooks),
}))
