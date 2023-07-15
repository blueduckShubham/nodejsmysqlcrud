const express = require("express");
const app = express();
const port = 3308
const mysql = require("./connection").con
    // configuration
app.set("view engine", "hbs");
app.set("views", "./view")
app.use(express.static(__dirname + "/public"))

// app.use(express.urlencoded())
// app.use(express.json())
// Routing
app.get("/", (req, res) => {
    res.render("index")
});
app.get("/add", (req, res) => {
    res.render("add")

});
app.get("/search", (req, res) => {
    res.render("search")

});
app.get("/update", (req, res) => {
    res.render("update")

});

app.get("/delete", (req, res) => {
    res.render("delete")

});

app.get("/getStudent", (req, res) => {
    // Set the response header to indicate JSON content
  res.setHeader('Content-Type', 'application/json');

    let qry = "select * from test ";
    mysql.query(qry, (err, results) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
          // Send the JSON response
        res.json({ data: results });
    });
})

app.get("/view", (req, res) => {
    let qry = "select * from test ";
    mysql.query(qry, (err, results) => {
        if (err) throw err
        else {
            res.render("view", { data: results });
        }

    });

});


app.get("/addstudent", (req, res) => {
    // fetching data from form
    const { name, phone, email, gender } = req.query

    console.log("fdsfsdf")
    console.log(name)

    // Sanitization XSS...
    let qry = "select * from test where emailid=? or phoneno=?";
    mysql.query(qry, [email, phone], (err, results) => {
        if (err)
            throw err
        else {

            if (results.length > 0) {
                res.render("add", { checkmesg: true })
            } else {

                // insert query
                let qry2 = "insert into test values(?,?,?,?)";
                mysql.query(qry2, [name, phone, email, gender], (err, results) => {
                    if (results.affectedRows > 0) {
                        res.render("add", { mesg: true })
                    }
                })
            }
        }
    })
});


app.get("/searchstudent", (req, res) => {
    // fetch data from the form


    const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("search", { mesg1: true, mesg2: false })
            } else {

                res.render("search", { mesg1: false, mesg2: true })

            }

        }
    });
})

app.get("/updatesearch", (req, res) => {

    const { phone } = req.query;

    let qry = "select * from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.length > 0) {
                res.render("update", { mesg1: true, mesg2: false, data: results })
            } else {

                res.render("update", { mesg1: false, mesg2: true })

            }

        }
    });
})
app.get("/updatestudent", (req, res) => {
    // fetch data

    const { phone, name, gender } = req.query;
    let qry = "update test set username=?, gender=? where phoneno=?";

    mysql.query(qry, [name, gender, phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("update", { umesg: true })
            }
        }
    })

});

app.get("/removestudent", (req, res) => {

    // fetch data from the form


    const { phone } = req.query;

    let qry = "delete from test where phoneno=?";
    mysql.query(qry, [phone], (err, results) => {
        if (err) throw err
        else {
            if (results.affectedRows > 0) {
                res.render("delete", { mesg1: true, mesg2: false })
            } else {

                res.render("delete", { mesg1: false, mesg2: true })

            }

        }
    });
});
//Create Server
app.listen(port, (err) => {
    if (err)
        throw err
    else
        console.log("Server is running at port %d:", port);
});



var states = {
    "states": [
      {
        "name": "Andhra Pradesh",
        "districts": [
          "Anantapur",
          "Chittoor",
          "East Godavari",
          "Guntur",
          "Krishna",
          "Kurnool",
          "Prakasam",
          "Srikakulam",
          "Visakhapatnam",
          "Vizianagaram",
          "West Godavari",
          "YSR Kadapa"
        ]
      },
      {
        "name": "Arunachal Pradesh",
        "districts": [
          "Anjaw",
          "Changlang",
          "Dibang Valley",
          "East Kameng",
          "East Siang",
          "Kamle",
          "Kra Daadi",
          "Kurung Kumey",
          "Lepa Rada",
          "Lohit",
          "Longding",
          "Lower Dibang Valley",
          "Lower Siang",
          "Lower Subansiri",
          "Namsai",
          "Pakke Kessang",
          "Papum Pare",
          "Shi Yomi",
          "Siang",
          "Tawang",
          "Tirap",
          "Upper Siang",
          "Upper Subansiri",
          "West Kameng",
          "West Siang"
        ]
      },
      {
        "name": "Assam",
        "districts": [
          "Baksa",
          "Barpeta",
          "Biswanath",
          "Bongaigaon",
          "Cachar",
          "Charaideo",
          "Chirang",
          "Darrang",
          "Dhemaji",
          "Dhubri",
          "Dibrugarh",
          "Dima Hasao",
          "Goalpara",
          "Golaghat",
          "Hailakandi",
          "Hojai",
          "Jorhat",
          "Kamrup",
          "Kamrup Metropolitan",
          "Karbi Anglong",
          "Karimganj",
          "Kokrajhar",
          "Lakhimpur",
          "Majuli",
          "Morigaon",
          "Nagaon",
          "Nalbari",
          "Sivasagar",
          "Sonitpur",
          "South Salmara-Mankachar",
          "Tinsukia",
          "Udalguri",
          "West Karbi Anglong"
        ]
      },
      {
        "name": "Bihar",
        "districts": [
          "Araria",
          "Arwal",
          "Aurangabad",
          "Banka",
          "Begusarai",
          "Bhagalpur",
          "Bhojpur",
          "Buxar",
          "Darbhanga",
          "East Champaran",
          "Gaya",
          "Gopalganj",
          "Jamui",
          "Jehanabad",
          "Kaimur",
          "Katihar",
          "Khagaria",
          "Kishanganj",
          "Lakhisarai",
          "Madhepura",
          "Madhubani",
          "Munger",
          "Muzaffarpur",
          "Nalanda",
          "Nawada",
          "Patna",
          "Purnia",
          "Rohtas",
          "Saharsa",
          "Samastipur",
          "Saran",
          "Sheikhpura",
          "Sheohar",
          "Sitamarhi",
          "Siwan",
          "Supaul",
          "Vaishali",
          "West Champaran"
        ]
      },
      {
        "name": "Chhattisgarh",
        "districts": [
          "Balod",
          "Baloda Bazar",
          "Balrampur",
          "Bastar",
          "Bemetara",
          "Bijapur",
          "Bilaspur",
          "Dantewada",
          "Dhamtari",
          "Durg",
          "Gariaband",
          "Gaurela-Pendra-Marwahi",
          "Janjgir-Champa",
          "Jashpur",
          "Kanker",
          "Kawardha",
          "Kondagaon",
          "Korba",
          "Koriya",
          "Mahasamund",
          "Mungeli",
          "Narayanpur",
          "Raigarh",
          "Raipur",
          "Rajnandgaon",
          "Sukma",
          "Surajpur",
          "Surguja"
        ]
      },
      {
        "name": "Goa",
        "districts": [
          "North Goa",
          "South Goa"
        ]
      },
      {
        "name": "Gujarat",
        "districts": [
          "Ahmedabad",
          "Amreli",
          "Anand",
          "Aravalli",
          "Banaskantha",
          "Bharuch",
          "Bhavnagar",
          "Botad",
          "Chhota Udaipur",
          "Dahod",
          "Dang",
          "Devbhoomi Dwarka",
          "Gandhinagar",
          "Gir Somnath",
          "Jamnagar",
          "Junagadh",
          "Kutch",
          "Kheda",
          "Mahisagar",
          "Mehsana",
          "Morbi",
          "Narmada",
          "Navsari",
          "Panchmahal",
          "Patan",
          "Porbandar",
          "Rajkot",
          "Sabarkantha",
          "Surat",
          "Surendranagar",
          "Tapi",
          "Vadodara",
          "Valsad"
        ]
      },
      {
        "name": "Haryana",
        "districts": [
          "Ambala",
          "Bhiwani",
          "Charkhi Dadri",
          "Faridabad",
          "Fatehabad",
          "Gurugram",
          "Hisar",
          "Jhajjar",
          "Jind",
          "Kaithal",
          "Karnal",
          "Kurukshetra",
          "Mahendragarh",
          "Nuh",
          "Palwal",
          "Panchkula",
          "Panipat",
          "Rewari",
          "Rohtak",
          "Sirsa",
          "Sonipat",
          "Yamunanagar"
        ]
      },
      {
        "name": "Himachal Pradesh",
        "districts": [
          "Bilaspur",
          "Chamba",
          "Hamirpur",
          "Kangra",
          "Kinnaur",
          "Kullu",
          "Lahaul and Spiti",
          "Mandi",
          "Shimla",
          "Sirmaur",
          "Solan",
          "Una"
        ]
      },
      {
        "name": "Jharkhand",
        "districts": [
          "Bokaro",
          "Chatra",
          "Deoghar",
          "Dhanbad",
          "Dumka",
          "East Singhbhum",
          "Garhwa",
          "Giridih",
          "Godda",
          "Gumla",
          "Hazaribagh",
          "Jamtara",
          "Khunti",
          "Koderma",
          "Latehar",
          "Lohardaga",
          "Pakur",
          "Palamu",
          "Ramgarh",
          "Ranchi",
          "Sahibganj",
          "Seraikela-Kharsawan",
          "Simdega",
          "West Singhbhum"
        ]
      },
      {
        "name": "Karnataka",
        "districts": [
          "Bagalkot",
          "Ballari",
          "Belagavi",
          "Bengaluru Rural",
          "Bengaluru Urban",
          "Bidar",
          "Chamarajanagar",
          "Chikballapur",
          "Chikkamagaluru",
          "Chitradurga",
          "Dakshina Kannada",
          "Davanagere",
          "Dharwad",
          "Gadag",
          "Hassan",
          "Haveri",
          "Kalaburagi",
          "Kodagu",
          "Kolar",
          "Koppal",
          "Mandya",
          "Mysuru",
          "Raichur",
          "Ramanagara",
          "Shivamogga",
          "Tumakuru",
          "Udupi",
          "Uttara Kannada",
          "Vijayapura",
          "Yadgir"
        ]
      },
      {
        "name": "Kerala",
        "districts": [
          "Alappuzha",
          "Ernakulam",
          "Idukki",
          "Kannur",
          "Kasaragod",
          "Kollam",
          "Kottayam",
          "Kozhikode",
          "Malappuram",
          "Palakkad",
          "Pathanamthitta",
          "Thiruvananthapuram",
          "Thrissur",
          "Wayanad"
        ]
      },
      {
        "name": "Madhya Pradesh",
        "districts": [
          "Agar Malwa",
          "Alirajpur",
          "Anuppur",
          "Ashoknagar",
          "Balaghat",
          "Barwani",
          "Betul",
          "Bhind",
          "Bhopal",
          "Burhanpur",
          "Chhatarpur",
          "Chhindwara",
          "Damoh",
          "Datia",
          "Dewas",
          "Dhar",
          "Dindori",
          "Guna",
          "Gwalior",
          "Harda",
          "Hoshangabad",
          "Indore",
          "Jabalpur",
          "Jhabua",
          "Katni",
          "Khandwa",
          "Khargone",
          "Mandla",
          "Mandsaur",
          "Morena",
          "Narsinghpur",
          "Neemuch",
          "Panna",
          "Raisen",
          "Rajgarh",
          "Ratlam",
          "Rewa",
          "Sagar",
          "Satna",
          "Sehore",
          "Seoni",
          "Shahdol",
          "Shajapur",
          "Sheopur",
          "Shivpuri",
          "Sidhi",
          "Singrauli",
          "Tikamgarh",
          "Ujjain",
          "Umaria",
          "Vidisha"
        ]
      },
      {
        "name": "Maharashtra",
        "districts": [
          "Ahmednagar",
          "Akola",
          "Amravati",
          "Aurangabad",
          "Beed",
          "Bhandara",
          "Buldhana",
          "Chandrapur",
          "Dhule",
          "Gadchiroli",
          "Gondia",
          "Hingoli",
          "Jalgaon",
          "Jalna",
          "Kolhapur",
          "Latur",
          "Mumbai City",
          "Mumbai Suburban",
          "Nagpur",
          "Nanded",
          "Nandurbar",
          "Nashik",
          "Osmanabad",
          "Palghar",
          "Parbhani",
          "Pune",
          "Raigad",
          "Ratnagiri",
          "Sangli",
          "Satara",
          "Sindhudurg",
          "Solapur",
          "Thane",
          "Wardha",
          "Washim",
          "Yavatmal"
        ]
      },
      {
        "name": "Manipur",
        "districts": [
          "Bishnupur",
          "Chandel",
          "Churachandpur",
          "Imphal East",
          "Imphal West",
          "Jiribam",
          "Kakching",
          "Kamjong",
          "Kangpokpi",
          "Noney",
          "Pherzawl",
          "Senapati",
          "Tamenglong",
          "Tengnoupal",
          "Thoubal",
          "Ukhrul"
        ]
      },
      {
        "name": "Meghalaya",
        "districts": [
          "East Garo Hills",
          "East Jaintia Hills",
          "East Khasi Hills",
          "North Garo Hills",
          "Ri Bhoi",
          "South Garo Hills",
          "South West Garo Hills",
          "South West Khasi Hills",
          "West Garo Hills",
          "West Jaintia Hills",
          "West Khasi Hills"
        ]
      },
      {
        "name": "Mizoram",
        "districts": [
          "Aizawl",
          "Champhai",
          "Hnahthial",
          "Khawzawl",
          "Kolasib",
          "Lawngtlai",
          "Lunglei",
          "Mamit",
          "Saiha",
          "Saitual",
          "Serchhip"
        ]
      },
      {
        "name": "Nagaland",
        "districts": [
          "Dimapur",
          "Kiphire",
          "Kohima",
          "Longleng",
          "Mokokchung",
          "Mon",
          "Peren",
          "Phek",
          "Tuensang",
          "Wokha",
          "Zunheboto"
        ]
      },
      {
        "name": "Odisha",
        "districts": [
          "Angul",
          "Balangir",
          "Balasore",
          "Bargarh",
          "Bhadrak",
          "Boudh",
          "Cuttack",
          "Deogarh",
          "Dhenkanal",
          "Gajapati",
          "Ganjam",
          "Jagatsinghpur",
          "Jajpur",
          "Jharsuguda",
          "Kalahandi",
          "Kandhamal",
          "Kendrapara",
          "Kendujhar",
          "Khordha",
          "Koraput",
          "Malkangiri",
          "Mayurbhanj",
          "Nabarangpur",
          "Nayagarh",
          "Nuapada",
          "Puri",
          "Rayagada",
          "Sambalpur",
          "Subarnapur",
          "Sundargarh"
        ]
      },
      {
        "name": "Punjab",
        "districts": [
          "Amritsar",
          "Barnala",
          "Bathinda",
          "Faridkot",
          "Fatehgarh Sahib",
          "Fazilka",
          "Ferozepur",
          "Gurdaspur",
          "Hoshiarpur",
          "Jalandhar",
          "Kapurthala",
          "Ludhiana",
          "Mansa",
          "Moga",
          "Muktsar",
          "Nawanshahr",
          "Pathankot",
          "Patiala",
          "Rupnagar",
          "Sahibzada Ajit Singh Nagar",
          "Sangrur",
          "Shahid Bhagat Singh Nagar",
          "Sri Muktsar Sahib",
          "Tarn Taran"
        ]
      },
      {
        "name": "Rajasthan",
        "districts": [
          "Ajmer",
          "Alwar",
          "Banswara",
          "Baran",
          "Barmer",
          "Bharatpur",
          "Bhilwara",
          "Bikaner",
          "Bundi",
          "Chittorgarh",
          "Churu",
          "Dausa",
          "Dholpur",
          "Dungarpur",
          "Hanumangarh",
          "Jaipur",
          "Jaisalmer",
          "Jalore",
          "Jhalawar",
          "Jhunjhunu",
          "Jodhpur",
          "Karauli",
          "Kota",
          "Nagaur",
          "Pali",
          "Pratapgarh",
          "Rajsamand",
          "Sawai Madhopur",
          "Sikar",
          "Sirohi",
          "Sri Ganganagar",
          "Tonk",
          "Udaipur"
        ]
      },
      {
        "name": "Sikkim",
        "districts": [
          "East Sikkim",
          "North Sikkim",
          "South Sikkim",
          "West Sikkim"
        ]
      },
      {
        "name": "Tamil Nadu",
        "districts": [
          "Ariyalur",
          "Chengalpattu",
          "Chennai",
          "Coimbatore",
          "Cuddalore",
          "Dharmapuri",
          "Dindigul",
          "Erode",
          "Kallakurichi",
          "Kanchipuram",
          "Kanyakumari",
          "Karur",
          "Krishnagiri",
          "Madurai",
          "Mayiladuthurai",
          "Nagapattinam",
          "Namakkal",
          "Nilgiris",
          "Perambalur",
          "Pudukkottai",
          "Ramanathapuram",
          "Ranipet",
          "Salem",
          "Sivaganga",
          "Tenkasi",
          "Thanjavur",
          "Theni",
          "Thoothukudi",
          "Tiruchirappalli",
          "Tirunelveli",
          "Tirupathur",
          "Tiruppur",
          "Tiruvallur",
          "Tiruvannamalai",
          "Tiruvarur",
          "Vellore",
          "Viluppuram",
          "Virudhunagar"
        ]
      },
      {
        "name": "Telangana",
        "districts": [
          "Adilabad",
          "Bhadradri Kothagudem",
          "Hyderabad",
          "Jagtial",
          "Jangaon",
          "Jayashankar Bhupalpally",
          "Jogulamba Gadwal",
          "Kamareddy",
          "Karimnagar",
          "Khammam",
          "Komaram Bheem Asifabad",
          "Mahabubabad",
          "Mahabubnagar",
          "Mancherial",
          "Medak",
          "Medchal-Malkajgiri",
          "Mulugu",
          "Nagarkurnool",
          "Nalgonda",
          "Narayanpet",
          "Nirmal",
          "Nizamabad",
          "Peddapalli",
          "Rajanna Sircilla",
          "Rangareddy",
          "Sangareddy",
          "Siddipet",
          "Suryapet",
          "Vikarabad",
          "Wanaparthy",
          "Warangal Rural",
          "Warangal Urban",
          "Yadadri Bhuvanagiri"
        ]
      },
      {
        "name": "Tripura",
        "districts": [
          "Dhalai",
          "Gomati",
          "Khowai",
          "North Tripura",
          "Sepahijala",
          "South Tripura",
          "Unakoti",
          "West Tripura"
        ]
      },
      {
        "name": "Uttar Pradesh",
        "districts": [
          "Agra",
          "Aligarh",
          "Ambedkar Nagar",
          "Amethi",
          "Amroha",
          "Auraiya",
          "Ayodhya",
          "Azamgarh",
          "Badaun",
          "Baghpat",
          "Bahraich",
          "Ballia",
          "Balrampur",
          "Banda",
          "Barabanki",
          "Bareilly",
          "Basti",
          "Bhadohi",
          "Bijnor",
          "Budaun",
          "Bulandshahr",
          "Chandauli",
          "Chitrakoot",
          "Deoria",
          "Etah",
          "Etawah",
          "Faizabad",
          "Farrukhabad",
          "Fatehpur",
          "Firozabad",
          "Gautam Buddh Nagar",
          "Ghaziabad",
          "Ghazipur",
          "Gonda",
          "Gorakhpur",
          "Hamirpur",
          "Hapur",
          "Hardoi",
          "Hathras",
          "Jalaun",
          "Jaunpur",
          "Jhansi",
          "Kannauj",
          "Kanpur Dehat",
          "Kanpur Nagar",
          "Kasganj",
          "Kaushambi",
          "Kheri",
          "Kushinagar",
          "Lalitpur",
          "Lucknow",
          "Maharajganj",
          "Mahoba",
          "Mainpuri",
          "Mathura",
          "Mau",
          "Meerut",
          "Mirzapur",
          "Moradabad",
          "Muzaffarnagar",
          "Pilibhit",
          "Pratapgarh",
          "Prayagraj",
          "Raebareli",
          "Rampur",
          "Saharanpur",
          "Sambhal",
          "Sant Kabir Nagar",
          "Shahjahanpur",
          "Shamli",
          "Shravasti",
          "Siddharthnagar",
          "Sitapur",
          "Sonbhadra",
          "Sultanpur",
          "Unnao",
          "Varanasi"
        ]
      },
      {
        "name": "Uttarakhand",
        "districts": [
          "Almora",
          "Bageshwar",
          "Chamoli",
          "Champawat",
          "Dehradun",
          "Haridwar",
          "Nainital",
          "Pauri Garhwal",
          "Pithoragarh",
          "Rudraprayag",
          "Tehri Garhwal",
          "Udham Singh Nagar",
          "Uttarkashi"
        ]
      },
      {
        "name": "West Bengal",
        "districts": [
          "Alipurduar",
          "Bankura",
          "Birbhum",
          "Cooch Behar",
          "Dakshin Dinajpur",
          "Darjeeling",
          "Hooghly",
          "Howrah",
          "Jalpaiguri",
          "Jhargram",
          "Kalimpong",
          "Kolkata",
          "Malda",
          "Murshidabad",
          "Nadia",
          "North 24 Parganas",
          "Paschim Bardhaman",
          "Paschim Medinipur",
          "Purba Bardhaman",
          "Purba Medinipur",
          "Purulia",
          "South 24 Parganas",
          "Uttar Dinajpur"
        ]
      }
    ]
  }
  