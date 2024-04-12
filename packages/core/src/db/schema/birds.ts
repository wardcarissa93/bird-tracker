import {
    pgTable,
    text,
    varchar,
    timestamp,
    serial,
    date,
    index
  } from "drizzle-orm/pg-core";
  
export const birds = pgTable(
    "birds", 
    {
        id: serial("id").primaryKey(),
        userId: text("user_id").notNull(),
        species: varchar("species", { length: 100 }).notNull(),
        location: varchar("location", { length: 100 }).notNull(),
        date: date("date").notNull(),
        imageUrl: text("image_url"),
        createdAt: timestamp("created_at", { withTimezone: true })
        .notNull()
        .defaultNow(),
    },
    (table) => {
        return {
            nameIdx: index("userId_idx").on(table.userId)
    };
  },
);