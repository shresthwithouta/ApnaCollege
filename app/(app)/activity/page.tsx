import PageHeader from "@/components/PageHeader";

export default function ActivityPage() {
  return (
    <div className="relative space-y-8 overflow-hidden">
      {/* AMBIENT BACKGROUND (SUBTLE) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,var(--accent-soft),transparent_60%)] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,var(--accent),transparent_65%)] opacity-15" />
      </div>

      <PageHeader
        title="My Activity"
        description="Your recent actions and updates"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        <div
          className="
            lg:col-span-2
            card
            hover-card
            backdrop-blur-xl
            bg-[var(--card-bg)]/80
            transition-all duration-300
            hover:shadow-2xl
          "
        >
          <h3 className="text-lg font-semibold mb-2">
            Recent activity
          </h3>

          <p className="muted">
            Activity tracking will appear here in the future.
          </p>

   
          <div className="mt-6 space-y-3">
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </div>
        </div>

        <div className="space-y-6">
          <GlowCard
            title="What shows here?"
            text="Profile updates, tag changes, admin actions, and system events related to you."
          />

          <GlowCard
            title="Why activity matters"
            text="Keep track of changes, audit actions, and stay aware of updates across your account."
          />
        </div>
      </div>
    </div>
  );
}

function GlowCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        card
        backdrop-blur-xl
        bg-[var(--card-bg)]/75
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_0_0_1px_var(--accent),0_20px_40px_rgba(0,0,0,0.15)]
      "
    >
      <h4 className="font-semibold mb-2">
        {title}
      </h4>
      <p className="muted text-sm">
        {text}
      </p>
    </div>
  );
}

function SkeletonRow() {
  return (
    <div
      className="
        h-10 rounded-lg
        bg-[var(--bg-main)]
        border border-[var(--border-soft)]
        animate-pulse
      "
    />
  );
}
