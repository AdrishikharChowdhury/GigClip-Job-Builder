import React from "react";

type SkillsProps = {
  jobTitle: string;
  skills: string[];
  bio: string;
};

const Skills = ({ jobTitle, skills, bio }: SkillsProps) => {
  return (
    <div className="flex flex-col gap-12 rounded-cards border border-carbon bg-paper-white p-6">
      <p className="text-xl font-semibold">{jobTitle}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-pills border border-carbon bg-sunburst px-3 py-1 text-sm font-bold tracking-[0.03em]"
          >
            {skill}
          </span>
        ))}
      </div>
      <p className="italic text-sm text-gray-600 font-medium leading-caption tracking-[-0.01px]">
        {bio}
      </p>
    </div>
  );
};

export default Skills;
