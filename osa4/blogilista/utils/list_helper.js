const dummy = (blogs) => {
   return 1
}



const reducer = (acc,obj) => {
    return acc + obj.likes
}

const totalLikes = (blogs) => {
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length == 0) return null
    let {__v, _id, url, ...strippedResult} =  blogs.reduce((prev, current) =>{
        return (prev.likes > current.likes) ?  prev : current
    })
    return strippedResult
}

module.exports = {
    dummy, totalLikes, favoriteBlog
}