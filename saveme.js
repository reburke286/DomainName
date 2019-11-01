$(document).ready(function(){
    $('.modal').modal();

    // Isabel's function
    function closeModal() {
        var spanX = document.getElementsByClassName("close");

        for (var i = 0; i < spanX.length; i++) {
            spanX[i].addEventListener("click", function() {
            this.parentElement.style.display = 'none';
            document.body.parentElement;
            });
        }
    }

    // closes the modal using X button
    closeModal();

    // Becca's code
    function addDomainToModal(domain) {
        var li = $("<li>");
        li.html(domain + "       <button class=\"delete-button\">Delete</button>");
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
    }

    $('#ul-modal').on('click','li', function(){
        console.log("you clicked me");
        $(this).remove();
        var domains = getDomainsFromLocalStorage();
        var index = element.parentElement.getAttribute("data-index");
        domains.splice(index, 1);

        getDomainsFromLocalStorage();
        addNewDomainToLocalStorage();

        
    });

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


