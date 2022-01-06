import React,{useEffect,useState} from 'react';
import ReactPlayer from 'react-player';

import  './App.css';
 import SearchIcon from '@mui/icons-material/Search';

function App() {
const[commit,setCommit]=useState([{}]);
const[renderCount,setRenderCount]=useState(0);
const[channel,setChannel]=useState(0);
const [search,setSearch]=useState(0);
const[value,setValue]=useState('');
  useEffect(()=>{
    anime();
  },[]);

  let anime= async()=> {
    
    await fetch('https://api.aniapi.com/v1/episode?anime_id=11&source=dreamsub&locale=it')
    .then((response)=>response.json())
    .then((res)=>setCommit(res.data.documents))
    .catch(err=>console.log(err)) ;
     
   setRenderCount(prev=>prev+1);
   

  };
  
  function channelHandler(e)
  {
    if(e==='prev')
    {
      if(channel>0)
      {
        setChannel((prev)=>prev-1);
      }
    }

    else if(e==='next')
    {
      if(channel<100)
      {
        setChannel((prev)=>prev+1);
      }
    }
  }
    // console.log(commit.data.documents.length)
    if(renderCount>0)
    {
      console.log(commit[channel].video);
      console.log(commit);
      console.log(commit[channel].title);
      
    // function saveInput(e){
    //   console.log(e);
    // }
  return (
    <div className='item-wrapper'>
      <div className='input-wrapper'>
    <input type="number" placeholder='Enter Episode Number' max="100" min="1" onChange={(e)=>{console.log(e.target.value)
                                                                                              setValue(e.target.value)
                                                                                              setSearch(e.target.value)}} value={value}></input>
    <SearchIcon onClick={()=>{setChannel(search-1);
                          setValue('');}}/>
    </div>
    <div className='title'>{commit[channel].title}</div>
    
      <ReactPlayer width='100%' height='50%' controls={true} url={commit[channel].video} />
    
    
    <div className='btn-wrapper'>
    <button onClick={()=>{channelHandler('prev')}}>{'<<'}</button>
    <div className='title'>{"Episode No:"+commit[channel].number}</div>
    <button onClick={()=>{channelHandler('next')}}>{'>>'}</button>
    </div>
    </div>
  )
    }
    else{
      return <></>
    }
}


export default App
