import axios from 'axios';

export async function buscarUsuario() {
  try {
    const response = await axios.get('https://api.github.com/users/mateusschulleleite');

    if(response) {
     const repositories = await axios.get(response.data.repos_url);
     const starredRepositories = await axios.get("https://api.github.com/users/mateusschulleleite/starred")
     const newResponse = {
      ...response.data,
      repositories: repositories.data,
      starredRepositories: starredRepositories.data
     }
     return newResponse;
    }
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
  }
}