//Becca's code
$(document).ready(function(){
    //Triggers the modal when you hit Edit Domains button
    $("#modal1").modal();

    //makes the X button in the modal work
    $(".close").on("click", function() {
        $("#modal1").modal('close');
    });

    // Isabel's function - original X button code that I had to override bc it stopped working
    // function closeModal() {
    //     var spanX = document.getElementsByClassName("close");

    //     for (var i = 0; i < spanX.length; i++) {
    //         spanX[i].addEventListener("click", function() {
    //         this.parentElement.style.display = 'none';
    //         document.body.parentElement;
    //         });
    //     }
    // }

    // closes the modal using X button
    // closeModal();

    // Becca's code
    // whenever you call this function it will dynamically create li's and button's for the domain names
    function addDomainToModal(domain) {
        var li = $("<li>");
        li.html("<p>" + domain + "</p>" + "<button class=\"delete-button\">Delete</button>");
        $("#ul-modal").append(li);
    };

    // calls array of domain names out of local storage
    function getDomainsFromLocalStorage() {
        var domains = JSON.parse(localStorage.getItem("domain"));
        if (!domains) {
            domains = [];
        }
        return domains;
    }
    // adds the array from localStorage onto the modal
    function addDomainNamesToModal() {
      
        var domains = getDomainsFromLocalStorage();
        
        for (var i = 0; i < domains.length; i++) {
            addDomainToModal(domains[i]); 
        }
    }
    // at startup, page will add array of domain names from localStorage on to modal
    addDomainNamesToModal();

    // when called will add new domain name into the array and save to localStorage
    function addNewDomainToLocalStorage(domain) {
        var domains = getDomainsFromLocalStorage();
        domains.push(domain);
        localStorage.setItem("domain", JSON.stringify(domains));
    }
    // when called will turn the value of the textarea into a string, add it to the modal and in to localStorage
    function addDomainName() {
        var name = $("#textarea2").val();
        addDomainToModal(name);
        addNewDomainToLocalStorage(name);
        $("#textarea2").val("");
    }

    // eventListener for delete button - targets the "p" element and deletes it
    $('#ul-modal').on('click','.delete-button', function(event){    
        removeLiFromModal(event.target.parentElement);
        var domainString = $(event.target.parentElement).find("p").text();
        removeFromLocalStorage(domainString);
        
    });
    // removes the "li" when you hit delete
    function removeLiFromModal(li) {
        li.remove();
    };

    // takes deleted domain names out of localStorage
    function removeFromLocalStorage(domain) {
        var domains = getDomainsFromLocalStorage();
        var newDomains = [];
        for (var i = 0; i < domains.length; i++) {
            if (domains[i] !== domain) {
                newDomains.push(domains[i]);
            }
        }
        localStorage.setItem("domain", JSON.stringify(newDomains));
    };

    // when you hit the add button, calls the function to addDomainName
    $('#add-btn').on("click", addDomainName);

    // function for calling API
    function callDomainNames() {
        var domain = getDomainsFromLocalStorage();
        
        // runs every domain name through a for lop t
        for (var i = 0; i < domain.length; i++) {
            var queryURL  = "https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName="
            + domain[i]
            + "&apiKey=at_VJOCbddqnW4UVF2O91OV8GPey30CI"
            + "&outputFormat=" + "JSON";
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response) {

                // Ty's Code - subtracts the expiration date from the current time by one month
                var expireDate = response.WhoisRecord.expiresDate;
                var minusMonth = moment(expireDate).subtract(30, "days");
                var isExpired = !moment(minusMonth).isAfter();
                var isExpiredMessage = isExpired ? "domain WILL expire within the next 30 days": "domain will not expire within the next 30 days";
                
                // Becca's Code 
                var domainName = response.WhoisRecord.domainName;
                var expireDate = response.WhoisRecord.expiresDate;
                var expireDateFormatted = moment(expireDate).format("YYYY-MM-DD");
                var contactEmail = response.WhoisRecord.contactEmail;

                // appends domain name data to website table if it's going to expire
                if (isExpiredMessage === "domain WILL expire within the next 30 days") {
                    var tdOne = $("<td></td>").text(domainName);
                    var tdTwo = $("<td></td>").text(expireDateFormatted);
                    var tdThree = $("<td></td>").text(contactEmail);
         
                    var tableRow = $("<tr></tr>");
                    var tableBody = $(".data-body")
                    
                    tableBody.append(tableRow);
                    tableRow.append(tdOne);
                    tableRow.append(tdTwo);
                    tableRow.append(tdThree);
                };  
            });
        };
    };

    // calls the domain name API function
    callDomainNames();
}); 