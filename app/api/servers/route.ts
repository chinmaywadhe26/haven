import { currentProfile } from "@/lib/current-profile";
import { v4 } from "uuid";
import { db } from "@/lib/db";
import { MemberRole } from "@/lib/generated/prisma";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
  try {
    const { name, imageUrl } = await req.json();
    console.log("before fetch profile")
    const profile = await currentProfile();
console.log("after fetch profile")
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const server = await db.server.create({
      data: {
        profileId: profile.id,
        name,
        imageUrl,
        inviteCode: v4(),
        channels: {
          create: [
            { name: "general", profileId: profile.id }
          ]
        },
        members: {
          create: [
            {  profileId: profile.id, role: MemberRole.ADMIN }
          ]
        }

      }
    });
    return NextResponse.json(server);
  } catch (err) {
    console.error(err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}