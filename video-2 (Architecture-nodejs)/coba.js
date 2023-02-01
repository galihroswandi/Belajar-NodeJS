// Architecture node js adalah single thread asynchronous


// Gaya synchronous
// const getUserSync = (id) => {
//     const nama = id === 1 ? 'Galih' : 'Roswandi';
//     return { id, nama };
// }

// const userSatu = getUserSync(1);
// console.log(userSatu);

// const userDua = getUserSync(2);
// console.log(userDua);

// const halo = "Hello World";
// console.log('Selesai');


// Gaya asynchronous
const getUser = (id, callback) => {
    const time = id === 1 ? 3000 : 2000;
    setTimeout(() => {
        const nama = id === 1 ? 'Galih' : 'Roswandi';
        callback({ id, nama });
    }, time);
}

const userSatu = getUser(1, (user) => {
    console.log(user);
})

const userDua = getUser(2, (user) => {
    console.log(user);
})

const hallo = 'Hello World';
console.log('Selesai');
