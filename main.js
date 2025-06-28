// intialization

let button = document.querySelector(".search_user")
let user_inp = document.querySelector(".inp_user")
let easy = document.querySelector(".easy_gra ")
let easyPara = document.querySelector(".easy_gra p")
let medium = document.querySelector(".medium_gra ")
let mediumPara = document.querySelector(".medium_gra p")
let hard = document.querySelector(".hard_gra ")
let hardPara = document.querySelector(".hard_gra p")
let Usercards = document.querySelector(".cards")


//code

button.addEventListener("click", () => {
    let username = user_inp.value;
    let bool = User_Validation(username)
    console.log(bool)
    if (bool) {
        fetchInfor(username)
    }

})

function User_Validation(username) {
    username = username.trim()
    if (username === "")
        alert("Empty! Enter some username");
    const regex = /^[a-zA-Z0-9_-]+$/;
    console.log(username)
    return regex.test(username)
}
async function fetchInfor(username) {
    let data;

    try {

        button.disabled = true;
        button.style.backgroundColor = "grey";
        let response = await fetch(`https://leetcode-stats-api.herokuapp.com/${username}`);
        console.log("Response status:", response.status);


        if (response.ok) {
            data = await response.json();
            console.log("Response data:", data);

        } else {
            console.error("Failed to fetch data. Status:", response.status);
        }

    } catch (error) {
        // Handle any errors that occur during the fetch
        console.error("Error occurred:", error);
    }
    finally {
        button.disabled = false;
        button.style.backgroundColor = "#007bff";
    }

    displayUserData(data)
}

function displayUserData(data) {
    let easySolved = data.easySolved;
    let mediumSolved = data.mediumSolved;
    let hardSolved = data.hardSolved;
    let acceptance = data.acceptanceRate;
    let ranking = data.ranking;

    let totalEasy = data.totalEasy;
    let totalMedium = data.totalMedium;
    let totalHard = data.totalHard;
    let totalQuestions = data.totalQuestions;

    const progressDegree1 = (easySolved / totalEasy) * 100;
    easy.style.setProperty("--progress-degree", `${progressDegree1}%`)
    console.log(easy)
    easyPara.textContent = `${easySolved}/${totalEasy} Easy`

    const progressDegree2 = (mediumSolved / totalMedium) * 100;
    medium.style.setProperty("--progress-degree", `${progressDegree2}%`)
    mediumPara.textContent = `${mediumSolved}/${totalMedium} Medium`

    const progressDegree3 = (hardSolved / totalHard) * 100;
    hard.style.setProperty("--progress-degree", `${progressDegree1}%`)
    hardPara.textContent = `${hardSolved}/${totalHard} Hard`



    let card1 = document.createElement("div")
    card1.classList.add("user-card1");
    let para1 = document.createElement("p")
    para1.textContent = `Acceptance : ${acceptance}`
    card1.appendChild(para1)
    Usercards.appendChild(card1)

    card1.style.cssText = "color:white; background-color:  #007bff; border: 1px solid #444; border-radius:5px; height:50px;display:flex; align-items:center; justify-content:center; padding:2vw "

    let card2 = document.createElement("div")
    card2.classList.add("user-card2");
    let para2 = document.createElement("p")
    para2.textContent = `Ranking : ${ranking}`
    card2.appendChild(para2)
    Usercards.appendChild(card2)
    card2.style.cssText = "color:white; background-color: #007bff; border: 1px solid #444;  border-radius:5px; height:50px; display:flex; align-items:center ; justify-content:center;padding:2vw"

}


