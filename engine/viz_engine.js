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
 * Graph is any kind of data vizualization
 */
class Graph{
    constructor(id){
        this.id = id;

        this.margin_top = 200;
        this.margin_botton = 20;
        this.margin_right = 20;
        this.margin_left = 20;

        this.viewboox_width = 800;
        this.viewboox_height = 800;

    }
    /**
     * 
     * @returns id tag that will have the svg in html
     */
    get_div_id(){
        return this.id + '_graph';
    }

    /**
     * 
     * @returns viewbox attribute of start svg tag
     */
    get_view_box(){
        return 'viewBox="0 0 ' + this.viewboox_width + ' ' + this.viewboox_height +'"';
    }

    /** 
     * @param {int} width  widht of viewbox
     * @param {int} height height of viewbox
     * @returns the initial start tag of the svg graph
     */
    get_svg_start_tag(){
        return '<svg id="' + this.get_div_id() + '" xmlns="http://www.w3.org/2000/svg" ' + this.get_view_box() + '>';
    }

    /**
     * 
     * @returns end tad of a svg
     */
    get_svg_end_tag(){
        let end_tag = '</svg>'
        return end_tag;
    }

    /**
     *  @returns svg width
     */
    get_width(){
        return this.viewboox_width - (this.margin_left + this.margin_right);
    }
    /**
     *  @returns svg height
     */
    get_height(){
        return this.viewboox_height - (this.margin_top + this.margin_left);
    }
    /**
     *  @returns svg area
     */
    get_area(){
        return this.get_width() * this.get_height();
    }

    /**
     * 
     * @param {int} x 
     * @param {int} y
     * @param {int} r
     * @param {number} size 
     * @param {string} css_class
     * 
     * @returns string with svg to draw a rect for waffle 
     */
        rect_svg(x, y, size, css_class, r=0){
            return '<rect class="' + css_class + '" x="' + x + '" y="' + y +'" width="' + size +'" height="' + size +'" rx="1" ry="1" />'
        }


}

/***
 * Wafle graph creates a waffle graph, taking into account
 * a total amount, and the number of cases
 */
class WaffleChart extends Graph{
    constructor(id, cases, totalAmount, rows, title, legend1, legend2)
    {
        super(id);
        this.cases = cases;
        this.totalAmount = totalAmount;
        this.rows = rows || 10; // rows and columns of the waffle chart, 
        //it will allways be squared

        this.title = title || null;
        this.legend1 = legend1 || null;
        this.legend2 = legend2 || null;

        this.margin_top = 200;
        this.margin_botton = 20;
        this.margin_right = 20;
        this.margin_left = 100;

        this.rects_margin = 2;
    }
    /**
     * @returns total squares of the chart
     */
    get_squares(){
        return this.rows ** 2;
    }

    /**
     * @returns total amount of highlighted squares
     */
    get_highlighted_squares(){
       return Math.round( this.cases * this.get_squares() / this.totalAmount);
    }

 
    get_html(viewboox_width = 800, viewboox_height=800){
        let html = this.get_svg_start_tag();

        let size = this.get_rect_size(this.get_chart_size())

        for(let i=0; i < this.get_squares(); i++){
            let class_style = 'main';
            if( this.is_highlighted(i)){
                class_style = 'highlighted';
            }
            html += this.rect_svg(
                this.get_rect_x(i,size), this.get_rect_y(i, size),
                size, class_style, r = 10
            )
        }
        return html + this.get_svg_end_tag();
    }

    /**
     * 
     * 
     * @returns size that must have the chart to center it
     */
    get_chart_size(){
        if(this.get_width() >= this.get_height()){
            return this.get_height();
        }
        return this.get_width();
    }

    /**
     * 
     * @param {number} chart_size 
     * @returns rects size of the waffle chart
     */
    get_rect_size(chart_size){
        return (chart_size - (this.rows - 1) * this.rects_margin) / this.rows;
    }

    /**
     * 
     * @param {number} size rect size
     * @param {int} i rect position in the waffle chart
     * @returns x of rect svg of a waffle
     */
    get_rect_x(i, size){
        if(i % this.rows == 0){
            return this.margin_left;
        } else {
            return this.margin_right + (i % this.rows) * size + this.rects_margin;
        }
    }
    
    /**
     * 
     * @param {number} size rect size
     * @param {int} i rect position in the waffle chart
     * @returns y of rect svg of a waffle
     */
    get_rect_y(i, size){
        if(Math.floor(i / this.rows) == 0){
            return this.margin_top;
        } else {
            return parseFloat(this.margin_top + Math.floor(i / this.rows) * size + this.rects_margin);
        }
    }

    /**
     * 
     * @param {int} i element in the waffle chart
     * @return boolean whether it must or not be highlighted
     */
    is_highlighted(i){
        if( i <= this.get_highlighted_squares()){return true};
        return false;
    }
}

/***
 * Defines a unit formed by a key and a value
 */
class KeyValue{
    constructor(key, value){
        this.key = key;
        this.value = value;
        this.are = null;
    }
}

class KeyValueArray{
    constructor(){
        this.list = []
    }
    push(keyvalue){
        this.list.push(keyvalue);
    }
    sort(){
        for (let i = 0; i < this.list.length; i++) {
            for (let j = 0; j < this.list.length - i - 1; j++) {
              if (this.list[j].value > this.list[j + 1].value) {
                const lesser = this.list[j + 1];
                this.list[j + 1] = this.list[j];
                this.list[j] = lesser;
              }
            }
        }
    }

    reverse(){
        let list_ = [];
        for(let i = this.list.length - 1; i <= 0; i--){
            list_.push(this.list[i]);
        }
        this.list = list_;
    }

    reverse_sort(){
        this.sort();
        this.reverse();
    }

    /**
     * 
     * @returns the total sum of values
     */
    get_sum(){
        let sum = 0;
        for(let i=0; i < this.values.length; i++){
            sum += parseInt(this.list[i].value);
        }
        return sum;
    }
}

/**
 * 
 */
class TreeMap extends Graph{
    constructor(id, keyvaluearray){
        super(id);
        this.list = keyvaluearray;

        this.update_areas();
    }

    /**
     * 
     * @returns an array with the area must have each item
     */
    update_areas(){
        for(let i=0; i < this.list.length; i++){
            this.list[i].area = this.list[i].value * this.get_area() / this.list.get_sum();
        }
    }

    get_html(){
        this.list.reverse_sort();
        let big_area1 = this.get_areas()[0];
        let big_area2 = this.get_areas()[1] + his.get_areas()[2];
        let big_area3 = this.get_area() - (big_area1 + big_area2);
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
