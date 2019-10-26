$(document).ready(function(){
    $('.modal').modal();


    function addDomainToModal(domain) {
        // variable to store string from textarea
        var name = $("#textarea2").val();
    
        // variable to create new li element
        var li = $("<li>");
        li.html(name + "   <button class=\"delete-button\">Delete</button>");
        li.id = domainNames.length;
        // pushing textarea input to array
        domainNames.push(name);
        // appending li to div
        $("#ul-modal").append(li);
    }

    var domainNames = ["becca-burke.com"];

    function addDomainNamesFromStorage(event) {
        event.preventDefault();
        localStorage.getItem("domain");

        addDomainToModal(domainNames); 
    }

    addDomainNamesFromStorage();

    function addDomainName(event) {
        //grab the domain name that was just added
        // add it to the array of all domainNames (hint: you can do this from local storage - no global vars necessary)
        // add it to the modal
        // save it to local storage

    }

    
          // function addPersonToList(event) {
//     event.preventDefault(); 
//     var name = nameEl.value;
//     var li = document.createElement("li");
//     li.id = people.length;
//     li.innerHTML = name + " <button>edit</button>";
//     people.push({ name: name });
//     peopleListEl.append(li);
//   }  


    // add button - adds domain name to modal & array
    $('#add-btn').on("click", addDomainName);

    // function to find domain expirations
    function callDomainNames() {
        // moment variables
        var today = moment().format("YYYY-MM-DDTHH:MM:ss")
        var domain = "becca-burke.com";
        var queryURL  = "https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName="
        + domain
        + "&apiKey=at_VJOCbddqnW4UVF2O91OV8GPey30CI"
        + "&outputFormat=" + "JSON";
    
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            console.log(response.WhoisRecord.expiresDate);
            console.log(today);
            
        });
    };

    // calls the domain expiration function
    callDomainNames();
    
    
  
});
