import React from "react";
import Container from "./container";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="bg-[#24292E] py-[21px] px-[23px] hidden md:block">
      <Container>
        <div className="flex items-center  text-white">
          <FaGithub size={24} color="#fff"/>
          <h2 className="text-[30px] font-bold ml-[16px]">GitHub</h2>
          <span className="mx-[22px] text-[24px]">/</span>
          <p className="text-[16px] font-light">Profile</p>
        </div>
      </Container>
    </header>
  );
}
