const fs = require("fs")
const path = require("path")
const {URL} = require("url");
const utils = require("./utils")
const { Transform } = require("stream")
const EventEmitter = require("events")
const crypto = require("crypto")
const os = require("os")


// fs.writeFile("./hello.txt", "This is a new line", (err) => {
//     if(err){
//         console.log(err)
//     }
// })

// fs.appendFileSync("./hello.txt", "\n This is a second line");


// fs.readFile("./hello.txt", "utf-8", (err, data) => {
//     if(err) {
//         console.log(err)
//     } else {
//         console.log(data)
//     }
// })

// fs.unlink("./hello.txt", (err) => {
//     if(err) console.log(err)
// })

const filePath = path.join(__dirname, "hello.html");

// console.log(path.basename(filePath));
// console.log(path.extname(filePath));

const myURL = new URL("http://localhost:3000/home?id=100&category=test");

// console.log(myURL.pathname);
// console.log(myURL.searchParams.get("category"));


// console.log(utils.add(2,2));
// console.log(utils.multiply(3,2));
// console.log(utils.value);


const readStream = fs.createReadStream("./node_buffering_demo.txt")
const writeStream = fs.createWriteStream("./destination.txt")

const upperCaseTransform = new Transform({
    transform(chunk, encoding, callback) {
        const text = chunk.toString();
        const upperCaseText = text.toUpperCase();

        callback(null, upperCaseText)
    }
})



// readStream.pipe(upperCaseTransform).pipe(writeStream);

// fs.readFile("./node_buffering_demo.txt", (err,data) => {
//     if(err) throw err;

//     fs.writeFile("./destination2.txt", data, (err) => {
//         if(err) throw err;
//         console.log("Copied")
//     })
// })


const emitter = new EventEmitter();

emitter.on("login", (username) => {
    console.log(`${username} logged in`)
})

emitter.on("click", (username) => {
    console.log(`${username} clicked`)
})

emitter.emit("click", "Rahul")

const hash = crypto
    .createHash("sha256")
    .update("hello")
    .digest("hex")

const random = crypto.randomBytes(64).toString("hex")
console.log(random)

console.log(os.platform());
console.log(os.arch());
console.log(os.cpus());
