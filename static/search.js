app.component('SearchBar', {
  props: ['addPinAndZoom'],
  template: `
  <div class="form-outline" style="position:absolute; z-index: 1; top: 9%; left: 4%; width: 75%;" data-mdb-input-init>
  <input type="search" class="form-control" v-model="searchTerm" placeholder="Search for services..." @input="performSearch">
  <ul style="list-style:none; padding: 0; margin-top:0.5rem;">
    <li v-for="result in searchResults" :key="result.item.id" style="margin-bottom: 10px; display: flex; align-items: center;">
      <button type="submit" class="btn btn-primary business-button" @click="sendToBusiness(result.item)" style="margin-right: 10px;">
        {{ result.item.name }}
      </button>
      <button type="submit" class="btn location-button" @click="handleClick(result.item)" style="background-color: #007bff; color: white;">
        📍
      </button>
    </li>
  </ul>
</div>

  `,

//   <div class="form-outline" style="position:absolute; z-index: 1; top: 6%; left: 2%; width: 35%;" data-mdb-input-init>
//   <input type="search" class="form-control" v-model="searchTerm" placeholder="Search for services..." @input="performSearch">
//   <ul style="list-style:none">
//     <li v-for="result in searchResults" :key="result.item.id">
//       <button type="submit" id="addBusinessButton" @click="handleClick(result.item)">
//         {{ result.item.name }}
//       </button>
//     </li>
//   </ul>
    
// </div>
  setup(props) {
    const searchTerm = ref('');
    const searchResults = ref([]);

    const options = ref({
      keys: ['name'],
      threshold: 0.3,
    });

    const data = ref([
      {
          "id": 1, 
          "name": "Murali Dry Cleaners", 
          "service": "Dry Cleaning",
          "open": "Open",
          "closeTime": "6pm",
          "address": "1750 W 18th St, Chicago, IL 60608",
          "phone": "908-666-1234",
          "images": "https://pbs.twimg.com/ext_tw_video_thumb/1446431430926643200/pu/img/WL1YOdxXMvdREoZi.jpg",
          "thumbsUp": 10,
          "totalRatings": 30,
          "lat": 41.8, 
          "long": -87.7,
          "description": "AWESOME DRY CLEANING",
          "friendlyStaff": 12,
          "fairPricing": 2,
          "highProfessional": 4,
          "flexible": 4,
          "clean": 10
          // "reviews": [
          //     {
          //         "review_id": 1,
          //         "description": "Friendly staff",
          //     },
          //     {
          //         "review_id": 2,
          //         "description": "Fair pricing"
          //     }
          // ]
      },
      {
          "id": 5, 
          "name": "Murali Laundromat", 
          "service": "Laundromat",
          "open": "Open",
          "closeTime": "9pm",
          "address": "200 S Wacker St, Chicago, IL 60608",
          "phone": "908-656-1234",
          "thumbsUp": 6,
          "totalRatings": 19,
          "lat": 41.81, 
          "long": -87.75,
          "description": "Discover convenience and cleanliness at its finest with Murali Laundromat! Our modern facility is equipped with the latest washing and drying technology to ensure a thorough clean for your garments. Choose from a variety of machine sizes for any load, and enjoy a bright, welcoming atmosphere. Our user-friendly machines, easy payment options, and attentive staff make laundry day a breeze. Murali Laundromat – where efficiency meets excellence!",
          "friendlyStaff": 12,
          "fairPricing": 2,
          "highProfessional": 4,
          "flexible": 4,
          "clean": 10
      },
      {
          "id": 2, 
          "name": "Nanda Auto Repair Service", 
          "service": "Auto Repair",
          "open": "Open",
          "closeTime": "6:30pm",
          "address": "600 N. Green St, Chicago, IL 60608",
          "phone": "847-666-1234",
          "thumbsUp": 12,
          "totalRatings": 30,
          "lat": 41.8710589, 
          "long": -87.6782527,
          "description": "",
          "friendlyStaff": 12,
          "fairPricing": 2,
          "highProfessional": 4,
          "flexible": 4,
          "clean": 10
      },
      {
          "id": 3, 
          "name": "Ho's Hair Salon", 
          "service": "Hair Salon",
          "open": "Open",
          "closeTime": "7:30pm",
          "address": "809 S. Damen St, Chicago, IL 60608",
          "phone": "123-444-6666",
          "thumbsUp": 3,
          "totalRatings": 5,
          "lat": 41.85, 
          "long": -87.69,
          "description": "",
          "friendlyStaff": 12,
          "fairPricing": 2,
          "highProfessional": 4,
          "flexible": 4,
          "clean": 10
      },
      {
          "id": 4, 
          "name": "Wang's Cakes",  
          "service": "Bakery",
          "open": "Open",
          "closeTime": "4pm",
          "address": "1145 W. Taylor St, Chicago, IL 60608",
          "phone": "6366759695",
          "thumbsUp": 35,
          "totalRatings": 50,
          "lat": 41.89, 
          "long": -87.65,
          "description": "",
          "friendlyStaff": 12,
          "fairPricing": 2,
          "highProfessional": 4,
          "flexible": 4,
          "clean": 10
      }
    ]);

    const fuse = new Fuse(data.value, options.value);

    const performSearch = () => {
      searchResults.value = fuse.search(searchTerm.value);
      console.log("searchTerm", searchTerm.value)
      console.log("searchResult", fuse.search(searchTerm.value))
    };

    const sendToBusiness = (business) => {
      window.location.href = `/business/${encodeURIComponent(JSON.stringify(business))}`;
    }

    const handleClick = (business) => {
      console.log("Clicked on:", business.name);
      if (props.addPinAndZoom) {
        props.addPinAndZoom(business);
      }
    };

    onMounted(() => {
      performSearch();
    });

    return {
      searchTerm,
      searchResults,
      performSearch,
      handleClick,
      sendToBusiness,
    };
  },
});

app.mount('#app')