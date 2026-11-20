import { SAMPLE_GIG_GROUPS } from "@/constants";
import FailedCard from "./FailedCard";

const FailedSection = () => {
  const failedGigs =
    SAMPLE_GIG_GROUPS.find((group) => group.status === "failed")?.gigs ?? [];
  return (
    <section className="flex w-full gap-4 overflow-x-scroll pb-2">
      {failedGigs.map(({ id, startedAt, title, blurb, deadline }) => (
        <FailedCard
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

export default FailedSection;
