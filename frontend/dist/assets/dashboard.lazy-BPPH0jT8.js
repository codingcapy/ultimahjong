import{d as N,u as y,a as v,j as e,L as p,b as r,D as i,c as b,r as G}from"./index-ByJdS6-y.js";import{I as E}from"./index-BLrW19b8.js";import"./iconBase-CCEhCSuZ.js";const h=N((a,n)=>({games:[],setGames:s=>a({games:s})}));function L(){const a=y(),{logoutService:n,authLoading:s,user:m}=v(t=>t),{games:o,setGames:c}=h(t=>t);function u(){n(),a({to:"/"})}async function g(t){var d;t.preventDefault();try{const f={year:"New Game"};if((d=(await r.post(`${i}/api/games`,f)).data)!=null&&d.success){const j=await r.get(`${i}/api/games`),x=[];j.data.forEach(w=>x.push(w)),c([...x])}else throw new Error("Project ID not found in response")}catch(l){console.log(l)}}return e.jsxs("div",{className:"hidden w-[12%] h-screen bg-black text-white md:flex flex-col justify-between",children:[e.jsxs("div",{className:"pt-10 text-center",children:[e.jsx(p,{to:"/",className:"pt-10 text-center font-bold",children:"Ultimate MahJong"}),e.jsx("form",{onSubmit:g,children:e.jsx("button",{className:"m-10 py-2 px-5 bg-green-500 rounded",children:"New Game"})})]}),e.jsxs("div",{className:"flex p-10 pb-20 cursor-pointer",onClick:u,children:[e.jsx(E,{className:" py-1 w-[25px] h-[25px]"}),e.jsx("div",{className:"pl-2 py-0",children:"Logout"})]})]})}const C=b("/dashboard")({component:S});function S(){const{games:a,setGames:n}=h(s=>s);return G.useEffect(()=>{async function s(){const m=await r.get(`${i}/api/games`),o=[];m.data.forEach(c=>o.push(c)),n([...o])}s()},[]),e.jsx("main",{className:"flex-1 text-white",children:e.jsxs("div",{className:"flex",children:[e.jsx(L,{}),e.jsx("div",{className:"w-[100%] bg-gray-700 h-screen p-10",children:e.jsx("div",{className:"md:grid grid-cols-5 gap-3",children:a.map(s=>e.jsx(p,{to:"/record",children:e.jsx("div",{className:"py-10 bg-gray-600 text-center text-white my-2 md:my-0",children:s.year},s.game_id)}))})})]})})}export{C as Route};