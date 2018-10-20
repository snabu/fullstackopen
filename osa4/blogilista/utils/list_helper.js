const dummy = (blogs) => {
   return 1
}



const reducer = (acc,obj) => {
    return acc + obj.likes
}

const totalLikes = (blogs) => {
    return blogs.reduce(reducer, 0)
}

module.exports = {
    dummy, totalLikes
}