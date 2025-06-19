//create an object to hold information about the sandwich
let sandwich = {
    toasted: false,
    //store the protein and veggies as arrays inside the object
    protein: [],
    veggies: [],
    //store information about the bread as an object within this object
    bread: {
        kind: "", //an empty string
        glutenFree: false
    }
}

//add an event listener to the "toasted" checkbox
//because this is a very simple function, we don't need to store the element in a variable
//we can also use an anonymous function (unnamed) which exists only as part of the
//event listener
document.querySelector("#toasted").addEventListener("change", function(){
    //use a shorthand if statement to ask the question
    //figure out whether the checkbox is checked or unchecked
    sandwich.toasted = (this.checked) ? true : false;
    //console.log(sandwich);
});

document.querySelector("#gluten").addEventListener("change", function(){
    //use a shorthand if statement to ask the question
    //figure out whether the checkbox is checked or unchecked
    sandwich.bread.glutenFree = (this.checked) ? true : false;
    console.log(sandwich);
});

//check the type of bread and add it to the object
//use a classic for loop to add event listeners to all the radio buttons
const breadTypes = document.querySelectorAll('input[name="bread"]');
for(let i=0; i<breadTypes.length; i++){
    breadTypes[i].addEventListener("change", addBread);
}

//the function for adding a bread type to the object
function addBread(){
    //when we're adding the text content, use trim() to remove any
    //spaces from the beginning or the end of the text
    sandwich.bread.kind = this.parentNode.textContent.trim();
    console.log(sandwich);
}


//add the protein to the array inside of the object
//users can check and uncheck options, so we have to able to add and remove from the array
const allProtein = document.querySelectorAll(".protein input");
//use a for ... of loop, which doesn't require you to know the length of the array
for(const eachProtein of allProtein){
    //"eachProtein" will temporarily store each of the objects from the array allProtein
    eachProtein.addEventListener("change", addProtein);
}

function addProtein(){
    //get the value of the label and store it in a variable
    const proteinName = this.parentNode.textContent.trim();
    //check to see if the checkbox is checked or unchecked
    if(this.checked){
        //if checked, add this object to the protein array
        sandwich.protein.push(proteinName);
    }else{
        //if unchecked, remove this object from the array
        //first, we have to figure out if the thing is in the array
        //and if it is, what position it's at
        const proteinPos = sandwich.protein.indexOf(proteinName);
        //if the object not in the array, indexOf will return -1
        if(proteinPos > -1){
            //if the position (index) is greater than -1, then the thing is in the array
            //use splice to remove it - splice(position, number of things to remove)
            sandwich.protein.splice(proteinPos, 1);
        }
    }
    console.log(sandwich);
}

const allVeggies = document.querySelectorAll(".veggies input");
//use a for ... of loop, which doesn't require you to know the length of the array
for(const eachVeggies of allVeggies){
    //"eachVeggies" will temporarily store each of the objects from the array allVeggies
    eachVeggies.addEventListener("change", addVeggies);
}

function addVeggies(){
    const veggiesName = this.parentNode.textContent.trim();
    
    if(this.checked){
        sandwich.veggies.push(veggiesName);
    }else{
        const veggiesPos = sandwich.veggies.indexOf(veggiesName);
        if(veggiesPos > -1){
            sandwich.veggies.splice(veggiesPos, 1);
        }
    }
    console.log(sandwich);
}


//add an event listener to the form to see when it is submitted
document.querySelector("form").addEventListener("submit", function(event){
    //stop the form from submitting by stopping it's default behaviour
    event.preventDefault();

    //validate the form...
    //first check if the user selected a bread type
    if(sandwich.bread.kind == ""){
        //use template literals to create the html for the error
        const messageTemplate = `<p class="red">Your sandwich has to be on bread!</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }else if(sandwich.protein.length == 0 && sandwich.veggies.length == 0){
        //if both toppings arrays are empty, the user didn't select anything
        const messageTemplate = `<p class="red">Your sandwich needs topping!</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }else{
        //they have both bread and toppings, so confirm their order...
        //create a message that repeats what they wanted

        //turn our boolean values into readable text...
        const toastedM = (sandwich.toasted) ? "toasted" : "";
        const glutenM = (sandwich.bread.glutenFree) ? "gluten free" : "";
        

        //build a message based on all the things in the object
        const messageTemplate = `<p>You ordered a ${toastedM} sandwich on ${glutenM} ${sandwich.bread.kind} with ${sandwich.protein.join(", ")} and ${sandwich.veggies.join(", ")}.</p>`;
        document.querySelector(".order").innerHTML = messageTemplate;
    }
});