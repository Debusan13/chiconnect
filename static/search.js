const { createApp, onMounted, ref } = Vue

function getQuery() {
    return myVar;
}

async function reviews(query, lat, long) {
    const res = await fetch('http://127.0.0.1:5000/review' + new URLSearchParams({
        query, lat, long
    }));

    searchResults.value = await res.json();
}

document.addEventListener('DOMContentLoaded', (event) => {
    const thumbsUp = document.getElementById('thumbs-up');
    const thumbsDown = document.getElementById('thumbs-down');


    const friendlyStaff = document.getElementById('friendly-staff')
    const fairPricing = document.getElementById('fair-pricing')
    const fastService = document.getElementById('fast-service')
    const clean = document.getElementById('clean')
  
    thumbsUp.addEventListener('click', () => {
    //   thumbsUp.classList.add('active');
    //   thumbsUp.classList.remove('inactive');
    //   thumbsDown.classList.remove('red');
    //   thumbsDown.classList.add('inactive');

      if (thumbsUp.classList.contains('green')) {
        // If thumbs up is already active, deactivate it
        thumbsUp.classList.remove('green');
      } else {
        // If thumbs up is not active, activate it and deactivate thumbs down
        thumbsUp.classList.add('green');
        thumbsUp.classList.remove('white');
        thumbsDown.classList.remove('red');
        thumbsDown.classList.add('white');
      }
    });
  
    thumbsDown.addEventListener('click', () => {
    //   thumbsDown.classList.add('red');
    //   thumbsDown.classList.remove('inactive');
    //   thumbsUp.classList.remove('green');
    //   thumbsUp.classList.add('inactive');

      if (thumbsDown.classList.contains('red')) {
        // If thumbs down is already active, deactivate it
        thumbsDown.classList.remove('red');
      } else {
        // If thumbs down is not active, activate it and deactivate thumbs up
        thumbsDown.classList.add('red');
        thumbsDown.classList.remove('white');
        thumbsUp.classList.remove('green');
        thumbsUp.classList.add('white');
      }
    });

      friendlyStaff.addEventListener('click', () => {
      if (friendlyStaff.classList.contains('green')) {
        friendlyStaff.classList.remove('green');
        friendlyStaff.classList.add('white');
      }
      else {
        friendlyStaff.classList.remove('white');
        friendlyStaff.classList.add('green');
      }
    });

      fairPricing.addEventListener('click', () => {
      if (fairPricing.classList.contains('green')) {
        fairPricing.classList.remove('green');
        fairPricing.classList.add('white');
      }
      else {
        fairPricing.classList.remove('white');
        fairPricing.classList.add('green');
      }
    });

    fastService.addEventListener('click', () => {
      if (fastService.classList.contains('green')) {
        fastService.classList.remove('green');
        fastService.classList.add('white');
      }
      else {
        fastService.classList.remove('white');
        fastService.classList.add('green');
      }
    });

    clean.addEventListener('click', () => {
      if (clean.classList.contains('green')) {
        clean.classList.remove('green');
        clean.classList.add('white');
      }
      else {
        clean.classList.remove('white');
        clean.classList.add('green');
      }
    });
  });



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
            review: null,
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
        
        goToReviewPage() {

            const businessName =selectedBusiness;
            // Encode the business name to be URL-safe
            const queryParams = new URLSearchParams({ query: businessName });
            // Redirect to the review page with the query included
            window.location.href = `/review?${queryParams.toString()}`;

        },
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