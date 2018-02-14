const bug = console.log

// runtime object values
bug.rt = (obj) => console.log(JSON.parse(JSON.stringify(obj)));

export default bug;