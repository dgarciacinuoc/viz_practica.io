/**
 * Slide is the most basic type of data viz unit
 * it displays in the whole board div, it can contain
 * animations and interactions that partially modify the 
 * view
 */
class Slide{
    constructor(html){
        this.html = html || null;
    }
    /**
     *  Display the html
     */
    play(){
        return_board().innerHTML = this.html;
    }
}

/**
 * Creates a div with id 'board' in case it does not already exist
 */
function return_board(){
    if(document.getElementById('board')){
        return document.getElementById('slide_board');
    }else{
        let board = document.createElement('div');
        board.id = 'board';

        document.getElementsByTagName('body')[0].appendChild(board);

        return board;
    }
}