const zeroArray = []
const oneArray = []

let i = 0
const em = input[0].split('')
em.forEach(dr => {
    zeroArray[i] = 0;
    oneArray[i] = 0;
    i+=1;
})

input.forEach(im => {
    const splitWord = im.split('');
    splitWord.forEach((sp, ind) => {
        if (sp == '0'){
            zeroArray[ind] += 1
        } 
        else {
            oneArray[ind] +=1
        }
        if (ind == 11) console.log(sp, ind, zeroArray[ind])
    })
})

let resMax = ""
let resMin = ""
zeroArray.forEach((zp, ind) => {
    if (zp > oneArray[ind]){
        resMax = resMax.concat("0")
        resMin = resMin.concat("1")
    } else{
        resMax = resMax.concat("1")
        resMin = resMin.concat("0")
    }
})
console.log(resMin,resMax)

// 2 -----------------------------------------------------
const oxygenRegenerator = (cycleArray, i) => {
    const zeroBased = []
    const oneBased = []
    cycleArray.forEach(s => {
        const word = s.split('')
        if (word[i] === '0')
            zeroBased.push(s)
        else oneBased.push(s)
    })
    const areMoreZero = zeroBased.length > oneBased.length
    const resultArray = [...(areMoreZero ? zeroBased : oneBased)]
    // CO2 Scrubber alternative:
    // const resultArray = [...(areMoreZero ? oneBased : zeroBased)]
    return resultArray.length > 1 ? 
        oxygenRegenerator(resultArray, i+1) : 
        resultArray
}
oxygenRegenerator(input, 0) 
// oxygen: 001100001101 => 781
// scrubber: 101010101110 => 2734