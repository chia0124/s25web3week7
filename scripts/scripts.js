let sandwich = {
    toasted: false,
    protein: [],
    veggies: [],
    bread: {
        kind: "",
        glutenFree: false
    }
}

document.querySelector("#toasted").addEventListener("change", function(){
    sandwich.toasted = (this.checked) ? true : false;
    //console.log(sandwich);
});

const breadTypes = document.querySelectorAll('input[name="bread"]');
for(let i=0; i<breadTypes.length; i++){
    breadTypes[i].addEventListener("change", addBread);
}

function addBread(){
    sandwich.bread.kind = this.parentNode.textContent.trim();
    //console.log(sandwich);
}

document.querySelector("#gluten").addEventListener("change", function(){
    sandwich.bread.glutenFree = (this.checked) ? true : false;
    console.log(sandwich);
});

const allProtein = document.querySelectorAll(".protein input");

for(const eachProtein of allProtein){
    eachProtein.addEventListener("change", addProtein);
}

function addProtein(){
    const proteinName = this.parentNode.textContent.trim();
    if(this.checked){
        sandwich.protein.push(this.parentNode.textContent.trim());
    }else{
        const proteinPos = sandwich.protein.indexOf(proteinName);
        if (proteinPos > -1) {
            sandwich.protein.splice(proteinPos, 1);
        }
    }
    console.log(sandwich);
}

const allVeggies = document.querySelectorAll(".veggies input");

for(const eachVeggies of allVeggies){
    eachVeggies.addEventListener("change", addVeggies);
}

function addVeggies(){
    const veggiesName = this.parentNode.textContent.trim();
    if(this.checked){
        sandwich.veggies.push(this.parentNode.textContent.trim());
    }else{
        const veggiesPos = sandwich.veggies.indexOf(veggiesName);
        if (veggiesPos > -1) {
            sandwich.veggies.splice(veggiesPos, 1);
        }
    }
    console.log(sandwich);
}

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
    if (sandwich.bread.kind == "") {
        const messageTemplate = `<p class="red"> Your sandwich to be on bread!</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }else if (sandwich.protein.length == 0 && sandwich.veggies.length == 0) {
        const messageTemplate = `<p class="red">Your sandwich needs topping!</p>`
        document.querySelector(".order").innerHTML = messageTemplate;
    }else{

        const toastedM = (sandwich.toasted) ? "toasted" : "";
        const glutenM = (sandwich.bread.glutenFree) ? "gluten free" : "";

        const messageTemplate = `<p>You ordered a ${toastedM} sandwich on ${glutenM} ${sandwich.bread.kind} with ${sandwich.protein.join(", ")} and ${sandwich.veggies.join(", ")}</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }
});