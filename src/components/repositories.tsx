"use client"
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GoGitBranch } from "react-icons/go";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};

type isStarred = boolean;

type setState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  repositories: Repository[],
  isStarred: isStarred,
  setIsStarred: setState<isStarred>
};

export default function Repositories({ repositories, isStarred, setIsStarred }: Props) {
  const [repositoriesFilter, setRepositoriesFilter] = useState<Repository[]>([]);

  useEffect(() => {
    if(!isStarred) {
      setRepositoriesFilter(repositories);
    } else {
      setRepositoriesFilter(repositories.filter((item) => item.stargazers_count >= 1));

    }
  }, [isStarred])

  return (
    <div className="px-[24px] pb-[32px]">
      <ul>
        {repositoriesFilter.map((repo, index) => (
          <li key={index} className="border-b-[1px] border-[#F8F8F8] pt-[32px] pb-[32px]">
            <h2
              className="text-[18px] font-light"
              style={repo.description == null ? { marginBottom: "15px" } : {}}
            >
              {repo.name}
            </h2>
            {repo.description && (
              <p className="text-[14px] text-[#989898] py-[16px]">
                {repo.description}
              </p>
            )}
            <div className="flex items-center gap-[32px]">
              <div className="flex items-center gap-[8px]">
                <FaStar className="text-[16px]" />
                <span className="text-[14px]">1.569</span>
              </div>
              <div className="flex items-center gap-[8px]">
                <GoGitBranch className="text=[16px]" />
                <span className="text-[14px]">142</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
