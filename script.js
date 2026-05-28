const students = [
{id:"C1250082",name:"Hamza Mohamednur yare Ali",good:0,warning:0},
{id:"C1250083",name:"Hassan Nor Adan",good:0,warning:0},
{id:"C1250084",name:"Mohamed Hashim Mohamed",good:0,warning:0},
{id:"C1250085",name:"Anab Abdullahi Hussein",good:0,warning:0},
{id:"C1250086",name:"Sacdia Nur Mohamed",good:0,warning:0},
{id:"C1250087",name:"Garad Hussein Nur",good:0,warning:0},
{id:"C1250088",name:"Khadra Mohamed Ahmed",good:0,warning:0},
{id:"C1250089",name:"Ayan Mohamed Abdi",good:0,warning:0},
{id:"C1250090",name:"Jabir Farah Abdulle",good:0,warning:0},
{id:"C1250091",name:"Sabirin Hassan Hashi",good:0,warning:0},
// ... sii wad ilaa 74-ka arday oo dhan
];

const tbody = document.getElementById("studentsTable");
const totalStudents = document.getElementById("totalStudents");
const warningStudents = document.getElementById("warningStudents");

function saveData(){
localStorage.setItem("CA252_DATA",JSON.stringify(students));
}

function loadData(){
const data = localStorage.getItem("CA252_DATA");
if(data){
const saved = JSON.parse(data);
saved.forEach((item,index)=>{
students[index].good=item.good;
students[index].warning=item.warning;
});
}
}

function updateStats(){
totalStudents.innerText = students.length;

let warned = students.filter(s=>s.warning >= 25).length;
warningStudents.innerText = warned;
}

function renderStudents(list = students){

tbody.innerHTML = "";

list.forEach((student,index)=>{

const tr = document.createElement("tr");

if(student.warning >= 25){
tr.classList.add("danger");
}

tr.innerHTML = `
<td>${student.id}</td>
<td>${student.name}</td>
<td>${student.good}</td>
<td>${student.warning}</td>

<td>
<button onclick="addGood(${index})">
✅ Good
</button>

<button onclick="addWarning(${index})">
⚠ Warning
</button>

<button onclick="resetStudent(${index})">
🔄 Reset
</button>
</td>
`;

tbody.appendChild(tr);

});

updateStats();
}

function addGood(index){
students[index].good++;

if(students[index].good > 100){
students[index].good = 100;
}

saveData();
renderStudents();
}

function addWarning(index){

students[index].warning++;

if(students[index].warning == 25){

alert(
"⚠ DIGNIIN!\n\n" +
students[index].name +
"\nWuxuu gaaray 25 Warning."
);

}

saveData();
renderStudents();
}

function resetStudent(index){

if(confirm("Ma rabtaa inaad reset sameyso?")){

students[index].good = 0;
students[index].warning = 0;

saveData();
renderStudents();

}

}

document
.getElementById("search")
.addEventListener("input",function(){

const value = this.value.toLowerCase();

const filtered = students.filter(student=>

student.name.toLowerCase().includes(value) ||
student.id.toLowerCase().includes(value)

);

renderStudents(filtered);

});

loadData();
renderStudents();
