let students=[];
let currentid=null; 
const getStudent=()=>{
  $.ajax({
    url:"https://studentcrudforlesson.herokuapp.com/api/student/get",
    method:"get",
    success:function(javob){
      students=javob;
      
      chiz(); 
    },
    error:function(error){
      $("h2").html("xatolik yuz berdi")
    },
  })
}
const addStudent=()=>{
  $.ajax({
    url:"https://studentcrudforlesson.herokuapp.com/api/student/add",
    method:"post",
    data:JSON.stringify({
      firstname:`${document.querySelector("#input1").value}`,
      lastname:`${document.querySelector("#input2").value}`,
      username:`${document.querySelector("#input3").value}`,
      phoneNumber:`${document.querySelector("#input4").value}`,
    }),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success:function(response){
      console.log("assalom");
      getStudent();
    },
    error:function(error){
      $("h2").html("xatolik bo'ldiyu");
      getStudent();
      console.log("casvguhbkn");
    },
  })
}
$("#btn").on("click",function(){
  
  if(document.querySelector("#input1").value===""&&document.querySelector("#input2").value===""&&document.querySelector("#input3").value===""&&document.querySelector("#input4").value==="")
  {
    alert("Formani to'ldiring")
  }
  else{
    addStudent();
   
    document.querySelector("#input1").value="";
    document.querySelector("#input2").value="";
    document.querySelector("#input3").value="";
    document.querySelector("#input4").value="";
  }
  
  // chiz();
  
  // chiz();
})

const chiz=()=>{
  let mytext="";  
  students.forEach((student,index)=>{
    mytext+=`<tr>
    <th scope="row">${index+1}</th>
    <td>${student.firstname}</td>
    <td>${student.lastname}</td>
    <td>${student.username}</td>
    <td>${student.phoneNumber}</td>
    <td  class=" td d-flex justify-content-evenly  ">
    
   <img onclick="editstudent(${student.id})"  class="editImage" src="images/edit (2).png" alt="">
   <img onclick="deletestudent(${student.id})" class="deleteImage" src="images/delete.png" alt="">
    </td>

  </tr>`;
  }
  
  )
  
 
 
  $(".myTable").html(mytext);
}
const deletestudent=id=>{
  console.log(id);
  $.ajax({
    url:`https://studentcrudforlesson.herokuapp.com/api/student/delete/${id}`,
    method:"delete",
    success:function(response){
      console.log(response);
      getStudent();
    },
    error:function(err){
      console.log(err);
      getStudent();
    }

  })

  
}
const editstudent=(id)=>{
  let student=students.find(item=> item.id===id);
  currentid=id;
  $("#input1").val(student.firstname);
  $("#input2").val(student.lastname);
  $("#input3").val(student.username);
  $("#input4").val(student.phoneNumber);
  $(".editstudent").show();
  $(".addstatus").hide();
}

$(".editstudent").on("click",function(){
  $.ajax({
    url:`https://studentcrudforlesson.herokuapp.com/api/student/update/${currentid}`,
    method:"post",
    data:JSON.stringify({
      firstname:`${document.querySelector("#input1").value}`,
      lastname:`${document.querySelector("#input2").value}`,
      username:`${document.querySelector("#input3").value}`,
      phoneNumber:`${document.querySelector("#input4").value}`,
    }),
    contentType:"application/json; charset=utf-8",
    dataType:"json",
    success:function(response){
      console.log("assalom");
      getStudent();
    
    },
    error:function(error){
      $("h2").html("xatolik bo'ldiyu");
      getStudent();
    },
  })
  $("#input1").val("");
  $("#input2").val("");
  $("#input3").val("");
  $("#input4").val("");
  $(".editstudent").hide();
  $(".addstatus").show();

   })


