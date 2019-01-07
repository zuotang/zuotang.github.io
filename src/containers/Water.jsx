import React,{useEffect,useRef,useState} from 'react';
import ReactDOM from 'react-dom';
import styled,{keyframes} from 'styled-components';

function getShadow(p){
    let {h}=p;
    return `
    inset -2px -10px 20px 0 hsl(${h-10},100%,70%),
    inset -10px -2px 20px 0 hsl(${h-15},93%,50%),
    inset 5px 3px 10px 0 hsl(${h+100},90%,70%),
    inset 6px 10px 20px 0 hsl(${h+25},100%,60%),
    inset 3rem 6rem 40px -5rem hsla(${h+25},100%,60%,.4)
    `
}

const rotate = keyframes`
  0%{
    border-radius:50%/100% 100% 100% 100%;
  }
  12.5% {
    border-radius:0% 100% 50% 100%/0% 100% 80% 100%;
  }
  25% {
    border-radius:100% 100% 50% 50%/100% 100% 100% 100%;
  }
  37.5% {
    border-radius:100% 0% 100% 50%/100% 0% 100% 80%;
  }
  50% {
    border-radius:50%/100% 100% 100% 100%;
  }
  62.5% {
    border-radius:50% 100% 0% 100%/80% 100% 0% 100%;
  }
  75% {
    border-radius:50% 50% 100% 100%/100% 100% 100% 100%;
  }
  87.5% {
    border-radius:100% 50% 100% 0%/100% 80% 100% 0%;
  }
  100%{
    border-radius:50%/100% 100% 100% 100%;
  }
`;

const Button=styled.a`
    display:inline-block;
    background:hsl(${p=>p.h},100%,40%);
    box-shadow:${getShadow};
    padding:2rem 4rem;
    margin:5rem;
    border-radius:50% 50% 50% 50%/100% 100% 100% 100%;
    color:#fff;
    animation: ${rotate} 100s linear infinite;
    animation-play-state:paused;
    transition:border-radius 2s;
`
const Main=styled.div`
    background:white;
    height:100%;
`


function WaterBox({children}){
    const boxEl = useRef(null);
    const [position,setPosition]=useState({x:0,y:0})

    function handleMove({clientX,clientY}){
        let target=boxEl.current.children[0];
        let {x,y,width,height}=target.getBoundingClientRect();
        let dX=clientX-parseInt(x+width/2);
        let dY=clientY-parseInt(y+height/2);

        let index=(Math.atan2(dY,dX)*(180/Math.PI)+180)/360*100;

        let d=Math.sqrt(Math.pow(dX,2)+Math.pow(dY,2));
        if(d<200){
            target.style.animationPlayState="paused";
            target.style.animationDuration="100s";
            target.style.animationDelay=`-${index}s`;
        }else{
            target.style.animationDuration="10s";
            target.style.animationPlayState="running";
        }
    }
    useEffect(()=>{
        window.addEventListener('mousemove',handleMove);
    
        return ()=>{
            window.removeEventListener('mousemove',handleMove);
        }
    })
    return <div ref={boxEl}>{children}</div>
}

function Water(){
    return <Main>
        <WaterBox>
            <Button h={44}>Water</Button>
        </WaterBox>
        <WaterBox>
            <Button h={66}>Water</Button>
        </WaterBox>
        <Button h={33}>Water</Button>
       
    </Main>
}
export default Water;