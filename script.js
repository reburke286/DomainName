//Becca's code
$(document).ready(function(){
    $("#modal1").modal();

    $(".close").on("click", function() {
        $("#modal1").modal('close');
    });

    // Isabel's function
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
    function addDomainToModal(domain) {
        var li = $("<li>");
        li.html("<p>" + domain + "</p>" + "<button class=\"delete-button\">Delete</button>");
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
        var domains = getDomainsFromLocalStorage();
        domains.push(domain);
        localStorage.setItem("domain", JSON.stringify(domains));
    }

    function addDomainName() {
        var name = $("#textarea2").val();
        addDomainToModal(name);
        addNewDomainToLocalStorage(name);
        $("#textarea2").val("");
    }

    $('#ul-modal').on('click','.delete-button', function(event){    
        removeLiFromModal(event.target.parentElement);
        var domainString = $(event.target.parentElement).find("p").text();
        removeFromLocalStorage(domainString);
        
    });

    function removeLiFromModal(li) {
        li.remove();
    };

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

    $('#add-btn').on("click", addDomainName);

    function callDomainNames() {
        var domain = getDomainsFromLocalStorage();
        

        for (var i = 0; i < domain.length; i++) {
            var queryURL  = "https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName="
            + domain[i]
            + "&apiKey=at_VJOCbddqnW4UVF2O91OV8GPey30CI"
            + "&outputFormat=" + "JSON";
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function(response) {

                // Ty's Code
                var expireDate = response.WhoisRecord.expiresDate;
                var minusMonth = moment(expireDate).subtract(30, "days");
                var isExpired = !moment(minusMonth).isAfter();
                var isExpiredMessage = isExpired ? "domain WILL expire within the next 30 days": "domain will not expire within the next 30 days";
                
                // Becca's Code
                var domainName = response.WhoisRecord.domainName;
                var expireDate = response.WhoisRecord.expiresDate;
                var expireDateFormatted = moment(expireDate).format("YYYY-MM-DD");
                var contactEmail = response.WhoisRecord.contactEmail;
        
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

    callDomainNames();
}); 