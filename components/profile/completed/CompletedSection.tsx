import { SAMPLE_GIG_GROUPS } from "@/constants";
import CompletedCard from "./CompletedCard";

const CompletedSection = () => {
  const completedGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "completed")?.gigs ?? [];
  return (
    <section className="flex w-full gap-4 overflow-x-scroll pb-2">
      {completedGigs.map(({ id, startedAt, title, blurb, deadline }) => (
        <CompletedCard
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

export default CompletedSection;
