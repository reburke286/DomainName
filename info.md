Part one:
add data to dashboard that runs functions nightly 
	*when will it run
1. create a website with two pages
2. page one will show the nightly function dashboard; page two will hold a static example of the data we're trying to pull
3. using a css framework build page 2 showing examples of the tables we're pulling (images from the client to use as basis)
4. using a css framework build page 1 with static html that we can dynamically append the data to *the layouts for both pages should be similar, but page 1 should have more organizational headings to show client at a glance what his data is reporting
5. fill in page 2 with example data provided from client 
6. create a function that pulls data based on SUCCESS, FAILURE, or WARNING from first table cell of page 2 data	
	a. create IF statements ex: if table cell = "success" { append.here } if table cell = "warning" {append.here } else if table cell = "failure" { append.here }
		i. depending on where data is called a certain class will be applied
		ii. depending on which data string it is we'll need to pull different information with it
	b. research how to call data from specific cells
	c. research how to call data from another page
	d. * can we run a for loop on data that's not in an array? *
7. use moment.js to tell the function when to run


Part two:
search clients' domain names and alert Joe when they're expiring

1. create a website with one page
2. the top of the page will allow client to input new domain names 
	a. the input will create the variable for the API search, so we will need an alert if it's input incorrectly
3. the domain names will exist in a modal where you can delete from the list
	a. the domain names will append dynamically when you input them; they will be formatted into an array
4. use AJAX and multiple domain API's (godaddy, squarespace, etc) to search the domain names
	a. research top 3 domain name API's 
5. call the response.expiration 
6. create a for loop to go through the array of domain names to check and call all the expirations
7. create if/else statement. if expiration < 1 month, append to data table
7. append the expirations into a data table at the bottom of the page	
	a. ultimately Joe would prefer this be sent to him via email
8. use moment.js to have the function run weekly