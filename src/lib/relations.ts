import { relations } from 'drizzle-orm/relations'
import { book, genre, genresOnBooks, review } from './schema'
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
