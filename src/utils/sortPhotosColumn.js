const sortPhotosInColumns = (photos, random = true) => {

    const columns = [[], [], []]
    let c = random ? Math.floor(Math.random() * 3) : 0
    for (let i = 0; i < photos.length; i++) {
        columns[c].push(photos[i])
        c++
        if (c === 3) c = 0
    }
    return columns
}
export default sortPhotosInColumns