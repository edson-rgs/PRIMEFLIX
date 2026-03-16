import axios from "axios";
//https://api.themoviedb.org/3/movie/now_playing

//Base da URL : https://api.themoviedb.org/3/
//URL DA API:  /movie/now_playing?api_key=120b8f8c011de4071d7a736f4fce1d3a&language=pt=BR


const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;