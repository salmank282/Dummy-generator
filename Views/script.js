let generate = document.getElementById("generate");
let deleteButton = document.getElementById("delete");

async function callApi(endpoint){
    try{
        const res= await fetch(`http://127.0.0.1:3000/${endpoint}`, {method:"GET"});
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const text= await res.text();
        document.getElementById("result").innerText = text;
    }catch (err) {
        console.error(`Error calling api: ${err}`);
        document.getElementById("result").innerText = "❌ Failed to call API";
      }
}

generate.addEventListener("click",()=> callApi("generateMany"));

deleteButton.addEventListener("click",()=>callApi("empDelete"));
