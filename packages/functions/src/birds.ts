import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

import { birds, birds as birdsTable } from '@bird-tracker/core/db/schema/birds';
import { db } from "@bird-tracker/core/db";
import { sum, eq, desc} from "drizzle-orm";

import { authMiddleware } from "@bird-tracker/core/auth";

const app = new Hono();

app.get("/birds", authMiddleware, async (c) => {
    const userId = c.var.userId;
    const birds = await db
        .select()
        .from(birdsTable)
        .where(eq(birdsTable.userId, String(userId)))
        .orderBy(desc(birdsTable.date));
    return c.json({ birds });
});

app.post("/birds", authMiddleware, async (c) => {
    const userId = c.var.userId;
    const body = await c.req.json();
    const bird = {
        ...body.bird,
        userId,
    };
    const newBird = await db.insert(birdsTable).values(bird).returning()
    return c.json({ birds: newBird });
});

export const handler = handle(app);