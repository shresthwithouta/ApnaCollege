import { connect } from "@/lib/db";
import User from "@/models/User";
import "@/models/Tags";
import Image from "next/image";
import { notFound } from "next/navigation";
import TagBadge from "@/components/TagBadge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminUserControls from "@/components/AdminUserControls";
import { FiSettings } from "react-icons/fi";
import BackButton from "@/components/BackButton";

type PopulatedTag = {
  _id: {
    toString(): string;
  };
  name: string;
  color?: string;
};

type Props = {
  params: Promise<{
    username: string;
  }>;
};

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params; // ✅ REQUIRED IN NEXT 15+
  if (!username) notFound();

  await connect();
  const session = await getServerSession(authOptions);

  const user = await User.findOne({ username })
    .select("name username bio image banner tags role email gifAllowed")
    .populate("tags", "name color")
    .lean();

  if (!user) notFound();

  const tags = (user.tags ?? []) as PopulatedTag[];
  const isAdmin = session?.user?.role === "admin";

  return (
    <div className="flex  flex-col justify-center items-center gap-6 py-12 px-4">
      
      <div className="relative w-full max-w-2xl rounded-2xl border border-[#A19379] bg-white shadow-xl overflow-visible">

       
        {isAdmin && (
          <div className="absolute top-4 right-4 z-30">
            <details className="relative">
              <summary
                aria-label="Admin actions"
                className="list-none cursor-pointer rounded-full p-2 hover:bg-[#B3B491]/40 transition"
              >
                <FiSettings size={18} />
              </summary>

              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-[#A19379] bg-[#FEFAE0] p-4 shadow-xl">
                <p className="text-sm font-semibold text-[#381D03]">
                  Admin controls
                </p>

                <p className="mt-2 text-xs text-[#736046]">
                  Email: {user.email}
                </p>
                <p className="text-xs text-[#736046]">
                  Role: {user.role}
                </p>

                <div className="mt-4">
                  <AdminUserControls
                    user={{
                      _id: user._id.toString(),
                      email: user.email,
                      role: user.role,
                      gifAllowed: user.gifAllowed,
                    }}
                  />
                </div>
              </div>
            </details>
            
          </div>
        )}

      
        <div className="relative h-44 w-full rounded-t-2xl overflow-hidden bg-[#B3B491]">
          {user.banner && (
            <Image
              src={user.banner}
              alt="Banner"
              fill
              className="object-cover"
            />
          )}
        </div>

      
        <div className="absolute left-8 top-28">
          <div className="relative h-28 w-28 rounded-full border-4 border-white bg-[#FEFAE0] overflow-hidden">
            <Image
              src={user.image || "/avatar-placeholder.png"}
              alt={user.username}
              fill
              className="object-cover"
            />
          </div>
        </div>

        
        <div className="pt-20 px-8 pb-8 space-y-6">
          <div>
            <h1 className="text-2xl font-extrabold text-[#381D03]">
              {user.name}
            </h1>
            <p className="text-sm text-[#736046]">
              @{user.username}
            </p>
          </div>

          {user.bio && (
            <div>
              <h2 className="text-sm font-semibold text-[#381D03] mb-1">
                About
              </h2>
              <p className="text-sm text-[#381D03] leading-relaxed">
                {user.bio}
              </p>
            </div>
          )}

          {tags.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-[#381D03] mb-2">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <TagBadge
                    key={tag._id.toString()}
                    name={tag.name}
                    color={tag.color}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="" >
        <BackButton />
      </div>
    </div>
  );
}
