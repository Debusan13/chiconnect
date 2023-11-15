const { createApp, onMounted, ref } = Vue

function getQuery() {
    return myVar;
}


// async function getBusinessInfo() {
//     let businesses;
//     const res = await fetch('static/businesses.json')
//     businesses = await res.json()
//     let businessInfo;
//     businessInfo = businesses.filter(b => b.name === businessName);
//     return businessInfo
// }

// async function getBusinessInfo() {
//     let businessInfo;
//     businessInfo = businesses.filter(b => b.name === query);
//     return businessInfo
// }

// var d_var = $("#elem").val(); 

createApp({
    data() {
        return {
            selectedBusiness: [],
            search: "",
            existingPins: {},
        };
      },
    computed: {
        // filteredBusinesses() {
        //     return this.businesses.filter(b => {
        //     if (this.search.length != 0) {
        //         return b.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
        //     }
        //   });
        // }
        // getBusinessInfo() {
        //     let businessInfo;
        //     businessInfo = businesses.filter(b => b.name === query);
        //     return businessInfo
        // }
    },
    methods: {
        // async getBusinessInfo() {
        //     try {
        //         const res = await fetch('static/businesses.json');
        //         const businesses = await res.json();
        //         query = getQuery()
        //         console.log(query)
        //         this.selectedBusiness = businesses.filter(b => b.name === query);
        //         console.log(this.selectedBusiness)
        //     } catch (error) {
        //         console.error('Failed to get business info:', error);
        //     }
        // },
        goBack() {
            console.log('Existing pins before leaving:', this.existingPins);
            this.savePins();
            window.location.href = '/';
        },
        savePins() {
        console.log('Saving pins:', this.existingPins);
        localStorage.setItem('existingPins', JSON.stringify(this.existingPins));
        console.log('Pins saved to local storage');
        
        },
        findPinOnMap(business) {
            if (map && business) {
                // Create a unique identifier for the business
                const businessKey = business.name.toLowerCase()
    
                // Check if a pushpin at this location already exists
                if (!this.existingPins[businessKey]) {
                    // If it doesn't exist, create a new location and pushpin
                    const location = new Microsoft.Maps.Location(business.lat, business.long);
                    const newPushpin = new Microsoft.Maps.Pushpin(location, {
                        icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                        anchor: new Microsoft.Maps.Point(12, 39),

                    });
    
                    // Add the new pushpin to the map
                    map.entities.push(newPushpin);
    
                    // Add the pushpin to the existingPins object
                    this.existingPins[businessKey] = newPushpin;
                    this.savePins()
                    console.log("test: ", this.existingPins)
                }
    
                // Whether it's a new pushpin or existing one, set the map view to center on it and zoom in
                map.setView({ center: this.existingPins[businessKey].getLocation(), zoom: 25 });
            }
        },
    },
    
    mounted() {
        // console.log(getQuery(d));
        // this.search()
        // this.getBusinessInfo(this.query).then(() => {
        //     console.log(this.selectedBusiness);
        // });

        // getBusinesses().then(businessesData => {
        //     this.businesses = businessesData;

        //     query = this.getBusinessName()
        //     this.getBusinessInfo(query).then(info => {
        //         console.log(info);
        //     }).catch(error => {
        //         console.error('Failed to get business info:', error);
        //     });
        // }).catch(error => {
        //     console.error('Failed to load businesses:', error);
        // }); 

        console.log('mounted');
        this.map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
            credentials: 'Your_Bing_Maps_Key'
        });
    }
    
}).mount('#search')