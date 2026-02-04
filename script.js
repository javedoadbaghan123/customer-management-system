let customers = JSON.parse(localStorage.getItem("customers")) || [];
let history = JSON.parse(localStorage.getItem("history")) || [];
let editIndex = null;

function show(id){
document.querySelectorAll(".card").forEach(c=>c.style.display="none");
document.getElementById(id).style.display="block";
}

function saveCustomer(){
let c={
id:cid.value.trim(),
name:cname.value.trim(),
mobile:mobile.value.trim(),
total:+total.value,
advance:+advance.value,
paid:+advance.value
};
if(!c.id||!c.name){alert("ID & Name required");return}

if(editIndex===null) customers.push(c);
else {customers[editIndex]=c;editIndex=null}

localStorage.setItem("customers",JSON.stringify(customers));
clearForm();loadMaster();updateStats();
}

function loadMaster(){
let b=document.getElementById("masterBody");
b.innerHTML="";
customers.forEach((c,i)=>{
let rem=c.total-c.paid;
if(rem<=0){
history.push(c);
customers.splice(i,1);
localStorage.setItem("history",JSON.stringify(history));
}
else{
b.innerHTML+=`
<tr>
<td>${c.id}</td>
<td>${c.name}</td>
<td>${c.mobile}</td>
<td>${c.total}</td>
<td>${c.paid}</td>
<td>${rem}</td>
<td>
<button onclick="edit(${i})">✏️</button>
<button onclick="del(${i})">🗑️</button>
</td>
</tr>`;
}
});
localStorage.setItem("customers",JSON.stringify(customers));
loadHistory();
}

function edit(i){
let c=customers[i];
cid.value=c.id;
cname.value=c.name;
mobile.value=c.mobile;
total.value=c.total;
advance.value=c.paid;
editIndex=i;
show("customer");
}

function del(i){
if(confirm("Delete customer?")){
customers.splice(i,1);
localStorage.setItem("customers",JSON.stringify(customers));
loadMaster();updateStats();
}
}

function loadHistory(){
let h=document.getElementById("historyBody");
h.innerHTML="";
history.forEach(c=>{
h.innerHTML+=`<tr><td>${c.id}</td><td>${c.name}</td><td>${c.total}</td></tr>`;
});
}

function clearForm(){
cid.value=cname.value=mobile.value=
total.value=advance.value="";
editIndex=null;
}

function search(v){
v=v.toLowerCase();
document.querySelectorAll("#masterBody tr").forEach(r=>{
r.style.display=r.innerText.toLowerCase().includes(v)?"":"none";
});
}

function updateStats(){
document.getElementById("count").innerText=customers.length;
let s=customers.reduce((a,c)=>a+c.total,0);
document.getElementById("sum").innerText=s;
}

loadMaster();updateStats();show("customer");
