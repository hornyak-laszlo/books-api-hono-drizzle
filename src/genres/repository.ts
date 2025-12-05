import { eq, type InferInsertModel, type InferSelectModel } from 'drizzle-orm'
import { db } from '../lib/db'
import { genre } from '../lib/schema'

export type Genre = InferSelectModel<typeof genre>
export type CreateGenreInput = InferInsertModel<typeof genre>

export const createGenre = async (data: CreateGenreInput): Promise<Genre> => {
  const [createdGenre] = await db.insert(genre).values(data).returning()
  return createdGenre
}

export const findAllGenres = async (): Promise<Genre[]> => {
  const genres = await db.query.genre.findMany()
  return genres
}

export const findGenreById = async (id: string): Promise<Genre | null> => {
  const genre = await db.query.genre.findFirst({
    where: (genre, { eq }) => eq(genre.id, id),
  })
  return genre ?? null
}

export const removeGenre = async (id: string): Promise<void> => {
  await db.delete(genre).where(eq(genre.id, id))
}
