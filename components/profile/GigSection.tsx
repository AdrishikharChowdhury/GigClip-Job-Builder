import OngoingSection from "./ongoing/OngoingSection";
import CompletedSection from "./completed/CompletedSection";
import FailedSection from "./failed/FailedSection";

const GigSection = () => {
  
  return (
    <section className="flex flex-col gap-5">
      <h1 className="font-lateral text-3xl leading-[0.9]">Your Gigs:</h1>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">Ongoing Tasks:</h2>
        <OngoingSection />
      </article>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">
          Completed Tasks:
        </h2>
        <CompletedSection />
      </article>
      <article className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
        <h2 className="text-xl font-semibold leading-[0.9]">Failed Tasks:</h2>
        <FailedSection />
      </article>
    </section>
  );
};

export default GigSection;
