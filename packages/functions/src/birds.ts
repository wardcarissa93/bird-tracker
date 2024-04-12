import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

import { birds as birdsTable } from '@bird-tracker/core/db/schema/birds';
import { db } from "@bird-tracker/core/db";
import { eq, desc } from "drizzle-orm";

import { authMiddleware } from '@bird-tracker/core/auth';

const app = new Hono();

// const fakeBirds = [
//     {
//         id: "1",
//         species: "Rock Dove",
//         location: "Downtown Vancouver",
//         date: "2024-03-20",
//     },
//     {
//         id: "2",
//         species: "Barred Owl",
//         location: "Stanley Park",
//         date: "2022-12-03",
//     },
//     {
//         id: "3",
//         species: "American Coot",
//         location: "Trout Lake",
//         date: "2024-03-07",
//     },
// ];

app.get("/birds", authMiddleware, async (c) => {
    const userId = c.var.userId;
    const birds = await db
        .select()
        .from(birdsTable)
        .where(eq(birdsTable.userId, userId))
        .orderBy(desc(birdsTable.date));
    return c.json({ birds });
});

app.post("/birds", authMiddleware, async (c) => {
    const userId = c.var.userId;
    const body = await c.req.json();
    const bird = {
        ...body,
        userId,
    };
    const newBird = await db.insert(birdsTable).values(bird).returning()
    return c.json({ birds: newBird });
});

export const handler = handle(app);