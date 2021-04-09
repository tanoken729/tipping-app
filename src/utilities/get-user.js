import firebase from 'firebase'

const username = [];
const db = firebase.firestore();
db.collection("userData").get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            username.push(doc.data().username)
        });
    });

export default username