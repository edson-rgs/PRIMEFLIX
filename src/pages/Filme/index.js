
import{useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.css';
import {toast} from 'react-toastify';


function Filme() {

  const {id} = useParams();
  const navigate = useNavigate(); 

  const [filme, setFilme] = useState({});
  const [loading, setLoading] = useState(true)


  useEffect(()=>{
    async function loadFilme(){
      await api.get(`/movie/${id}`, {
        params:{
          api_key:'120b8f8c011de4071d7a736f4fce1d3a',
          language: 'pt-BR',
        }
      })
      .then((response)=>{
        setFilme(response.data);
        setLoading(false);
      })

      
      .catch(()=>{
        console.log('FILME NÃO ENCONTRADO')
        navigate('/',{replace:true});
        return;
      })
      
    }
  
    loadFilme();

    return()=>{
      console.log('COMPONENTE FOI DESMONTADO')
    }

  }, [navigate, id])


  function salvarFilme(){

    const minhaLista= localStorage.getItem('@primeFlix');  // BUSCO DADOS NO localStorage E SALVO NA CHAVE @PRIMEFLIX
    let filmeSalvos = JSON.parse(minhaLista) || []; // SE TIVER ALGO , PRECISO CONVERTER STRING PARA OBJETO PQ localStorage SO SALVA STRING 

    const hasFilme = filmeSalvos.some((filmeSalvos)=> filmeSalvos.id === filme.id) // AQUI VERIFICO SE JA EXISTE O FILME USANDO O MÉTODO .SOME ( VERIFICA SE ALGUM ITEM ATENDE A CONDIÇÃO)

    if (hasFilme){
     toast.warn('FILME JÁ ESTÁ NA SUA LISTA')
      return
    }
    filmeSalvos.push(filme); // ADICIONA O FILME NO ARRAY
    localStorage.setItem('@primeFlix', JSON.stringify(filmeSalvos)); // AQUI SALVA NOVAMENTE NO localStorage CONVERTENDO EM OBJETO PARA STRING
   toast.success('FILME SALVO COM SUCESSO')


  }

  

  if(loading){
    return(
      <div className='filme-info'>
        <h1>Carregando detalhes...</h1>
    
      </div>
    )
  }
  return(
    <div className='filme-info'>

      <h1>{filme.title} </h1>
        <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />


        <h3>Sinopse</h3>
        <span>{filme.overview}</span>

        <strong>Avaliação: {filme.vote_average} / 10</strong>

        <div className= " area-buttons">

        <button  onClick={salvarFilme}> Salvar</button>
        <button>
          <a  target= 'blank' rel = 'external 'href={`https://youtube.com/results?search_query= ${filme.title} Trailer`}>
            Trailer
            </a>
            </button>


        </div>


    </div>
  )
}

export default Filme;