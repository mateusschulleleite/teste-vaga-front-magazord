"use client";
import { FaRegStar } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { GrBook } from "react-icons/gr";
import { useEffect, useState } from "react";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  language: string;
};

type User = {
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  public_repos: number;
  repositories: Repository[];
  starredRepositories: Repository[];
};

type isStarred = boolean;

type setState<T> = React.Dispatch<React.SetStateAction<T>>;

type Props = {
  user: User;
  isStarred: isStarred;
  setIsStarred: setState<isStarred>;
  repositories: Repository[];
};

export default function Nav({
  user,
  isStarred,
  setIsStarred,
  repositories,
}: Props) {
  const [typeOpen, setTypeOpen] = useState<Boolean>(false);
  const [languageOpen, setLanguageOpen] = useState<Boolean>(false);
  const [languages, setLanguages] = useState<string[]>([]);
  const [inputActive, setInputActive] = useState<Boolean>(false);
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const uniqueLanguages = Array.from(
      new Set(repositories.map((repo) => repo.language).filter(Boolean))
    );
    setLanguages(uniqueLanguages);
  }, [repositories]);

  const handleClickNav = (e: React.MouseEvent<HTMLButtonElement>) => {
    setScrollTop(window.scrollY);

    const clickedButton = e.currentTarget.dataset.buttonNav;
    document.querySelector("body").style.overflowY = "hidden";
    if (clickedButton === "type") {
      setTypeOpen(true);
    } else {
      setLanguageOpen(true);
    }
  };

  return (
    <div className="px-[24px]">
      <div className="flex justify-between">
        <button
          onClick={() => setIsStarred(false)}
          className={`flex items-center pb-[6px] border-b-2 ${
            !isStarred ? "border-b-[#FD8C73]" : "border-b-transparent"
          }`}
        >
          <GrBook
            className={`mr-[6px] text-[20px] ${
              !isStarred ? "text-black" : "text-[#989898]"
            }`}
          />
          <span
            className={`text-[16px] font-normal ${
              !isStarred ? "text-black" : "text-[#989898]"
            }`}
          >
            Repositories
          </span>
          <span className="ml-[16px] px-[12px] py-[4px] bg-[#f8f8f8] rounded-[59px] border-[#dbdbdb] border-[1px] font-normal text-[14px] text-[#989898]">
            {user.public_repos}
          </span>
        </button>
        <button
          onClick={() => setIsStarred(true)}
          className={`flex items-center pb-[6px] border-b-2 ${
            isStarred ? "border-b-[#FD8C73]" : "border-b-transparent"
          }`}
        >
          <FaRegStar
            className={`mr-[6px] text-[20px] ${
              isStarred ? "text-black" : "text-[#989898]"
            }`}
          />
          <span
            className={`text-[16px] font-normal ${
              isStarred ? "text-black" : "text-[#989898]"
            }`}
          >
            Starred
          </span>
          <span className="ml-[16px] px-[12px] py-[4px] bg-[#f8f8f8] rounded-[59px] border-[#dbdbdb] border-[1px] font-normal text-[14px] text-[#989898]">
            {user.starredRepositories.length}
          </span>
        </button>
      </div>
      <div className="relative flex bg-[#f8f8f8] rounded-[8px] mt-[24px]">
        <div
          className={`absolute text-white flex items-center left-[8px] top-[50%] translate-y-[-50%] gap-[8px] ${
            inputActive ? "hidden" : ""
          }`}
        >
          <button
            onClick={(e) => handleClickNav(e)}
            data-button-nav="type"
            className="bg-[#0056A6] flex items-center gap-[10px] rounded-[42px] p-[8px] pr-[24px] text-[14px]"
          >
            <IoIosArrowDown />
            <span>Type</span>
          </button>
          <button
            onClick={(e) => handleClickNav(e)}
            data-button-nav="language"
            className="bg-[#0056A6] flex items-center gap-[10px] rounded-[42px] p-[8px] pr-[24px] text-[14px]"
          >
            <IoIosArrowDown />
            <span>Language</span>
          </button>
        </div>
        <input
          placeholder={inputActive ? "Buscar por repositório" : ""}
          onClick={() => setInputActive(true)}
          onBlur={() => setInputActive(false)}
          className="w-full py-[15px] px-[15px]"
        ></input>
        <IoSearchOutline className="absolute text-[#0587FF] text-[25px] right-[8px] top-[50%] translate-y-[-50%]" />
      </div>
      <div
        className={`absolute transition-all top-0 w-full h-full bg-white p-[24px] ${
          typeOpen ? "left-[0px]" : "left-[-100%]"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-[24px]">Type</span>
          <IoMdClose
            onClick={() => {
              setTypeOpen(false);
              document.querySelector("body").style.overflowY = "auto";
            }}
            className="text-[24px] text-[#FE354D]"
          />
        </div>
        <ul className="p-[18px] mt-[40px] flex flex-col gap-[20px]">
          <li className="flex items-center gap-[16px]">
            <input type="checkbox" className="w-[20px] h-[20px]"></input>
            <span className="text-[16px]">All</span>
          </li>
          <li className="flex items-center gap-[16px]">
            <input type="checkbox" className="w-[20px] h-[20px]"></input>
            <span className="text-[16px]">Sources</span>
          </li>
          <li className="flex items-center gap-[16px]">
            <input type="checkbox" className="w-[20px] h-[20px]"></input>
            <span className="text-[16px]">Forks</span>
          </li>
        </ul>
      </div>
      <div
        style={{ top: `${scrollTop}px` }}
        className={`absolute transition-left-only w-full h-full bg-white p-[24px] ${
          languageOpen ? "left-[0px]" : "left-[-100%]"
        }`}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold text-[24px]">Language</span>
          <IoMdClose
            onClick={() => {
              setLanguageOpen(false);
              document.querySelector("body").style.overflowY = "auto";
            }}
            className="text-[24px] text-[#FE354D]"
          />
        </div>
        <ul className="p-[18px] mt-[40px] flex flex-col gap-[20px]">
          <li className="flex items-center gap-[16px]">
            <input type="checkbox" className="w-[20px] h-[20px]"></input>
            <span className="text-[16px]">All</span>
          </li>
          {languages.map((lang, index) => (
            <li key={index} className="flex items-center gap-[16px]">
              <input
                id={lang}
                type="checkbox"
                className="w-[20px] h-[20px]"
              ></input>
              <label htmlFor={lang} className="text-[16px]">
                {lang}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
