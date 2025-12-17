import { connect } from "@/lib/db";
import User from "@/models/User";
import PageHeader from "@/components/PageHeader";
import ExploreUsersGrid, {
  ExploreUser,
  ExploreTag,
} from "@/components/ExploreUsersGrid";
import "@/models/Tags";


type PopulatedTag = {
  _id: { toString(): string };
  name: string;
  color?: string;
};

export default async function ExplorePage() {
  await connect();

  const users = await User.find()
    .select("name username image role tags")
    .populate("tags", "name color")
    .lean();

  const mappedUsers: ExploreUser[] = users.map((u) => ({
    _id: u._id.toString(),
    name: u.name,
    username: u.username,
    image: u.image,
    role: u.role,
    tags: ((u.tags ?? []) as PopulatedTag[]).map(
      (t): ExploreTag => ({
        _id: t._id.toString(),
        name: t.name,
        color: t.color,
      })
    ),
  }));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Explore"
        description="Discover users and their skills"
      />

      <ExploreUsersGrid users={mappedUsers} />
    </div>
  );
}
