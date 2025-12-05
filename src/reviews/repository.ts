import { eq, type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { db } from '../lib/db'
import { review } from '../lib/schema'

export type Review = InferSelectModel<typeof review>
export type CreateReviewInput = InferInsertModel<typeof review>

export const createReview = async (
  data: CreateReviewInput,
): Promise<Review> => {
  const [createdReview] = await db.insert(review).values(data).returning()
  return createdReview
}

export const findReviewById = async (id: string): Promise<Review | null> => {
  const review = await db.query.review.findFirst({
    where: (review, { eq }) => eq(review.id, id),
  })
  return review ?? null
}

export const removeReview = async (id: string): Promise<void> => {
  await db.delete(review).where(eq(review.id, id))
}
