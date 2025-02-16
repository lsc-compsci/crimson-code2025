import clientPromise from "@/lib/utils/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
    const { username, password } = await req.json();
    const client = await clientPromise;
    const db = client.db("bl4nk");

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.collection("users").insertOne({ username, password: hashedPassword });

    return new Response(JSON.stringify({ message: "User created", userId: result.insertedId }), {
        status: 201,
        headers: { "Content-Type": "application/json" }
    });
}