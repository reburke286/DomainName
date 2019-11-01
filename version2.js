$(document).ready(function(){
    $('#edit-button').on("click", function() {
        $("#modal1").modal();
    })

    // Isabel's function
    function closeModal() {
        // var spanX = document.getElementsByClassName("close");

        $(".close").on("click", function() {
            $("#modal1").modal('close');
        })

        // for (var i = 0; i < spanX.length; i++) {
        //     spanX[i].addEventListener("click", function() {
        //     this.parentElement.style.display = 'none';
        //     document.body.parentElement;
        //     });
        // }
    }

    // closes the modal using X button
    closeModal();

    init();

    // Becca's code
    function addDomainToModal(domain) {
        for (var i = 0; i < domains.length; i++) {
            var domain = domains[i];
            var li = $("<li>");
            li.html(domain + "       <button class=\"delete-button\">Delete</button>");
            $("#ul-modal").append(li);  
            li.attr("data-index", i);
        }
    };

    // function getDomainsFromLocalStorage() {
        function init() {
        var storedDomains = JSON.parse(localStorage.getItem("domain"));
        if (storedDomains !== null) {
            domains = storedDomains;
        }
        if (!domains) {
            return;
        }
        addDomainNamesToModal();
    }

    function addDomainNamesToModal() {
        
        for (var i = 0; i < domains.length; i++) {
            addDomainToModal(domains[i]); 
        }
    }

    function addNewDomainToLocalStorage() {
        // var domains = getDomainsFromLocalStorage();
       
        localStorage.setItem("domain", JSON.stringify(domains));
    }

    function addDomainName() {
        var name = $("#textarea2").val();
        if (name === "") {
            return;
        }
        domains.push(name);
        $("#textarea2").val() = "";

        addDomainToModal(name);
        addNewDomainToLocalStorage(name);
        console.log(domains);
    }

    $('#ul-modal').on('click','li', function(){
        console.log("you clicked me");
        $(this).remove();
        var index = this.getAttribute("data-index");
        domains.splice(index, 1);

        addDomainToModal(name);
        addNewDomainToLocalStorage(name);

    });

    $('#add-btn').on("click", addDomainName);

    function callDomainNames() {

        for (var i = 0; i < domains.length; i++) {
            var queryURL  = "https://www.whoisxmlapi.com/whoisserver/WhoisService?domainName="
            + domains[i]
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

   
    
}); 


