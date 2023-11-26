import { NextRequest, NextResponse } from "next/server";

// lib
import db from "@/lib/db";
import redis from "@/lib/redis";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const startTime = performance.now()
    const cachedUser = await redis.get(`user.${params.id}`)

    if(cachedUser) {
      const endTime = performance.now()
      const timer = ((endTime - startTime) / 1000).toFixed(2)
      return new NextResponse(`fetched ${JSON.parse(cachedUser).name} from redis in ${timer}s`)
    }

    const user = await db.users.findFirst({
      where: {
        id: params.id
      }
    })

    if(!user) return new NextResponse("no user", { status: 400 })

    await redis.set(`user.${params.id}`, JSON.stringify(user))

    const endTime = performance.now()
    const timer = ((endTime - startTime) / 1000).toFixed(2)
    return new NextResponse(`fetched ${user.name} from database in ${timer}s`)
  }
  catch(error) {
    return NextResponse.json(error, { status: 500 })
  }
}