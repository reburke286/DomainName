$(document).ready(function(){
    $('.modal').modal();

    function closeModal() {
        var spanX = document.getElementsByClassName("close");
        var i;
        for (i = 0; i < spanX.length; i++) {
            spanX[i].addEventListener("click", function() {
            this.parentElement.style.display = 'none';
            document.body.parentElement;
            });
        }
    }
    // closes the modal using X button
    closeModal();


    function addDomainToModal(domain) {
        // variable to create new li element
        var li = $("<li>");
        li.html(domain + "   <button class=\"delete-button\">Delete</button>");
        // li.id = domain;
        // appending li to div
        $("#ul-modal").append(li);
    };

    $(".delete-button").on("click", function() { 

    })

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
        var domain = getDomainsFromLocalStorage();
        var queryURL  = "https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName="
        + domain
        + "&apiKey=at_VJOCbddqnW4UVF2O91OV8GPey30CI"
        + "&outputFormat=" + "JSON";

        for (var i = 0; i < domain.length; i++) {
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response) {
                var expireDate = response.WhoisRecord.expiresDate;
                var minusMonth = moment(expireDate).subtract(30, "days");
                var isExpired = !moment(minusMonth).isAfter();
                var isExpiredMessage = isExpired ? "domain WILL expire within the next 30 days": "domain will not expire within the next 30 days";
                console.log(isExpiredMessage); 
                
            });
        }
    };

    callDomainNames();
    

    // function sendEmail() {
    //     $.ajax({
    //         type: "POST",
    //         url: //php document name,


    //     });
    // }
    
    
  
});
