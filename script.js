var inputField = document.getElementById("input"),
    allItemsPage = document.getElementById("allItems");
var addBtn = document.getElementById("add");

let theContainer = document.querySelector(".container"),
    sunBtn = document.querySelector(".sun"),
    moonBtn = document.querySelector(".moon"),

    myText = document.querySelectorAll(".todo-text");

moonBtn.onclick = ()=> {
    moonBtn.classList.remove("on");
    sunBtn.classList.add("on");

    theContainer.addEventListener("click" , ()=>{
        document.documentElement.style.setProperty("--light-theme" , "rgb(58, 58, 58)");
        
    });
    inputField.addEventListener("click" , ()=>{
        document.documentElement.style.setProperty("--dark-text" , "white");
    });

    document.querySelectorAll(".left-zone").forEach((zone)=>{
        zone.addEventListener("click" , ()=>{
            document.documentElement.style.setProperty("--dark-text" , "white");
        });
    })
    
    
}
sunBtn.onclick = ()=>{
    sunBtn.classList.remove("on");
    moonBtn.classList.add("on");
    theContainer.addEventListener("click" , ()=>{
        document.documentElement.style.setProperty("--light-theme" , "white");
    });
    inputField.addEventListener("click" , ()=>{
        document.documentElement.style.setProperty("--dark-text" , "rgb(58, 58, 58)");
    });

    document.querySelectorAll(".left-zone").forEach((zone)=>{
        zone.addEventListener("click" , ()=>{
            document.documentElement.style.setProperty("--dark-text" , "rgb(58, 58, 58)");
        });
    })
}

addBtn.onclick = ()=>{
    
    if(inputField.value !=""){
        
        // Start Creating Elements

        var item = document.createElement("div");
        item.classList.add("item");
        allItemsPage.appendChild(item);

        var leftZone = document.createElement("div");
        leftZone.classList.add("left-zone");
        item.appendChild(leftZone);

        var icon = document.createElement("div");
        icon.classList.add("icon");
        leftZone.appendChild(icon); 

        var verifyImg = document.createElement("img");
        verifyImg.setAttribute("src","images/icon-check.svg");

        icon.appendChild(verifyImg); /* Append verifyImg to the icon */

        var todoText = document.createElement("div");
        todoText.classList.add("todo-text");

        var todoContent = document.createTextNode(inputField.value);
        todoText.appendChild(todoContent);
        leftZone.appendChild(todoText);  // Append the todo text to the left zone

        var closeZone = document.createElement("div");
        closeZone.classList.add("close-zone");

        var closeImg = document.createElement("img");
        closeImg.setAttribute("src","images/icon-cross.svg");

        closeZone.appendChild(closeImg); // append the closeImg to the cloze zone

        // Append the left zone and close zone to the item
        
        item.appendChild(closeZone);
        
        inputField.value="";
        inputField.focus();

    
    
        // End Creating Elements

        // Icon 
           
        var icons = document.querySelectorAll(".icon");
                     
        icons.forEach((icon)=>{
            var parent = icon.parentElement;
            mainPage();
            activePage();
            completedPage();
            icon.onclick = ()=> {
                icon.classList.toggle("checked");

                if(icon.classList.contains("checked")){
                    parent.parentElement.classList.add("done");
                    calculItemsLeft();           
                    
                }else{
                    parent.parentElement.classList.remove("done");
                    calculItemsLeft();
                }
                 clearDoneTasks();
                 
            
                completedPage();  
                activePage(); 
                mainPage();              
            } 
                           
        }); 
        
    }    
        

        closeZone.onclick = function(){ 
            item.classList.add("fall");
            item.addEventListener("transitionend" , function(){
                allItemsPage.removeChild(item);
                calculItemsLeft();
            });
            
            
               
        };       
        calculItemsLeft();

       
}

// Clear all Done tasks

function clearDoneTasks(){ 
    var doneElement = document.querySelectorAll(".item"),
        clearBtn = document.querySelector(".clear-completed");
    
    clearBtn.onclick = ()=>{
        doneElement.forEach((element)=>{
            if(element.classList.contains("item" && "done")){
                element.classList.add("doneOne");
            }
        })
    }

}

// Output how many task not done 
function calculItemsLeft(){
    var theItem = allItemsPage.querySelectorAll(".item"),
            theIconCheck = allItemsPage.querySelectorAll(".icon.checked"),
            output = document.querySelector(".items-left");
    if(theItem.length - theIconCheck.length == 1){
        output.textContent = theItem.length - theIconCheck.length + " item left ";

    }else if(theItem.length - theIconCheck.length > 1){
        output.textContent = theItem.length - theIconCheck.length + " items left ";

    }else{
        output.textContent ="No item left ";
    }
    
}

// remove active class form element of tool bar
function removeActiveClass(){
    var link = document.querySelectorAll(".tool");
    link.forEach((i)=>{
        i.classList.remove("active");
    });
}

function removeFall(){
    const generalItem = document.querySelectorAll(".item");
    generalItem.forEach((item)=>{
        item.classList.remove("fall");
    })
}

function completedPage(){
    const checkedItems = document.querySelectorAll(".item"),
        completeBtn = document.getElementById("completedBtn");

    completeBtn.onclick = function(){
        removeActiveClass();
        removeFall();
        completeBtn.classList.add("active");
        checkedItems.forEach((item)=>{
            if(!item.classList.contains("done")){          
                item.classList.add("doneTwo");
                
            }else{
                item.classList.remove("doneTwo");
            }
        })
    }

}

function activePage(){
    const activeItems = document.querySelectorAll(".item"),
          activeBtn = document.getElementById("activeBtn");
    activeBtn.onclick = function(){
        removeActiveClass();
        removeFall();
        activeBtn.classList.add("active");
        activeItems.forEach((item)=>{       
            if(item.classList.contains("done")){        
                item.classList.add("doneTwo");
                
            }else{
                item.classList.remove("doneTwo");
            }

            })
        }

}

function mainPage(){
    const mainItem = document.querySelectorAll(".item"),
          allBtn = document.getElementById("all");
    allBtn.onclick = function(){
        removeActiveClass();
        
        allBtn.classList.add("active");
        mainItem.forEach((item)=>{
            removeFall();
            item.classList.remove("doneTwo");
        })
    }
}

mainPage();
activePage();
completedPage();