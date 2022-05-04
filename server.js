const express = require("express");
const {response} = require("express");
//require faker api dependencies
const {faker} = require("@faker-js/faker");
const app = express();
const PORT = 8001;


// make sure these lines are above any app.get or app.post code blocks
app.use( express.json() );
app.use( express.urlencoded({ extended: true }) );


// const fakerUsers = [];
const createUser = () => ({
    _id: faker.datatype.uuid(),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    password: faker.internet.password(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumber(),
});

// const companies = [];
const createCompany = () => ({
    _id: faker.datatype.uuid(),
    companyName: faker.company.companyName(),
    address: {
        street: faker.address.streetAddress(),
        city: faker.address.cityName(),
        state: faker.address.stateAbbr(),
        zipCode: faker.address.zipCode(),
        country: faker.address.country(),
    },
});


//navigate to main api route
app.get('/api', (req, res) => {
    res.json({message: "Welcome to the API"});
});

//Create User route
app.get("/api/users/new", (req, res)=> {
    const newUser = createUser();
    res.json( newUser );
});

//Create Company route
app.get("/api/companies/new", (req, res)=> {
    const newCompany = createCompany();
    res.json( newCompany );
});

//get user and company info route
app.get("/api/user/company", (req, res) => {
    const allInfo = {
        user : createUser(),
        company : createCompany(),
    };
    res.json( allInfo );
})


app.listen(PORT, ()=> console.log(`App listening on PORT: ${PORT}`));