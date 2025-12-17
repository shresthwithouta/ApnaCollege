type Props = {
  name: string;
  color?: string;
};

export default function TagBadge({ name, color }: Props) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium border"
      style={{
        backgroundColor: color || "#B3B491", 
        color: "#381D03",                   
        borderColor: "#A19379",
      }}
    >
      {name}
    </span>
  );
}
