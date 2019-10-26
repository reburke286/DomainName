$(document).ready(function(){
    $('.modal').modal();


    function addDomainToModal(domain) {
        // variable to create new li element
        var li = $("<li>");
        li.html(domain + "   <button class=\"delete-button\">Delete</button>");
        // li.id = domain;
        // appending li to div
        $("#ul-modal").append(li);
    };

    function getDomainsFromLocalStorage() {
        var domains = JSON.parse(localStorage.getItem("domain"));
        if (!domains) {
            domains = [];
        }
        return domains;
    }

    function addDomainNamesToModal() {
      
        var domains = getDomainsFromLocalStorage();
        
        for (var i = 0; i < domains.length; i++) {
            addDomainToModal(domains[i]); 
        }
    }

    addDomainNamesToModal();

    function addNewDomainToLocalStorage(domain) {
        //getting domains from local storage
        var domains = getDomainsFromLocalStorage();
        domains.push(domain);
        // save it to local storage
        localStorage.setItem("domain", JSON.stringify(domains));
    }

    function addDomainName() {
        //grab the domain name that was just added
        var name = $("#textarea2").val();
        // add it to the modal
        addDomainToModal(name);
        addNewDomainToLocalStorage(name);
    }

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
