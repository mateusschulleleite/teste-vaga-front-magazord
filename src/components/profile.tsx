"use client";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiMapPinLine } from "react-icons/ri";
import enterpriseIcon from "../assets/enterpriseIcon.png";
import Image from "next/image";
import { useState } from "react";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
};


type User = {
  name: string;
  avatar_url: string;
  bio: string;
  location: string;
  company: string;
  public_repos: number;
  repositories: Repository[];
};


type Props = {
  user: User;
};

export default function Profile({user}: Props) {
  const [profileDetails, setProfileDetails] = useState(false);

  return (
    <div className="px-[24px] my-[40px] flex flex-col items-center text-center mx-auto">
      <div className="max-w-[104px]">
        <img
          className="rounded-[50px]"
          src={user.avatar_url}
        />
      </div>
      <div className="mt-[16px] mb-[24px] max-w-[217px]">
        <h1 className="mb-[4px] font-bold text-[20px]">{user.name}</h1>
        <p className="text-[14px] font-regular text-[#989898]">
          {user.bio}
        </p>
      </div>
      <div className="text-[#0587FF] text-[14px] w-full">
        <button onClick={() => setProfileDetails((prev) => !prev)}>
          Informações Adicionais
        </button>
        <IoIosArrowDown
          className={`m-auto text-[12px] transition-[300ms] ${
            profileDetails ? "rotate-180" : ""
          }`}
        />
        {profileDetails && (
          <div className="bg-[#F8F8F8] rounded-[16px] p-[16px] flex flex-col gap-[16px]">
            <div className="flex items-center gap-[10px]">
              <Image src={enterpriseIcon} alt="Enterprise" width={14} />
              <span>{user.company}</span>
            </div>
            <div className="flex items-center gap-[10px]">
              <RiMapPinLine />
              <span>{user.location}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
