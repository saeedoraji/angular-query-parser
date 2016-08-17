module.exports = {
    generateRandomWeighted: weightedArray => {
        var totalWeight = 0, weight = 0, i;
        for (i = 0; i < weightedArray.length; i++) {
            totalWeight += weightedArray[i][1];
        }
        var random = Math.floor(Math.random() * totalWeight);
        for (i = 0; i < weightedArray.length; i++) {
            weight += weightedArray[i][1];
            if (random < weight) {
                return(weightedArray[i]);
            }
        }
    }
}
