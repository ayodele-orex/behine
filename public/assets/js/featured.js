const firebaseConfig = {
    apiKey: "AIzaSyCwB7xGcjjA1PDDPdgciZXvsCNUpN41u40",
    authDomain: "orex-d1c92.firebaseapp.com",
    projectId: "orex-d1c92",
    storageBucket: "orex-d1c92.appspot.com",
    messagingSenderId: "162837378823",
    appId: "1:162837378823:web:0ce2f6540e8828f3e1b7a2"
  };
  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage()

 let allCategory = document.getElementById("allCategory")
 let  flexCont = document.getElementById("flexCont")


 db.collection("post").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        // const docId = doc.id
        const postData = doc.data()
        if (postData && postData.date && postData.date.toDate instanceof Function) {
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
              ];
              
              const timestamp = postData.date.toDate();
              const month = months[timestamp.getMonth()];
              const day = timestamp.getDate();
              const year = timestamp.getFullYear();
              const hours = timestamp.getHours();
              const minutes = timestamp.getMinutes();
              
              
              const ampm = hours >= 12 ? 'PM' : 'AM';
              const formattedHours = hours % 12 || 12; 
           
              const formattedDate = `${day}, ${month}, ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
             
              
      
               
        flexCont.innerHTML += `
        <div class="flex-body">
        <img src=${postData.imageUrl}>
        <div>
        <p class="none"><sup>. </sup>${postData.category}</p>
        <h1 class="none">${postData.title}</h1>
        <p class='bold'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.3335 15C3.3335 14.116 3.68469 13.2681 4.30981 12.643C4.93493 12.0179 5.78277 11.6667 6.66683 11.6667H13.3335C14.2176 11.6667 15.0654 12.0179 15.6905 12.643C16.3156 13.2681 16.6668 14.116 16.6668 15C16.6668 15.442 16.4912 15.866 16.1787 16.1785C15.8661 16.4911 15.4422 16.6667 15.0002 16.6667H5.00016C4.55814 16.6667 4.13421 16.4911 3.82165 16.1785C3.50909 15.866 3.3335 15.442 3.3335 15Z" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
            <path d="M10 8.33334C11.3807 8.33334 12.5 7.21406 12.5 5.83334C12.5 4.45263 11.3807 3.33334 10 3.33334C8.61929 3.33334 7.5 4.45263 7.5 5.83334C7.5 7.21406 8.61929 8.33334 10 8.33334Z" stroke="black" stroke-width="1.5"/>
            </svg>
            <span class="bigger">${postData.name}</span>
            <span> ${formattedDate}  </span>
            </p>
            <button class="read-more-button" data-id="${doc.id}" onclick="showFullDetails(this)">Read More</button>
     </div>
     </div>
        `
    } else {
        console.log("Date field is not valid in the document.");
    }
        
        
    });
});
document.addEventListener("click", function (event) {
    if (event.target.classList.contains("read-more-button")) {
      const docId = event.target.getAttribute("data-id");
      if (docId) {
        showFullDetails(docId);
      }
    }
  });
  
function showFullDetails(docId) {
    document.getElementById("about").style.display = "none";
    document.getElementById("second").style.display = "block";
    const fullDetailsDiv = document.getElementById("fullDetails");
    
    if (docId) {
        docId = String(docId);

        // Retrieve the clicked post's details
        db.collection("post")
            .doc(docId)
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const postData = doc.data();
                    const timestamp = postData.date.toDate();
                    const months = [
                        "January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"
                    ];
                    const month = months[timestamp.getMonth()];
                    const day = timestamp.getDate();
                    const year = timestamp.getFullYear();
                    const hours = timestamp.getHours();
                    const minutes = timestamp.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    const formattedHours = hours % 12 || 12;
                    const formattedDate = `${day}, ${month}, ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;

                    const fullDetailsHTML = `
                        <h2>${postData.title}</h2>
                        <p class='bold'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.3335 15C3.3335 14.116 3.68469 13.2681 4.30981 12.643C4.93493 12.0179 5.78277 11.6667 6.66683 11.6667H13.3335C14.2176 11.6667 15.0654 12.0179 15.6905 12.643C16.3156 13.2681 16.6668 14.116 16.6668 15C16.6668 15.442 16.4912 15.866 16.1787 16.1785C15.8661 16.4911 15.4422 16.6667 15.0002 16.6667H5.00016C4.55814 16.6667 4.13421 16.4911 3.82165 16.1785C3.50909 15.866 3.3335 15.442 3.3335 15Z" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M10 8.33334C11.3807 8.33334 12.5 7.21406 12.5 5.83334C12.5 4.45263 11.3807 3.33334 10 3.33334C8.61929 3.33334 7.5 4.45263 7.5 5.83334C7.5 7.21406 8.61929 8.33334 10 8.33334Z" stroke="black" stroke-width="1.5"/>
                </svg>
                <span class="bigger">${postData.name}</span>
                <span> ${formattedDate}  </span>
                </p>
                       <div> <img src="${postData.imageUrl}" alt="Image"> </div>
                        <p>Category: ${postData.category}</p>
                        
                       <h4> Story </h4>
                        <p> ${postData.story}
                        </p>
                        <!-- Add other fields you want to display -->
                    `;

                    // Display the full details
                    fullDetailsDiv.innerHTML = fullDetailsHTML;
                    fullDetailsDiv.style.display = "block";

                    // Load other posts
                    loadOtherPosts(docId);
                } else {
                    return
                }
            })
            .catch((error) => {
                console.error("Error getting document:", error);
            });
    } else {
        console.log("Invalid document ID");
    }
}

  
function loadOtherPosts(clickedDocId) {
    const otherPostsContainer = document.getElementById("otherPostsContainer");
  
    otherPostsContainer.innerHTML = "";
  
    db.collection("post")
      .where(firebase.firestore.FieldPath.documentId(), "!=", clickedDocId)
      .limit(4) // Limit to four other posts
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const postData = doc.data();
          if (postData && postData.date && postData.date.toDate instanceof Function) {
            const months = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
  
            const timestamp = postData.date.toDate();
            const month = months[timestamp.getMonth()];
            const day = timestamp.getDate();
            const year = timestamp.getFullYear();
            const hours = timestamp.getHours();
            const minutes = timestamp.getMinutes();
  
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
  
            const formattedDate = `${day}, ${month}, ${year} ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  
            const otherPostHTML = `
            <div class="flex-body">
            <img src=${postData.imageUrl}>
            <div>
            <p class="none"><sup>. </sup>${postData.category}</p>
            <h1 class="none">${postData.title}</h1>
            <p class='bold'>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.3335 15C3.3335 14.116 3.68469 13.2681 4.30981 12.643C4.93493 12.0179 5.78277 11.6667 6.66683 11.6667H13.3335C14.2176 11.6667 15.0654 12.0179 15.6905 12.643C16.3156 13.2681 16.6668 14.116 16.6668 15C16.6668 15.442 16.4912 15.866 16.1787 16.1785C15.8661 16.4911 15.4422 16.6667 15.0002 16.6667H5.00016C4.55814 16.6667 4.13421 16.4911 3.82165 16.1785C3.50909 15.866 3.3335 15.442 3.3335 15Z" stroke="black" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M10 8.33334C11.3807 8.33334 12.5 7.21406 12.5 5.83334C12.5 4.45263 11.3807 3.33334 10 3.33334C8.61929 3.33334 7.5 4.45263 7.5 5.83334C7.5 7.21406 8.61929 8.33334 10 8.33334Z" stroke="black" stroke-width="1.5"/>
                </svg>
                <span class="bigger">${postData.name}</span>
                <span> ${formattedDate}  </span>
                </p>
                <button class="read-more-button" data-id="${doc.id}" onclick="showFullDetails(this)">Read More</button>
         </div>
         </div>
            `;
  
            otherPostsContainer.innerHTML += otherPostHTML;
          }
        });
      })
      .catch((error) => {
        console.error("Error loading other posts:", error);
      });
  }
  
  


function blog(){
    window.location.href = "blog.html"
}


  
  