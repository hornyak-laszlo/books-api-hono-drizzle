CREATE TABLE "Book" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"title" text NOT NULL,
	"isbn" text NOT NULL,
	"publishedAt" timestamp with time zone NOT NULL,
	"price" numeric NOT NULL,
	"inStock" boolean NOT NULL,
	CONSTRAINT "Book_isbn_unique" UNIQUE("isbn")
);
--> statement-breakpoint
CREATE TABLE "Genre" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "Genre_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "GenresOnBooks" (
	"bookId" text NOT NULL,
	"genreId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Review" (
	"id" text PRIMARY KEY NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	"bookId" text NOT NULL,
	"rating" integer NOT NULL,
	"text" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_bookId_Book_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "GenresOnBooks" ADD CONSTRAINT "GenresOnBooks_genreId_Genre_id_fk" FOREIGN KEY ("genreId") REFERENCES "public"."Genre"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Review" ADD CONSTRAINT "Review_bookId_Book_id_fk" FOREIGN KEY ("bookId") REFERENCES "public"."Book"("id") ON DELETE cascade ON UPDATE no action;