"use client";
import Nav from "@/components/nav";
import Profile from "../components/profile";
import { useEffect, useState } from "react";
import { buscarUsuario } from "@/services/apiGithub";
import Repositories from "@/components/repositories";
import Header from "@/components/header";

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
  repositories: Repository[],
  starredRepositories: Repository[],
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [isStarred, setIsStarred] = useState<boolean>(false)
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    const buscarUsuarioApi = async () => {
      const userSearch = await buscarUsuario();
      console.log(userSearch)
      setUser(userSearch);
      setRepositories(userSearch.repositories)
    };

    buscarUsuarioApi();
  }, []);
  return (
    <>
    <Header />
      {user && (
        <>
          <Profile user={user} />
          <Nav user={user} isStarred={isStarred} setIsStarred={setIsStarred} repositories={repositories}/>
          <Repositories repositories={repositories} isStarred={isStarred} setIsStarred={setIsStarred} />
        </>
      )}
      
    </>
  );
}
