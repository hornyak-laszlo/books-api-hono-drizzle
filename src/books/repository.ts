import { type InferSelectModel, type InferInsertModel, eq } from 'drizzle-orm';
import { db } from '../lib/db'
import { book, genresOnBooks } from '../lib/schema';

export type Book = InferSelectModel<typeof book>
export type CreateBookInput = InferInsertModel<typeof book> & { genres: string[] }
export type UpdateBookInput = {
    price: string,
    inStock: boolean,
}

export const createBook = async (data: CreateBookInput): Promise<Book> => {
        const [createdBook] = await db.insert(book).values(data).returning()

        const genresOnBooksData = data.genres.map(genreId => ({
            bookId: createdBook.id,
            genreId: genreId
        }))
        await db.insert(genresOnBooks).values(genresOnBooksData)

    
    return createdBook
}

export const findAllBooks = async (): Promise<
(Book & {
    genresOnBooks: {
        bookId: string;
        genreId: string;
        genre: {
            id: string;
            createdAt: Date;
            name: string;
        };
    }[];
})[]> => {
    const books = await db.query.book.findMany({
        with: {
            genresOnBooks: {
                with: {
                    genre: true,
                },
            },
        },
    })
    return books
}

export const findBookById = async (id: string): Promise<(Book & {
    genresOnBooks: {
        bookId: string;
        genreId: string;
        genre: {
            id: string;
            createdAt: Date;
            name: string;
        };
    }[];
    reviews: {
        id: string;
        bookId: string;
        rating: number;
        text: string;
        createdAt: Date;
        updatedAt: Date;
    }[];
}) | null> => {
    const book = await db.query.book.findFirst({
        where: (book, { eq }) => eq(book.id, id),
        with: {
            genresOnBooks: {
                with: {
                    genre: true,
                },
            },
            reviews: true,
        },
    })
    return book ?? null
}

export const updateBook = async (id: string, data: UpdateBookInput): Promise<Book> => {
    const [updatedBook] = await db.update(book).set(data).where(eq(book.id, id)).returning()
    return updatedBook
}

export const removeBook = async (id: string): Promise<void> => {
    await db.delete(book).where(eq(book.id, id))
}
