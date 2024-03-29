let crime_types = {
    0: 'BURGLARY',
    1: 'THEFT & FRAUD',
    2: 'ASSAULT',
    3: 'SEX CRIME ON CHILDS',
    4: 'SEX CRIME',
    5: 'VANDALISM OR DISTURBING THE PEACE',
    6: 'HOMICIDE',
    7: 'OTHERS'
}

let crime_name_assigned_code = {
    110: [6, 'CRIMINAL HOMICIDE'],
    113: [6, 'MANSLAUGHTER, NEGLIGENT'],
    121: [4, 'RAPE, FORCIBLE'],
    122: [4, 'RAPE, ATTEMPTED'],
    210: [1, 'ROBBERY'],
    220: [1, 'ATTEMPTED ROBBERY'],
    230: [2, 'ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT'],
    231: [2, 'ASSAULT WITH DEADLY WEAPON ON POLICE OFFICER'],
    235: [2, 'CHILD ABUSE (PHYSICAL) - AGGRAVATED ASSAULT'],
    236: [2, 'INTIMATE PARTNER - AGGRAVATED ASSAULT'],
    237: [7, 'CHILD NEGLECT (SEE 300 W.I.C.)'],
    250: [2, 'SHOTS FIRED AT MOVING VEHICLE, TRAIN OR AIRCRAFT'],
    251: [2, 'SHOTS FIRED AT INHABITED DWELLING'],
    310: [0, 'BURGLARY'],
    320: [0, 'BURGLARY, ATTEMPTED'],
    330: [0, 'BURGLARY FROM VEHICLE'],
    331: [1, 'THEFT FROM MOTOR VEHICLE - GRAND ($950.01 AND OVER)'],
    341: [1, 'THEFT-GRAND ($950.01 & OVER)EXCPT,GUNS,FOWL,LIVESTK,PROD'],
    343: [1, 'SHOPLIFTING-GRAND THEFT ($950.01 & OVER)'],
    345: [1, 'DISHONEST EMPLOYEE - GRAND THEFT'],
    347: [1, 'GRAND THEFT / INSURANCE FRAUD'],
    349: [1, 'GRAND THEFT / AUTO REPAIR'],
    350: [1, 'THEFT, PERSON'],
    351: [1, 'PURSE SNATCHING'],
    352: [1, 'PICKPOCKET'],
    353: [1, 'DRUNK ROLL'],
    354: [1, 'THEFT OF IDENTITY'],
    420: [1, 'THEFT FROM MOTOR VEHICLE - PETTY ($950 & UNDER)'],
    421: [1, 'THEFT FROM MOTOR VEHICLE - ATTEMPT'], 
    410: [0, 'BURGLARY FROM VEHICLE, ATTEMPTED'],
    432: [5, 'BLOCKING DOOR INDUCTION CENTER'],
    433: [1 ,'DRIVING WITHOUT OWNER CONSENT (DWOC)'],
    434: [2, 'FALSE IMPRISONMENT'],
    435: [2, 'LYNCHING'],
    436: [2, 'LYNCHING - ATTEMPTED'],
    437: [7, 'RESISTING ARREST'],
    438: [5, 'RECKLESS DRIVING'],
    439: [1, 'FALSE POLICE REPORT'],
    440: [1, 'THEFT PLAIN - PETTY ($950 & UNDER'],
    441: [1,'THEFT PLAIN - ATTEMPT'],
    442: [1, 'SHOPLIFTING - PETTY THEFT ($950 & UNDER'],
    444: [1, 'DISHONEST EMPLOYEE - PETTY THEFT'],
    445: [1, 'DISHONEST EMPLOYEE ATTEMPTED THEFT'],
    450: [1, 'THEFT FROM PERSON - ATTEMPT'],
    446: [1, 'PETTY THEFT - AUTO REPAIR'],
    451: [1, 'PURSE SNATCHING - ATTEMPT'],
    452: [1, 'PICKPOCKET, ATTEMPT'],
    443: [1, 'SHOPLIFTING - ATTEMPT'],
    470: [1, 'TILL TAP - GRAND THEFT ($950.01 & OVER)'],
    471: [1, 'TILL TAP - PETTY ($950 & UNDER)'],
    473: [1, 'THEFT, COIN MACHINE - GRAND ($950.01 & OVER)'],
    474: [1, 'THEFT, COIN MACHINE - PETTY ($950 & UNDER)'],
    475: [1, 'THEFT, COIN MACHINE - ATTEMPT'],
    480: [1, 'BIKE - STOLEN'],
    481: [1, 'BIKE - ATTEMPTED STOLEN'],
    487: [1, 'BOAT - STOLEN'],
    510: [1, 'VEHICLE - STOLEN'],
    520: [1, 'VEHICLE - ATTEMPT STOLEN'],
    522: [1, 'VEHICLE, STOLEN - OTHER (MOTORIZED SCOOTERS, BIKES, ETC)'],
    622: [2, 'BATTERY ON A FIREFIGHTER'],
    623: [2, 'BATTERY POLICE (SIMPLE)'],
    624: [2, 'BATTERY - SIMPLE ASSAULT'],
    625: [2, 'OTHER ASSAULT'],
    626: [2, 'INTIMATE PARTNER - SIMPLE ASSAULT'],
    627: [2, 'CHILD ABUSE (PHYSICAL) - SIMPLE ASSAULT'],
    647: [7, 'THROWING OBJECT AT MOVING VEHICLE'],
    648: [5, 'ARSON'],
    649: [1, 'DOCUMENT FORGERY / STOLEN FELONY'],
    651: [1, 'DOCUMENT WORTHLESS ($200.01 & OVER)'],
    652: [1, 'DOCUMENT WORTHLESS ($200 & UNDER)'],
    653: [1, 'CREDIT CARDS, FRAUD USE ($950.01 & OVER)'],
    654: [1, 'CREDIT CARDS, FRAUD USE ($950 & UNDER'],
    660: [1, 'COUNTERFEIT'],
    661: [7, 'UNAUTHORIZED COMPUTER ACCESS'],
    662: [1, 'BUNCO, GRAND THEFT'],
    664: [1, 'BUNCO, PETTY THEFT'],
    666: [1, 'BUNCO, ATTEMPT'],
    668: [1, 'EMBEZZLEMENT, GRAND THEFT ($950.01 & OVER)'],
    670: [1, 'EMBEZZLEMENT, PETTY THEFT ($950 & UNDER)'],
    740: [5, 'VANDALISM - FELONY ($400 & OVER, ALL CHURCH VANDALISMS'],
    745: [5, 'VANDALISM - MISDEAMEANOR ($399 OR UNDER)'],
    753: [7, 'DISCHARGE FIREARMS/SHOTS FIRED'],
    755: [5, 'BOMB SCARE'],
    756: [5 ,'WEAPONS POSSESSION/BOMBING'],
    760: [3, 'LEWD/LASCIVIOUS ACTS WITH CHILD'],
    762: [4, 'LEWD CONDUCT'],
    761: [7, 'BRANDISH WEAPON'],
    763: [7, 'STALKING'],
    805: [4, 'PIMPING'],
    806: [7, 'PANDERING'],
    810: [4, 'SEX,UNLAWFUL(INC MUTUAL CONSENT, PENETRATION W/ FRGN OBJ'],
    812: [7, 'CRM AGNST CHLD (13 OR UNDER) (14-15 & SUSP 10 YRS OLDER)'],
    813: [7, 'CHILD ANNOYING (17YRS & UNDER)'],
    814: [4, 'CHILD PORNOGRAPHY'],
    815: [4, 'SEXUAL PENETRATION W/FOREIGN OBJECT'],
    820: [4, 'ORAL COPULATION'],
    821: [4, 'SODOMY/SEXUAL CONTACT B/W PENIS OF ONE PERS TO ANUS OTH'],
    822: [4, 'HUMAN TRAFFICKING - COMMERCIAL SEX ACTS'],
    840: [4, 'BEASTIALITY, CRIME AGAINST NATURE SEXUAL ASSLT WITH ANIM'],
    845: [4, 'SEX OFFENDER REGISTRANT OUT OF COMPLIANCE'],
    850: [4, 'INDECENT EXPOSURE'],
    860: [4, 'BATTERY WITH SEXUAL CONTACT'],
    865: [7, 'DRUGS, TO A MINOR'],
    870: [7 ,'CHILD ABANDONMENT'],
    880: [5, 'DISRUPT SCHOOL'],
    882: [5, 'INCITING A RIOT'],
    884: [5, 'FAILURE TO DISPERSE'],
    886: [5, 'DISTURBING THE PEACE'],
    888: [0, 'TRESPASSING'],
    890: [7, 'FAILURE TO YIELD'],
    900: [7, 'VIOLATION OF COURT ORDER'],
    901: [7, 'VIOLATION OF RESTRAINING ORDER'],
    902: [7, 'VIOLATION OF TEMPORARY RESTRAINING ORDER'],
    903: [7, 'CONTEMPT OF COURT'],
    904: [7, 'FIREARMS EMERGENCY PROTECTIVE ORDER (FIREARMS EPO)'],
    906: [7, 'FIREARMS RESTRAINING ORDER (FIREARMS RO)'],
    910: [2, 'KIDNAPPING'],
    920: [2, 'KIDNAPPING - GRAND ATTEMPT'],
    921: [2, 'HUMAN TRAFFICKING - INVOLUNTARY SERVITUDE'],
    922: [2, 'CHILD STEALING'],
    924: [5, 'TELEPHONE PROPERTY - DAMAGE'],
    928: [7, 'THREATENING PHONE CALLS/LETTERS'],
    930: [7, 'CRIMINAL THREATS - NO WEAPON DISPLAYED'],
    931: [7, 'REPLICA FIREARMS(SALE,DISPLAY,MANUFACTURE OR DISTRIBUTE)'],
    932: [4, 'PEEPING TOM'],
    933: [7, 'PROWLER'],
    940: [7, 'EXTORTION'],
    942: [7, 'BRIBERY'],
    943: [7, 'CRUELTY TO ANIMALS'],
    944: [7, 'CONSPIRACY'],
    946: [7, 'OTHER MISCELLANEOUS CRIME'],
    948: [7, 'BIGAMY'],
    949: [5, 'ILLEGAL DUMPING'],
    950: [1, 'DEFRAUDING INNKEEPER/THEFT OF SERVICES, OVER $950.01'],
    951: [1, 'DEFRAUDING INNKEEPER/THEFT OF SERVICES, $950 & UNDER'],
    954: [7, 'CONTRIBUTING'],
    956: [4, 'LETTERS, LEWD  -  TELEPHONE CALLS, LEWD']
}

let descendent_dic = {
    'A': 'Asian',
    'B': 'Black',
    'C': 'Chinese',
    'D': 'Camb.',
    'F': 'Filipino',
    'G': 'Guam.',
    'H': 'Latin',
    'I': 'Native',
    'J': 'Japanese',
    'K': 'Korean',
    'L': 'Laotian',
    'O': 'Other',
    'P': 'Pacific',
    'S': 'Samoan',
    'U': 'Hawaiian',
    'V': 'Viet.',
    'W': 'White',
    'U': 'Unknown',
    'X': 'Unknown',
    'Z': 'Indian',
    'undefined' : 'undefined'
}

let sex_dic = {
    'F': 'Female',
    'M': 'Male',
    'X': 'Unknown'
}


let weapon_type_dic = {
    0: 'firearm or simulated',
    1: 'white weapon',
    2: 'strong arm',
    3: 'verbal or physical threat',
    4: 'OBJECT',
    5: 'other'
}


let weapon_code_dic = {
    101: [0, 'REVOLVER'],
    102: [0, 'HAND GUN'],
    103: [0, 'RIFLE'],
    104: [0, 'SHOTGUN'],
    105: [0, 'SAWED OFF RIFLE/SHOTGUN'],
    106: [0, 'UNKNOWN FIREARM'],
    107: [0, 'OTHER FIREARM'],
    108: [0, 'AUTOMATIC WEAPON/SUB-MACHINE GUN'],
    109: [0, 'SEMI-AUTOMATIC PISTOL'],
    110: [0, 'SEMI-AUTOMATIC RIFLE'],
    111: [0, 'STARTER PISTOL/REVOLVER'],
    112: [0, 'TOY GUN'],
    113: [0, 'SIMULATED GUN'],
    114: [0, 'AIR PISTOL/REVOLVER/RIFLE/BB GUN'],
    115: [0, 'ASSAULT WEAPON/UZI/AK47/ETC'],
    116: [0, 'ANTIQUE FIREARM'],
    117: [0, 'UNK TYPE SEMIAUTOMATIC ASSAULT RIFLE'],
    118: [0, 'UZI SEMIAUTOMATIC ASSAULT RIFLE'],
    119: [0, 'MAC-10 SEMIAUTOMATIC ASSAULT WEAPON'],
    122: [0, 'HECKLER & KOCH 93 SEMIAUTOMATIC ASSAULT RIFLE'],
    125: [0, 'RELIC FIREARM'],
    200: [1, 'KNIFE WITH BLADE 6INCHES OR LESS'],
    201: [1, 'KNIFE WITH BLADE OVER 6 INCHES IN LENGTH'],
    202: [1, 'BOWIE KNIFE'],
    203: [1, 'DIRK/DAGGER'],
    204: [1, 'FOLDING KNIFE'],
    205: [1, 'KITCHEN KNIFE'],
    206: [1, 'SWITCH BLADE'],
    207: [1, 'OTHER KNIFE'],
    208: [1, 'RAZOR'],
    209: [1, 'STRAIGHT RAZOR'],
    210: [1, 'RAZOR BLADE'],
    211: [1, 'AXE'],
    212: [4, 'BOTTLE'],
    213: [1, 'CLEAVER'],
    214: [4, 'ICE PICK'],
    215: [1, 'MACHETE'],
    216: [4, 'SCISSORS'],
    217: [1, 'SWORD'],
    218: [4, 'OTHER CUTTING INSTRUMENT'],
    219: [4, 'SCREWDRIVER'],
    220: [4, 'SYRINGE'],
    221: [4, 'GLASS'],
    223: [4, 'UNKNOWN TYPE CUTTING INSTRUMENT'],
    300: [1, 'BLACKJACK'],
    301: [4, 'BELT FLAILING INSTRUMENT/CHAIN'],
    302: [4, 'BLUNT INSTRUMENT'],
    303: [1, 'BRASS KNUCKLES'],
    304: [4, 'CLUB/BAT'],
    305: [4, 'FIXED OBJECT'],
    306: [4, 'ROCK/THROWN OBJECT'],
    307: [5, 'VEHICLE'],
    308: [4, 'STICK'],
    309: [4, 'BOARD'],
    310: [4, 'CONCRETE BLOCK/BRICK'],
    311: [4, 'HAMMER'],
    312: [4, 'PIPE/METAL PIPE'],
    400: [2, 'STRONG-ARM (HANDS, FIST, FEET OR BODILY FORCE)'],
    500: [5, 'UNKNOWN WEAPON/OTHER WEAPON'],
    501: [5, 'BOMB THREAT'],
    502: [1, 'BOW AND ARROW'],
    503: [5, 'CAUSTIC CHEMICAL/POISON'],
    504: [3, 'DEMAND NOTE'],
    505: [5, 'EXPLOXIVE DEVICE'],
    506: [5, 'FIRE'],
    507: [5, 'LIQUOR/DRUGS'],
    508: [1, 'MARTIAL ARTS WEAPONS'],
    509: [4, 'ROPE/LIGATURE'],
    510: [5, 'SCALDING LIQUID'],
    511: [3, 'VERBAL THREAT'],
    512: [5, 'MACE/PEPPER SPRAY'],
    513: [5, 'STUN GUN'],
    514: [5, 'TIRE IRON'],
    515: [3, 'PHYSICAL PRESENCE'],
    516: [5, 'DOG/ANIMAL (SIC ANIMAL ON)']

}

let area_dic = {
    1: "CENTRAL AREA",
    2: "RAMPART AREA",
    3: "SOUTHWEST AREA",
    4: "HOLLEBECK AREA",
    5: "HARBOR AREA",
    6: "HOLLYWOOD AREA",
    7: "WILSHIRE AREA",
    8: "WEST LOS ANGELES AREA",
    9: "VAN NUYS AREA",
    10: "WEST VALLEY AREA",
    11: "NORTHEAST AREA",
    12: "77TH ST AREA",
    13: "NEWTON AREA",
    14: "PACIFIC AREA",
    15: "NORTH HOLLYWOOD AREA",
    16: "FOOTHILL AREA",
    17: "DEVONSHIRE AREA",
    18: "SOUTHEAST AREA",
    19: "MISSION AREA",
    20: "OLYMPIC AREA",
    21: "TOPANGA AREA"
}