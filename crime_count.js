let crime_per_area = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0
}

function count_crimes_area(){
    let count = crime_per_area;
    for(let i=0; i < json.length; i++){
        count[parseInt(json[i][0])]++; 
    }
    return count;
}