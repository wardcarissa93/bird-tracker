import { Hono } from 'hono';
import { handle } from 'hono/aws-lambda';

const app = new Hono();

const fakeBirds = [
    {
        id: "1",
        species: "Rock Dove",
        location: "Downtown Vancouver",
        date: "2024-03-20",
    },
    {
        id: "2",
        species: "Barred Owl",
        location: "Stanley Park",
        date: "2022-12-03",
    },
    {
        id: "3",
        species: "American Coot",
        location: "Trout Lake",
        date: "2024-03-07",
    },
];

app.get("/birds", (c) => {
    return c.json({ birds: fakeBirds });
});

app.post("/birds", async (c) => {
    const body = await c.req.json();
    const bird = body.bird;
    fakeBirds.push({
        ...bird,
        id: (fakeBirds.length + 1).toString(),
    })
    return c.json({ birds: fakeBirds });
});

export const handler = handle(app);