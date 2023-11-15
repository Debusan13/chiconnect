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

        backToBusiness() {
            window.location.href = '/search';
        },


        goBack() {
            window.location.href = '/';
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