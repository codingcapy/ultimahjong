import{c as v,u as m,a as u,r as p,j as e,L as g,b,D as N}from"./index-BmhbZmK8.js";import{u as y,I as S}from"./DashboardStore-BhWoozJ1.js";import"./iconBase-DQ7TJXIG.js";const A=v("/record")({component:R});function R(){const a=m(),{logoutService:t,authLoading:f,user:w}=u(i=>i),[r,d]=p.useState(""),{currentGameId:c}=y(i=>i);function x(){t(),a({to:"/"})}async function h(i){i.preventDefault();try{const s=i.target.winner.value;console.log(s);const n=i.target.loser.value;console.log(n);const l=Number(i.target.points.value);console.log(l);const o=c;console.log(c);const j={game_id:o,winner:s,loser:n,points:l};(await b.post(`${N}/api/records`,j)).data.success?d("Success!"):d("Failure")}catch(s){d("There was an issue adding record :("),console.log(s)}}return console.log(c),e.jsx("main",{className:"flex-1 text-white",children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"hidden md:fixed w-[12%] h-screen bg-black text-white md:flex flex-col justify-between",children:[e.jsx("div",{className:"pt-10 text-center",children:e.jsx(g,{to:"/",className:"pt-10 text-center font-bold",children:"Ultimate MahJong"})}),e.jsxs("div",{className:"flex p-10 pb-20 cursor-pointer",onClick:x,children:[e.jsx(S,{className:" py-1 w-[25px] h-[25px]"}),e.jsx("div",{className:"pl-2 py-0",children:"Logout"})]})]}),e.jsxs("div",{className:"w-[100%] bg-gray-700 min-h-screen p-10 md:pl-72",children:[e.jsxs("form",{className:"flex flex-col w-[300px] mx-auto",onSubmit:h,children:[e.jsx("h1",{className:"text-center text-xl font-bold mt-5 mb-2",children:"Add New Record"}),e.jsx("h2",{className:"mb-2 text-center text-sm",children:"Add a new record"}),e.jsx("label",{htmlFor:"winner",children:"Winner"}),e.jsxs("select",{className:"mb-2 text-black",id:"winner",name:"winner",required:!0,children:[e.jsx("option",{value:"Popo",children:"Popo"}),e.jsx("option",{value:"Rebecca",children:"Rebecca"}),e.jsx("option",{value:"Stephanie",children:"Stephanie"}),e.jsx("option",{value:"Justin",children:"Justin"})]}),e.jsx("label",{htmlFor:"loser",children:"Loser"}),e.jsxs("select",{className:"mb-2 text-black",id:"loser",name:"loser",required:!0,children:[e.jsx("option",{value:"Popo",children:"Popo"}),e.jsx("option",{value:"Rebecca",children:"Rebecca"}),e.jsx("option",{value:"Stephanie",children:"Stephanie"}),e.jsx("option",{value:"Justin",children:"Justin"})]}),e.jsx("label",{htmlFor:"points",children:"Points"}),e.jsx("input",{className:"text-black",type:"number",id:"points",name:"points",required:!0}),e.jsx("button",{className:"bg-green-800 text-white mt-5 px-10 py-2",children:"Add"})]}),e.jsx("div",{className:r==="Success!"?"py-2 text-center text-green-500":"py-2 text-center text-red-500",children:r}),e.jsx("h2",{className:"text-center text-xl font-bold mt-10 mb-2",children:"Players"}),e.jsx("h2",{className:"mb-2 text-center text-sm",children:"Summary of players' stats"}),e.jsxs("div",{className:"bg-gray-500 grid grid-cols-3",children:[e.jsx("div",{children:"Player"}),e.jsx("div",{children:"Total Points"}),e.jsx("div",{children:"Total $"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Popo"}),e.jsx("div",{children:"61"}),e.jsx("div",{children:"$10"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"43"}),e.jsx("div",{children:"$8"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"1"}),e.jsx("div",{children:"$0.1"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Justin"}),e.jsx("div",{children:"-10"}),e.jsx("div",{children:"$-0.1"})]}),e.jsx("h2",{className:"text-center text-xl font-bold mt-10 mb-2",children:"Records"}),e.jsx("h2",{className:"text-sm text-center mb-2",children:"All records for 2025"}),e.jsxs("div",{className:"bg-gray-500 grid grid-cols-4",children:[e.jsx("div",{children:"date"}),e.jsx("div",{children:"winner"}),e.jsx("div",{children:"loser"}),e.jsx("div",{children:"points won"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]}),e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:"January 1 2025"}),e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"3"})]})]})]})})}export{A as Route};