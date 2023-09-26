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


let grid = document.getElementById("grid")
let gridCheck = document.getElementById("grideCheck")
let profileImage = document.getElementById("profileImage")
let openFileInput = document.getElementById("openFileInput")
let fileInput = document.getElementById("fileInput")
const blogForm = document.getElementById("blogForm");
fileInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
});
 openFileInput.addEventListener ("click", () => {
  fileInput.click();
})

function generateRandomId() {
  return Date.now().toString();
}



 function submit (event) {
  event.preventDefault();
  const file = fileInput.files[0];
 if (file) {
    const postId = generateRandomId(); // Generate a random ID for the post

    
    const storageRef = storage.ref(`profile-images/${postId}_profile.jpg`);
    const uploadTask = storageRef.put(file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => {
        alert("Error uploading image:", error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const isAnonymousSelect = document.getElementById("anonymous");
          const selectedOption = isAnonymousSelect.options[isAnonymousSelect.selectedIndex].value;
          const isAnonymous = selectedOption === "Yes" ? true : false;
          const fullName = isAnonymous ? "Anonymous" : document.getElementById("fullName").value;
          const title = document.getElementById("title").value;
          const story = document.getElementById("story").value;
          const addition = document.getElementById("addition").value
         const email = document.getElementById("email").value
         const category = document.getElementById("category").value
         const currentDate = new Date();
         const timestamp = firebase.firestore.Timestamp.fromDate(currentDate);
         
         // Save the blog post data to Firestore with the same postId
          db.collection("post")
            .doc(postId)
            .set({
              name: fullName,
              anonymous: isAnonymous,
              title: title,
              story: story,
              addition:addition,
              email:email,
              imageUrl: downloadURL, 
              category:category,
              date: timestamp,
            })
            .then(() => {
              // Clear form inputs afer saving the blogs
              document.getElementById("fullName").value = "";
              document.getElementById("title").value = "";
              document.getElementById("story").value = "";
              document.getElementById("fileInput").value = "";
              document.getElementById("anonymous").selectedIndex = 0; // Reset the select to its default value
              document.getElementById("category").selectedIndex = 0; // Reset the select to its default value
              profileImage.src = "https://media.istockphoto.com/id/1419342910/vector/drag-and-drop-to-upload-file-concept-vector-icon-in-line-style-design-isolated-on-white.jpg?s=612x612&w=0&k=20&c=55m-Ozi4o97lc-7hjK3C8XogB_F6eDoWtPPgx-zegUc="
             
              alert("Blog post submitted successfully.");

              // Orex i don't Know id it's useful but i'm linking them to featured stories after submit if not needed then just clear it
              window.location.href = "featured.html"
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        });
      }
    );
  }
}


blogForm.addEventListener("submit", submit);





