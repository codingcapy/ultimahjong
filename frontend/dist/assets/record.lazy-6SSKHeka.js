import{c as N,u as f,a as w,r as a,j as e,L as y,b as m,D as j}from"./index-Cf39j-jf.js";import{u as R,I as S}from"./DashboardStore-BODUngAc.js";import"./iconBase-Cqr2jOTT.js";const E=N("/record")({component:P});function P(){const u=f(),{logoutService:p,authLoading:$,user:L}=w(s=>s),[d,r]=a.useState(""),{currentGameId:n}=R(s=>s),[o,x]=a.useState([]);function v(){p(),u({to:"/"})}a.useEffect(()=>{async function s(){const t=Number(n),c=await m.get(`${j}/api/records/${t}`),i=[];c.data.forEach(l=>i.push(l)),x([...i])}s()},[]);async function g(s){s.preventDefault();try{const t=s.target.winner.value;console.log(t);const c=s.target.loser.value;console.log(c);const i=Number(s.target.points.value);console.log(i);const l=n;console.log(n);const b={game_id:l,winner:t,loser:c,points:i},h=await m.post(`${j}/api/records`,b);h.data.success?(r("Success!"),x([...o,h.data.record])):r("Failure")}catch(t){r("There was an issue adding record :("),console.log(t)}}return console.log(n),e.jsx("main",{className:"flex-1 text-white",children:e.jsxs("div",{className:"flex",children:[e.jsxs("div",{className:"hidden md:fixed w-[12%] h-screen bg-black text-white md:flex flex-col justify-between",children:[e.jsx("div",{className:"pt-10 text-center",children:e.jsx(y,{to:"/",className:"pt-10 text-center font-bold",children:"Ultimate MahJong"})}),e.jsxs("div",{className:"flex p-10 pb-20 cursor-pointer",onClick:v,children:[e.jsx(S,{className:" py-1 w-[25px] h-[25px]"}),e.jsx("div",{className:"pl-2 py-0",children:"Logout"})]})]}),e.jsxs("div",{className:"w-[100%] bg-gray-700 min-h-screen p-10 md:pl-72",children:[e.jsxs("form",{className:"flex flex-col w-[300px] mx-auto",onSubmit:g,children:[e.jsx("h1",{className:"text-center text-xl font-bold mt-5 mb-2",children:"Add New Record"}),e.jsx("h2",{className:"mb-2 text-center text-sm",children:"Add a new record"}),e.jsx("label",{htmlFor:"winner",children:"Winner"}),e.jsxs("select",{className:"mb-2 text-black",id:"winner",name:"winner",required:!0,children:[e.jsx("option",{value:"Popo",children:"Popo"}),e.jsx("option",{value:"Rebecca",children:"Rebecca"}),e.jsx("option",{value:"Stephanie",children:"Stephanie"}),e.jsx("option",{value:"Justin",children:"Justin"})]}),e.jsx("label",{htmlFor:"loser",children:"Loser"}),e.jsxs("select",{className:"mb-2 text-black",id:"loser",name:"loser",required:!0,children:[e.jsx("option",{value:"Popo",children:"Popo"}),e.jsx("option",{value:"Rebecca",children:"Rebecca"}),e.jsx("option",{value:"Stephanie",children:"Stephanie"}),e.jsx("option",{value:"Justin",children:"Justin"})]}),e.jsx("label",{htmlFor:"points",children:"Points"}),e.jsx("input",{className:"text-black",type:"number",id:"points",name:"points",required:!0}),e.jsx("button",{className:"bg-green-800 text-white mt-5 px-10 py-2",children:"Add"})]}),e.jsx("div",{className:d==="Success!"?"py-2 text-center text-green-500":"py-2 text-center text-red-500",children:d}),e.jsx("h2",{className:"text-center text-xl font-bold mt-10 mb-2",children:"Players"}),e.jsx("h2",{className:"mb-2 text-center text-sm",children:"Summary of players' stats"}),e.jsxs("div",{className:"bg-gray-500 grid grid-cols-3",children:[e.jsx("div",{children:"Player"}),e.jsx("div",{children:"Total Points"}),e.jsx("div",{children:"Total $"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Popo"}),e.jsx("div",{children:"61"}),e.jsx("div",{children:"$10"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Rebecca"}),e.jsx("div",{children:"43"}),e.jsx("div",{children:"$8"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Stephanie"}),e.jsx("div",{children:"1"}),e.jsx("div",{children:"$0.1"})]}),e.jsxs("div",{className:"grid grid-cols-3",children:[e.jsx("div",{children:"Justin"}),e.jsx("div",{children:"-10"}),e.jsx("div",{children:"$-0.1"})]}),e.jsx("h2",{className:"text-center text-xl font-bold mt-10 mb-2",children:"Records"}),e.jsx("h2",{className:"text-sm text-center mb-2",children:"All records for 2025"}),e.jsxs("div",{className:"bg-gray-500 grid grid-cols-4",children:[e.jsx("div",{children:"date"}),e.jsx("div",{children:"winner"}),e.jsx("div",{children:"loser"}),e.jsx("div",{children:"points won"})]}),o.map(s=>e.jsxs("div",{className:"grid grid-cols-4",children:[e.jsx("div",{children:s.created_at}),e.jsx("div",{children:s.winner}),e.jsx("div",{children:s.loser}),e.jsx("div",{children:s.points})]},s.record_id))]})]})})}export{E as Route};