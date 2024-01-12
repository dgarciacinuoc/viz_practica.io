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
        return this.viewboox_height - (this.margin_top + this.margin_botton);
    }

    get_x(){
        return this.margin_left;
    }

    get_y(){
        return this.margin_top;
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

        this.r = 10;
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
        return this.get_svg_start_tag() + this.get_html_rects() + this.get_svg_end_tag();
    }

    get_html_rects(){
        let html = '';
        let size = this.get_rect_size(this.get_chart_size())
        for(let i=0; i < this.get_squares(); i++){
            html += this.rect_svg(
                this.get_rect_x(i,size), this.get_rect_y(i, size),
                size, this.get_rect_class(), this.r
                )
        }
        return html;
    }

    get_rect_class(i){
        if( this.is_highlighted(i)){
            return 'highlighted';
        }
        return 'main'
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
 * Defines a node for hierarchical graphs
 */
class TreeMapNode{
    constructor(node, value = 0){
        this.code = node;
        this.value = value;

        this.supernode = null;

        this.x = null;
        this.y = null;
        this.width = null;
        this.height = null;
    }

    get_value(){
        return this.value;
    }

    get_x(){
        return this.x;
    }

    get_y(){
        return this.y;
    }

    get_width(){
        return this.width;
    }

    get_height(){
        return this.height;
    }

    get_area(){
        return this.width * this.height;
    }

    set_value(value){
        this.value = value;
    }

    set_x(x){
        this.x = x;
    }

    set_y(y){
        this.y = y;
    }

    set_width(width){
        this.width = width;
    }

    set_height(height){
        this.height = height;
    }

    set_supernode(supernode){
        this.supernode = supernode;

        this.update_supernode_value();
    }

    update_supernode_value(){
        let supernode = this.supernode;
        while(supernode){
            supernode.set_value(
                supernode.get_value() + this.value
                )
            supernode = supernode.supernode;
        }
    }
}

class TreeMapSuperNode extends TreeMapNode{
    constructor(node, value = 0){
        super(node, value);
        this.list = [];
        this.type = 'portait';
    }
    push(node){
        this.list.push(node);

        node.set_supernode(this);

        this.update_nodes_parameters();
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
        let list = [];
        for(let i = this.list.length - 1; i >= 0; i--){
            list.push(this.list[i]);
        }
        this.list = list;
    }

    reverse_sort(){
        this.sort();
        this.reverse();
    }

    node_proportion(node){
        if(this.value == 0){
            return 1;
        }
        return node.get_value() / this.value;
    }

    set_infranode_width(node){
        let width = this.width;
        if(this.type == 'portait'){
            width *= this.node_proportion(node); 
        }
        node.set_width(width);
    }

    set_infranode_height(node){
        let height = this.height;
        if(this.type == 'landscape'){
            height *= this.node_proportion(node);
        }
        node.set_height(height);
    }

    set_infranode_x(node){
        let x = this.x;
        if(this.type == 'portait'){
            let i = 0;
            while(this.list[i] != node){
    
                x += node.get_width();
                i++;
            }
        }
        node.set_x(x);
    }

    set_infranode_y(node){
        let y = this.y;
        if(this.type == 'landscape'){
            let i = 0;
            while(this.list[i] != node){
                y += node.get_height();
                i++;
            }
        }
        node.set_y(y);
    }

    update_nodes_parameters(){
        this.reverse_sort();

        for(let i = 0; i < this.list.length; i++){
            let node = this.list[i];

            this.set_infranode_width(node);
            this.set_infranode_height(node);

            this.set_infranode_x(node);
            this.set_infranode_y(node);
        }
    }

    set_type(type){
        if(type == 'landscape'){
            this.type = 'landscape';
        }else{
            this.type = 'portait';
        }
        this.update_nodes_parameters();
    }
}

/**
 * 
 */
class TreeMap extends Graph{
    constructor(id){
        super(id);
        this.supernodes = new TreeMapSuperNode('');

        this.set_supernodes_parameter();

    }

    set_supernodes_parameter(){
        this.supernodes.set_width(this.get_width());
        this.supernodes.set_height(this.get_height());

        this.supernodes.set_x(this.get_x());
        this.supernodes.set_y(this.get_y());
    }

    push(node){
        this.supernodes.push(node);
    }

    
}

/***
 *
 */
class IconGraph extends Graph{
    constructor(id, icon, labels, values){
        super(id);
        this.icon = icon;
        this.labels = labels;
        this.values = values;

        this.graph_values = [];
        this.update_graph_values()
    }
    sort(){
        sort_parallel_lists(this.values, this.labels);
    }
    reverse(){
        this.labels.reverse();
        this.values.reverse();
    }
    inverse_sort(){
        this.sort();
        this.reverse();
    }

    update_graph_values(){
        this.inverse_sort();
        if(this.labels.length > 4){
            let others_tag = 'others'
            this.graph_values.push(
                [this.labels[0], this.values[0]]
            )
            this.graph_values.push(
                [this.labels[1], this.values[1]]
            )
            this.graph_values.push(
                [this.labels[2], this.values[2]]
            )
            let others_sum = 0;
            for(let i=3; i < this.values.length; i++){
                others_sum += this.values[i];
            }
            this.graph_values.push(
                [others_tag, others_sum]
            )
        }else{
            for(i=o; i < this.values.length; i++){
                this.graph_values.push(
                    [this.labels[i], this.values[i]]
                )
            }
        }
    }

    draw_html(){

    }
}

class Icon{
    constructor(svg_code){
        this.svg_code = svg_code;

        this.viexbox_width = null;
        this.viewboox_height = null;

        this.obtain_viewbox_values();
    }

    obtain_viewbox_values(){
        const viewBoxIndex = this.svg_code.indexOf('viewBox');

        const viewBoxSubstring = this.svg_code.substring(viewBoxIndex);

        this.viexbox_width = viewBoxSubstring;

        const firstOpenComas = viewBoxSubstring.indexOf('"');
        const firstCloseComas = viewBoxSubstring.indexOf('"', firstOpenComas + 1);

        const viewBoxValuesSubstring = viewBoxSubstring.substring(firstOpenComas + 1, firstCloseComas);



        const values = viewBoxValuesSubstring.split(' ')

        this.viexbox_width = parseFloat(values[2]);
        this.viexbox_height = parseFloat(values[3]);
    }

}

function sort_parallel_lists(list1, list2){
    for (let i = 0; i < list1.length; i++) {
        for (let j = 0; j < list1.length - i - 1; j++) {
          if (list1[j] > list1[j + 1]) {
            const lesser1 = list1[j + 1];
            const lesser2 = list2[j+1];
            list1[j + 1] = list1[j];
            list2[j + 1] = list2[j];
            list1[j] = lesser1;
            list2[j] = lesser2;
          }
        }
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
