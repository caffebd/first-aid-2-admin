
const nameBox = document.getElementById("nameBox");
const immediateActionBox = document.getElementById("immediateActionBox");
const furtherActionBox = document.getElementById("furtherActionBox");

const searchBox = document.getElementById("searchBox");
const searchBoxEdit = document.getElementById("searchBoxEdit");


const emergencyDetails = document.getElementById("emergencyDetails");
const emergencyDetailsForDelete = document.getElementById("emergencyDetailsForDelete");







  let heartAttack = {
    name: "Heart Attack",
    immediateAction: "Call an ambulance",
    furtherAction: "While waiting for an ambulance, it may help to chew and then swallow a tablet of aspirin (ideally 300mg), as long as the person having a heart attack is not allergic to aspirin. Aspirin helps to thin the blood and improves blood flow to the heart. In hospital, treatment for a heart attack depends on how serious it is. The 2 main treatments are: using medicines to dissolve blood clots surgery to help restore blood to the heart",
  };

let choking = {
  name: "Choking",
  immediateActionBox:
    "Stand behind them and slightly to one side. Support their chest with 1 hand. Lean them forward so the object blocking their airway will come out of their mouth, rather than moving further down. Give up to 5 sharp blows between their shoulder blades with the heel of your hand. The heel is between the palm of your hand and your wrist. Check if the blockage has cleared.",
  furtherActionBox:"Call an ambulance"
};

let bleeding = {
  name: "Bleeding",
  immediateActionBox:
    "Place a sterile bandage or clean cloth on the wound. Press the bandage firmly with your palm to control bleeding. Apply constant pressure until the bleeding stops. Maintain pressure by binding the wound with a thick bandage or a piece of clean cloth.",
  furtherActionBox: "Call an ambulance if bleeding does not stop."
};


let allFirstAid = [heartAttack, choking, bleeding];

if (localStorage.hasOwnProperty("allFirstAid")) {  
    let loadedAid = localStorage.getItem("allFirstAid");
    allFirstAid = JSON.parse(loadedAid);

    }

function clearDatabase() {
    localStorage.removeItem("allFirstAid");
    allFirstAid.length = 0;
    emergencyDetails.innerHTML = "";
    allFirstAid = [heartAttack, choking, bleeding];
}




function searchEmergencyDetails(emergency="") {


    let searchName = ""
    
    if (emergency) {
        searchName = emergency
    } else {
        searchName = searchBox.value.trim()
    }


    emergencyDetails.innerHTML = "";

    console.log(searchName)


    // ! means NOT same as searchName == ""  --> NOTHING THERE
    
    if (!searchName) return
 
    
    for (let i = 0; i < allFirstAid.length; i++) {
        
        if (
          allFirstAid[i].name.toLowerCase().includes(searchName.toLowerCase())
        ) {
          showFirstAid(i);
        }
         

    }

}


function searchForEdit() {
  let searchName = "";

  searchName = searchBoxEdit.value.trim();
  
  emergencyDetailsForDelete.innerHTML = "";

  console.log(searchName);

  // ! means NOT same as searchName == ""  --> NOTHING THERE

  if (!searchName) return;

  for (let i = 0; i < allFirstAid.length; i++) {
    if (allFirstAid[i].name.toLowerCase().includes(searchName.toLowerCase())) {
      showFirstAidForDelete(i);
    }
  }
}


function validation() {
    let pass = true


    if (!nameBox.value.trim()) {
        nameBox.value=""
        nameBox.placeholder = "required field"
        pass = false
    } 
    if (!immediateActionBox.value.trim()) {
        immediateActionBox.value = "";
        immediateActionBox.placeholder = "required field";
        pass = false;
    }
    if (!furtherActionBox.value.trim()) {
        furtherActionBox.value = "";
      furtherActionBox.placeholder = "required field";
      pass = false;
    }

    return pass //true or false
}

function saveFirstAid() {
  //object
  let firstAid = {
    name: nameBox.value,
    immediateAction: immediateActionBox.value,
    furtherAction: furtherActionBox.value,
  };

  //long form
  let result = validation();

  if (result == false) {
    return;
  }


  allFirstAid.push(firstAid);

  nameBox.value = "";
  immediateActionBox.value = "";
  furtherActionBox.value = "";

  nameBox.placeholder = "";
  immediateActionBox.placeholder = "";
  furtherActionBox.placeholder = "";

  localStorage.setItem("allFirstAid", JSON.stringify(allFirstAid));
}

function showFirstAidForEdit(count) {

    nameBox.value = allFirstAid[count].name;
    immediateActionBox.value = allFirstAid[count].immediateAction;
    furtherActionBox.value = allFirstAid[count].furtherAction;
}

function showFirstAid(count) {
    let nameContent = ''
    let immediateActionContent = "";
    let furtherActionContent = "";


    nameContent = allFirstAid[count].name
    immediateActionContent = allFirstAid[count].immediateAction;
    furtherActionContent = allFirstAid[count].furtherAction;



        let nameText = emergencyDetails.appendChild(document.createElement("h2"));
    nameText.innerHTML = nameContent

        let immediateTitle = emergencyDetails.appendChild(
          document.createElement("h3")
        );
        immediateTitle.innerHTML = "Immediate Action";

    let immediateText = emergencyDetails.appendChild(document.createElement("p"));
    immediateText.innerHTML = immediateActionContent;

            let furtherTitle = emergencyDetails.appendChild(
              document.createElement("h3")
            );
            furtherTitle.innerHTML = "Further Action";
    
    let furtherText = emergencyDetails.appendChild(document.createElement("p"));
    furtherText.innerHTML = furtherActionContent;




    emergencyDetails.appendChild(document.createElement("hr"))

}

function showFirstAidForDelete(count) {
  let nameContent = "";
  let immediateActionContent = "";
  let furtherActionContent = "";

  nameContent = allFirstAid[count].name;
  immediateActionContent = allFirstAid[count].immediateAction;
  furtherActionContent = allFirstAid[count].furtherAction;

  let nameText = emergencyDetailsForDelete.appendChild(
    document.createElement("h2")
  );
  nameText.innerHTML = nameContent;

  let immediateTitle = emergencyDetailsForDelete.appendChild(
    document.createElement("h3")
  );
  immediateTitle.innerHTML = "Immediate Action";

  let immediateText = emergencyDetailsForDelete.appendChild(
    document.createElement("p")
  );
  immediateText.innerHTML = immediateActionContent;

  let furtherTitle = emergencyDetailsForDelete.appendChild(
    document.createElement("h3")
  );
  furtherTitle.innerHTML = "Further Action";

  let furtherText = emergencyDetailsForDelete.appendChild(
    document.createElement("p")
  );
  furtherText.innerHTML = furtherActionContent;

      let deleteBtn = emergencyDetailsForDelete.appendChild(
        document.createElement("button")
      );
      deleteBtn.innerHTML = "Delete";

      deleteBtn.onclick = function (event) {
        deleteFirstAid(count); //0, 1,2,3
      };

      deleteBtn.className = "clearFirstAid";

  emergencyDetailsForDelete.appendChild(document.createElement("hr"));
}


function deleteFirstAid(toDelete) {
  allFirstAid.splice(toDelete, 1);
  localStorage.setItem("allFirstAid", JSON.stringify(allFirstAid));

  emergencyDetailsForDelete.innerHTML = "";
  searchBox.value = "";

}


//search
    
    
   
    
    
   
   


//     //extra to update search 
//     if (search == "all-students") {
//         showAllStudents()
//     } else {
//         searchStudentDetails()
//     }

// }

function showStudent(count) {

    let nameContent = ''
    let nationalityContent = ''
    let birthContent = ''
    let ageContent = ''


    nameContent = `Student Name: ${allStudents[count].name}`;
    nationalityContent = `Student Nationality: ${allStudents[count].nationality}`;
    birthContent = `Student Date of Birth ${allStudents[count].dateOfBirth}`;
    ageContent = `Student age: ${allStudents[count].age}`;
    

    nameSection.innerHTML = nameContent;
    nationalitySection.innerHTML = nationalityContent;
    birthSection.innerHTML = birthContent;
    ageSection.innerHTML = ageContent;
}


