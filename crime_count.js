const crime_per_area = {
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


let crime_per_type = {
        110: 0,
        113: 0,
        121: 0,
        122: 0,
        210: 0,
        220: 0,
        230: 0,
        231: 0,
        235: 0,
        236: 0,
        237: 0,
        250: 0,
        251: 0,
        310: 0,
        320: 0,
        330: 0,
        331: 0,
        341: 0,
        343: 0,
        345: 0,
        347: 0,
        349: 0,
        350: 0,
        351: 0,
        352: 0,
        353: 0,
        354: 0,
        420: 0,
        421: 0, 
        410: 0,
        432: 0,
        433: 0,
        434: 0,
        435: 0,
        436: 0,
        437: 0,
        438: 0,
        439: 0,
        440: 0,
        441: 0,
        442: 0,
        444: 0,
        445: 0,
        450: 0,
        446: 0,
        451: 0,
        452: 0,
        443: 0,
        470: 0,
        471: 0,
        473: 0,
        474: 0,
        475: 0,
        480: 0,
        481: 0,
        487: 0,
        510: 0,
        520: 0,
        522: 0,
        622: 0,
        623: 0,
        624: 0,
        625: 0,
        626: 0,
        627: 0,
        647: 0,
        648: 0,
        649: 0,
        651: 0,
        652: 0,
        653: 0,
        654: 0,
        660: 0,
        661: 0,
        662: 0,
        664: 0,
        666: 0,
        668: 0,
        670: 0,
        740: 0,
        745: 0,
        753: 0,
        755: 0,
        756: 0,
        760: 0,
        762: 0,
        761: 0,
        763: 0,
        805: 0,
        806: 0,
        810: 0,
        812: 0,
        813: 0,
        814: 0,
        815: 0,
        820: 0,
        821: 0,
        822: 0,
        840: 0,
        845: 0,
        850: 0,
        860: 0,
        865: 0,
        870: 0,
        880: 0,
        882: 0,
        884: 0,
        886: 0,
        888: 0,
        890: 0,
        900: 0,
        901: 0,
        902: 0,
        903: 0,
        904: 0,
        906: 0,
        910: 0,
        920: 0,
        921: 0,
        922: 0,
        924: 0,
        928: 0,
        930: 0,
        931: 0,
        932: 0,
        933: 0,
        940: 0,
        942: 0,
        943: 0,
        944: 0,
        946: 0,
        948: 0,
        949: 0,
        950: 0,
        951: 0,
        954: 0,
        956: 0
}

let crime_types_tree = new TreeMap('type_tree');

let burglary_super_node = new TreeMapSuperNode(0);
crime_types_tree.push(burglary_super_node);
let robbery_super_node = new TreeMapSuperNode(1);
crime_types_tree.push(robbery_super_node);
let assault_supper_node = new TreeMapSuperNode(2);
crime_types_tree.push(assault_supper_node);
let sex_child_supper_node = new TreeMapSuperNode(3);
crime_types_tree.push(sex_child_supper_node);
let sex_super_node = new TreeMapSuperNode(4);
crime_types_tree.push(sex_super_node);
let vandalism_super_node = new TreeMapSuperNode(5);
crime_types_tree.push(vandalism_super_node);
let homicide_super_node = new TreeMapSuperNode(6);
crime_types_tree.push(homicide_super_node);
let other_type_super_node = new TreeMapSuperNode(7);
crime_types_tree.push(other_type_super_node);

for(let i = 0; i < getObjectKeys(crime_per_type).length; i ++){
    const code = getObjectKeys(crime_per_type)[i]; 
    crime_per_type[code] = new TreeMapNode(code);
    switch(crime_name_assigned_code[code][0]){
        case 0:
            burglary_super_node.push(crime_per_type[code]);
            break;
        case 1:
            robbery_super_node.push(crime_per_type[code]);
            break;
        case 2:
            assault_supper_node.push(crime_per_type[code]);
            break;
        case 3:
            sex_child_supper_node.push(crime_per_type[code]);
            break;
        case 4:
            sex_super_node.push(crime_per_type[code]);
            break;
        case 5: 
            vandalism_super_node.push(crime_per_type[code]);
            break;
        case 6:
            homicide_super_node.push(crime_per_type[code]);
            break;
        default:
            other_type_super_node.push(crime_per_type[code]);
            break;

    }
}

const crime_per_descendent = {
    'A': 0,
    'B': 0,
    'C': 0,
    'D': 0,
    'F': 0,
    'G': 0,
    'H': 0,
    'I': 0,
    'J': 0,
    'K': 0,
    'L': 0,
    'O': 0,
    'P': 0,
    'S': 0,
    'U': 0,
    'V': 0,
    'W': 0,
    'U': 0,
    'X': 0,
    'Z': 0,
    'undefined' : 0
}

let descendent_lables = getObjectKeys(crime_per_descendent);



const crime_per_sex = {
    'F': 0,
    'M': 0,
    'X': 0
}

function count_crimes_area(){
    let count = crime_per_area;
    clear_count_area()
    for(let i=0; i < json.length; i++){
        count[parseInt(json[i][0])]++; 
    }
    return count;
}

function clear_count_area(){
    for(let i = 0; i < getObjectKeys(crime_per_area).length; i ++){
        crime_per_area[getObjectKeys(crime_per_area)[i]] = 0;
    }
}

let count = 0;

function count_crimes_type(){
    clear_type_count()

    for(let i=0; i < json.length; i++){
        crime_per_type[parseInt(json[i][1])].increase(); 
        count++;
    }
}

function clear_type_count(){
    count = 0;
    for(let i = 0; i < getObjectKeys(crime_per_type).length; i ++){
        crime_per_type[getObjectKeys(crime_per_type)[i]].set_value(0);
    }
}

function count_type_per_area(area){
    clear_type_count();

    for(let i=0; i < json.length; i++){
        if(json[i][0] == area){
            crime_per_type[parseInt(json[i][1])].increase(); 
            count++;
        }
    }
}

function draw_tree_map_area(area){
    count_type_per_area(area);

    tree_map_crime_slide.upload();

    document.getElementById(crime_types_tree.get_div_id()).innerHTML = crime_types_tree.get_html();
}

function count_descendant(){
    let count = crime_per_descendent;

    clear_descendant_count()
    for(let i=0; i < json.length; i++){
        count[json[i][5]]++; 
    }
    return count;
}

function clear_descendant_count(){
    for(let i = 0; i < getObjectKeys(crime_per_descendent).length; i ++){
        crime_per_descendent[getObjectKeys(crime_per_descendent)[i]] = 0;
    }
}

function view_victims(){
    icon_graph.values = getObjectValues(count_descendant())


    icon_graph.inverse_sort();

    document.getElementById('board').innerHTML = icon_graph.draw_html();
}

function count_descendant_per_crime(crime){
    let count = crime_per_descendent;

    clear_descendant_count()

    if(crime == 99){
        for(let i=0; i < json.length; i++){
            count[json[i][5]]++;
        }
 
    }else{
        for(let i=0; i < json.length; i++){
            if(crime_name_assigned_code[json[i][1]][0] == crime){
                count[json[i][5]]++; 
            }
    
        }
    }


    icon_graph.values = getObjectValues(count);
    icon_graph.labels = getObjectKeys(crime_per_descendent);


    icon_graph.inverse_sort();


    document.getElementById('board').innerHTML = icon_graph.draw_html();
}

let waffle = new WaffleChart('females', 0, 0);

function by_sex(){
    let males = 0;
    let females = 0;
    for(let i=0; i < json.length; i++){
        if(json[i][6] == 'M'){
            males ++;
        }
        if(json[i][6] == 'F'){
            females ++;
        }
    }
    waffle.cases = females;
    waffle.totalAmount = females + males;
    document.getElementById('board').innerHTML = waffle.get_html();
}


function by_sex_crime(crime){
    let males = 0;
    let females = 0;
    if(crime == 99){
        for(let i=0; i < json.length; i++){
            if(json[i][6] == 'M'){
                males ++;
            }
            if(json[i][6] == 'F'){
                females ++;
            }
        } 
    }else{
        for(let i=0; i < json.length; i++){
            if(json[i][6] == 'M' && crime_name_assigned_code[json[i][1]][0] == crime){
                males ++;
            }
            if(json[i][6] == 'F'&& crime_name_assigned_code[json[i][1]][0] == crime){
                females ++;
            }
        }
    }
    waffle.cases = females;
    waffle.totalAmount = females + males;
    document.getElementById('board').innerHTML = waffle.get_html();
}