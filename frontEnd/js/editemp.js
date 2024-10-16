let pic;
const url = window.location.href;
console.log(url);
const urlParams = new URLSearchParams(url.split("?")[1]);
console.log(urlParams);
const id=urlParams.get("id");
console.log(id);

async function getEmployees() {

    const res=await fetch(`http://localhost:3001/api/getemployee/${id}`)
    const employe=await res.json();
    console.log(employe);
    document.getElementById('main_2').innerHTML=`
     <div class="image">
                <img src="${employe.pic}" alt="no image">
            </div>
            <div class="details">
                <input type="text" placeholder="Employee ID" id="EmpID" name="EmpID" value="${employe.empid}" disabled="true">
                <input type="text" placeholder="Name" id="Name" name="Name" value="${employe.name}">
                <input type="text" placeholder="Designation" id="designation" name="designation" value="${employe.designation}">
                <input type="text" placeholder="Salary" id="salary" name="salary" value="${employe.salary}">
                <input type="text" placeholder="Experience" id="experience" name="experience" value="${employe.experience}">
                <input type="text" placeholder="Email" id="email" name="email" value="${employe.email}">
                <input type="text" placeholder="Phone" id="phone" name="phone" value="${employe.phone}">
                <input type="file" placeholder="Pic" id="pic" name="pic" onchange="picture()">
                <div style="width:200px; height: 200px;">
                    <img src="${employe.pic}" style="height: 100%; width: 100%;object-fit: cover;" id="img" alt="">

                </div>

                 
                <button type="submit" onclick="update()">Save</button>
            </div>`
    
    
}
getEmployees()

async function update() {

    empid=document.getElementById('EmpID').value,
    name=document.getElementById('Name').value,
    designation=document.getElementById('designation').value,
    salary=document.getElementById('salary').value,
    experience=document.getElementById('experience').value,
    email=document.getElementById('email').value,
    phone=document.getElementById('phone').value

    console.log(empid,name,designation,salary,experience,email,phone);
    console.log(id);
    
    const res= await fetch(`http://localhost:3001/api/update/${id}`,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({empid,name,designation,salary,experience,email,phone,pic})
    });
    
    console.log(res);
    
    const data=await res.json();
    res.status==201?alert(data.msg):alert(data.error)
    window.location.href=`../pages/index.html`
}

async function picture() {
    const file=document.getElementById("pic").files[0]

    pic=await convertBase64(file)
    console.log(pic);
    document.getElementById('img').src=pic
}

function convertBase64(file){
    return new Promise((resolve,reject)=>{
        const fileReader=new FileReader()
        fileReader.readAsDataURL(file);
        fileReader.onload=()=>{
            resolve(fileReader.result)
        }
        fileReader.onerror=(error)=>{
            reject(error)
        }
    })
}
