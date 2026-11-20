import { SAMPLE_GIG_GROUPS } from "@/constants";
import OngoingCard from "./OngoingCard";

const OngoingSection = () => {
  const ongoingGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "ongoing")?.gigs ?? [];
  return (
    <section className="flex w-full gap-4 overflow-x-scroll pb-2">
      {ongoingGigs.map(({ id, startedAt, title, blurb, deadline }) => (
        <OngoingCard
          key={id}
          id={id}
          startedAt={startedAt}
          title={title}
          blurb={blurb}
          deadline={deadline}
        />
      ))}
    </section>
  );
};

export default OngoingSection;
