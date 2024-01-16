/**
 * Slide is the most basic type of data viz unit
 * it displays in the whole board div, it can contain
 * animations and interactions that partially modify the 
 * view
 */
class Slide{
    constructor(html, div_id){
        this.html = html;
        this.div_id = div_id;
    }
    /**
     *  Display the html
     */
    upload(){
        return_board().innerHTML = this.html;
        this.update_style();
    }
    update_style(){
        document.getElementById(this.div_id).style.position = 'fixed';
        document.getElementById(this.div_id).style.marginLeft = 'auto';

    }
    play(){
        document.getElementById(this.div_id).style.marginTop = 'auto';
    }
    remove(){
        document.getElementById(this.div_id).style.marginTop = '1000%';
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

    set_view_box_width(width){
        this.viewboox_width = width;
    }

    set_view_box_height(height){
        this.viewboox_height = height;
    }

    /** 
     * @param {int} width  widht of viewbox
     * @param {int} height height of viewbox
     * @returns the initial start tag of the svg graph
     */
    get_svg_start_tag(){
        return '<svg id="' + this.get_div_id() + '" width="100%" height="95%" xmlns="http://www.w3.org/2000/svg" ' + this.get_view_box() + '>';
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
    rect_svg(x, y, width, height, css_class, r=0){
        return '<rect class="' + css_class + '" x="' + x + '" y="' + y +'" width="' + width +'" height="' + height +'" rx="'+r+'" ry="'+r+'" />'
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
                size, size, this.get_rect_class(), this.r
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

    increase(){
        this.value++;
        if(this.supernode){
            this.supernode.increase();
        }
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

    get_html(){
        return this.get_svg_start_tag() + this.rects_html() + this.get_svg_end_tag();
    }

    rects_html(){
        this.supernodes.update_nodes_parameters();
        let html = '';
        let supernodes = this.supernodes.list;
        let value = this.supernodes.value;

        let id = 'crime_type_' + supernodes[0].code;
        let width = supernodes[0].value / value * 800;
        let height = 600

        let x = 20;
        let y = 20;
        html += '<rect id="'+id+'"  class="tree_map_1" x="'+x+'" y="'+y+'" width ="'+width+'" height="'+height+'" />'

        let text = crime_types[supernodes[0].code] +': ' + supernodes[0].value;

        html += '<text x="30" y="45" class="text_inbox" onclick="main_page()">'+text+'</text>';


        id = 'crime_type_' + supernodes[1].code;

        x = width + 25;

        width = (supernodes[1].value + supernodes[2].value) / value * 800;
        height = (supernodes[1].value / (supernodes[1].value + supernodes[2].value)) * 600;

        html += '<rect id="'+id+'"  class="tree_map_2" x="'+x+'" y="'+y+'" width ="'+width+'" height="'+height+'" />'

        text = crime_types[supernodes[1].code] +': ' + supernodes[1].value;

        let x_text = x + 10;

        html += '<text x="'+ x_text +'" y="45" class="text_inbox" onclick="main_page()">'+text+'</text>';

        id = 'crime_type_' + supernodes[2].code;

        y = height + 25;
        height = 600 - 5 - height;

        html += '<rect id="'+id+'"  class="tree_map_3" x="'+x+'" y="'+y+'" width ="'+width+'" height="'+height+'" />'

        text = crime_types[supernodes[2].code] +': ' + supernodes[2].value;

        let y_text = y + 20;

        html += '<text x="'+ x_text +'" y="'+y_text+'" class="text_inbox" onclick="main_page()">'+text+'</text>';

        id = 'crime_type_others';

        x += width + 5;
        y = 20;
        
        width = (supernodes[3].value + supernodes[4].value + supernodes[5].value + supernodes[6].value) / value * 800;
        height = 600;

        let others = supernodes[3].value + supernodes[4].value + supernodes[5].value + supernodes[6].value;

        html += '<rect id="'+id+'"  class="tree_map_4" x="'+x+'" y="'+y+'" width ="'+width+'" height="'+height+'" />';

        x_text = x + 10;

        html += '<text x="'+ x_text +'" y="45" class="text_inbox" onclick="main_page()">Other: '+ others+'</text>';


        html += '<text x="43.49" y="700" class="text" onclick="main_page()">Back</text>';
        return html;
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

        this.proportions = [];
        this.graph_values = [];

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



    update_proportions(){
        let big = this.graph_values[0][1];
        if(this.graph_values[3][1] > big){
            big = this.graph_values[3];
        }
        for(let i = 0; i < this.graph_values.length; i++){
            this.proportions.push(
                this.graph_values[i][1] / big
            )
        }
    }

    draw_html(){
        let html = this.get_svg_start_tag();


        console.log(this.values);
        console.log(this.labels);

        let i = 0;

        let value_1 = null;
        let label_1 = null;

        while(!value_1){
            if(this.labels[i] != 'undefined' && this.labels[i] != 'X' && this.labels[i] != 'U'){
                value_1 = this.values[i];
                label_1 = this.labels[i]
            }
            i++;
        }

        let max = value_1;

        let value_2 = null;
        let label_2 = null;


        while(!value_2){
           if(this.labels[i] != 'undefined' && this.labels[i] != 'X' && this.labels[i] != 'U'){
                value_2 = this.values[i];
                label_2 = this.labels[i];
           }
            i++;
        }

        if(value_2 >value_1){max = value_2}


        let value_3 = null;
        let label_3 = null;

        while(!value_3){
            if(this.labels[i] != 'undefined' && this.labels[i] != 'X' && this.labels[i] != 'U'){
                value_3 = this.values[i];
                label_3 = this.labels[i];
            }
            i++;
        }

        if(value_3 > max ){max = value_2}

        let others = 0;

        for(let j = 0; j < this.values.length; j++){
            if(
                this.labels[j] != 'undefined' &&
                this.labels[j] != label_1 &&
                this.labels[j] != label_2 &&
                this.labels[j] != label_3 
            ){
                others += this.values[j];
            }
        }

        console.log(label_1, value_1, label_2, value_2, label_3, value_3, others)

        if(others > max ){max = others}

        const svg_height = 319.567;

        const proportion = 100 / (max * svg_height);

        const height_floor = 250;

        let scale =  proportion * value_1;
        let height = svg_height * scale;

        let height_transform = height_floor  - height;


        let icon_svg = '<g viewBox="0 0 232 613" transform="translate(0 '+height_transform+')"><circle class="icon" transform="scale('+ scale +' '+ scale +')" cx="117" cy="44" r="44"/><path transform="scale('+ scale +' '+ scale +')" class="icon" d="M116.41,108.98h67.89c3.54.27,23.19,2.14,36.71,19.02,9.3,11.62,10.71,24.12,11,29v210.87c-1.53,11.09-10.54,19.48-21,20.13-11.72.73-22.66-8.41-24-21,.33-63,.67-126,1-189-.07-3.94-3.31-7.04-7-7-3.37.04-6.36,2.69-6.8,6.25v411.83c-.78,12.33-11.11,21.95-23.2,21.92-11.71-.03-21.77-9.11-23-21-.33-71.67-.67-143.33-1-215-2.36-4.46-7.04-7.19-12-7-4.62.18-8.82,2.86-11,7v215.41c-.3,12.51-10.64,22.59-23,22.59-12.15,0-22.39-9.72-23-22V171.48c-1.1-2.91-3.98-4.74-7-4.48-2.8.24-5.21,2.23-6,5v198.97c-2.87,9.95-11.88,16.87-22,17.03-10.74.17-20.39-7.3-23-18v-218.47c.47-3.84,2.67-17.99,15-29.53,12.12-11.35,26.08-12.74,30-13,23.8,0,47.6-.02,71.41-.02Z"/></g>';

        html += icon_svg;

        html += '<text x="0" y="100" class="icon_legend">' + value_1+ '</text>'
        html += '<text x="0" y="380" class="icon_legend">' + descendent_dic[label_1]+ '</text>'

        


        scale =  proportion * value_2;
        height = svg_height * scale;

        height_transform = height_floor  - height;

        let transform = 'transform="scale('+ scale +' '+ scale +')"'

        icon_svg = '<g viewBox="0 0 232 613" transform="translate(130 '+height_transform+')" ><circle '+ transform +' class="icon" cx="117" cy="44" r="44"/><path '+ transform +' class="icon" d="M116.41,108.98h67.89c3.54.27,23.19,2.14,36.71,19.02,9.3,11.62,10.71,24.12,11,29v210.87c-1.53,11.09-10.54,19.48-21,20.13-11.72.73-22.66-8.41-24-21,.33-63,.67-126,1-189-.07-3.94-3.31-7.04-7-7-3.37.04-6.36,2.69-6.8,6.25v411.83c-.78,12.33-11.11,21.95-23.2,21.92-11.71-.03-21.77-9.11-23-21-.33-71.67-.67-143.33-1-215-2.36-4.46-7.04-7.19-12-7-4.62.18-8.82,2.86-11,7v215.41c-.3,12.51-10.64,22.59-23,22.59-12.15,0-22.39-9.72-23-22V171.48c-1.1-2.91-3.98-4.74-7-4.48-2.8.24-5.21,2.23-6,5v198.97c-2.87,9.95-11.88,16.87-22,17.03-10.74.17-20.39-7.3-23-18v-218.47c.47-3.84,2.67-17.99,15-29.53,12.12-11.35,26.08-12.74,30-13,23.8,0,47.6-.02,71.41-.02Z"/></g>';

        html += icon_svg;

        html += '<text x="120" y="100" class="icon_legend">' + value_2+ '</text>'
        html += '<text x="120" y="380" class="icon_legend">' + descendent_dic[label_2]+ '</text>'



        scale =  proportion * value_3;
        height = svg_height * scale;

        height_transform = height_floor  - height;

        transform = 'transform="scale('+ scale +' '+ scale +')"'

        icon_svg = '<g viewBox="0 0 232 613" transform="translate(260 '+height_transform+')" ><circle '+ transform +' class="icon" cx="117" cy="44" r="44"/><path '+ transform +' class="icon" d="M116.41,108.98h67.89c3.54.27,23.19,2.14,36.71,19.02,9.3,11.62,10.71,24.12,11,29v210.87c-1.53,11.09-10.54,19.48-21,20.13-11.72.73-22.66-8.41-24-21,.33-63,.67-126,1-189-.07-3.94-3.31-7.04-7-7-3.37.04-6.36,2.69-6.8,6.25v411.83c-.78,12.33-11.11,21.95-23.2,21.92-11.71-.03-21.77-9.11-23-21-.33-71.67-.67-143.33-1-215-2.36-4.46-7.04-7.19-12-7-4.62.18-8.82,2.86-11,7v215.41c-.3,12.51-10.64,22.59-23,22.59-12.15,0-22.39-9.72-23-22V171.48c-1.1-2.91-3.98-4.74-7-4.48-2.8.24-5.21,2.23-6,5v198.97c-2.87,9.95-11.88,16.87-22,17.03-10.74.17-20.39-7.3-23-18v-218.47c.47-3.84,2.67-17.99,15-29.53,12.12-11.35,26.08-12.74,30-13,23.8,0,47.6-.02,71.41-.02Z"/></g>';

        html += icon_svg;

        html += '<text x="240" y="100" class="icon_legend">' + value_3+ '</text>'
        html += '<text x="240" y="380" class="icon_legend">' + descendent_dic[label_3]+ '</text>'



        scale =  proportion * others;
        height = svg_height * scale;

        height_transform = height_floor  - height;

        transform = 'transform="scale('+ scale +' '+ scale +')"'

        icon_svg = '<g viewBox="0 0 232 613" transform="translate(380 '+height_transform+')" ><circle '+ transform +' class="icon" cx="117" cy="44" r="44"/><path '+ transform +' class="icon" d="M116.41,108.98h67.89c3.54.27,23.19,2.14,36.71,19.02,9.3,11.62,10.71,24.12,11,29v210.87c-1.53,11.09-10.54,19.48-21,20.13-11.72.73-22.66-8.41-24-21,.33-63,.67-126,1-189-.07-3.94-3.31-7.04-7-7-3.37.04-6.36,2.69-6.8,6.25v411.83c-.78,12.33-11.11,21.95-23.2,21.92-11.71-.03-21.77-9.11-23-21-.33-71.67-.67-143.33-1-215-2.36-4.46-7.04-7.19-12-7-4.62.18-8.82,2.86-11,7v215.41c-.3,12.51-10.64,22.59-23,22.59-12.15,0-22.39-9.72-23-22V171.48c-1.1-2.91-3.98-4.74-7-4.48-2.8.24-5.21,2.23-6,5v198.97c-2.87,9.95-11.88,16.87-22,17.03-10.74.17-20.39-7.3-23-18v-218.47c.47-3.84,2.67-17.99,15-29.53,12.12-11.35,26.08-12.74,30-13,23.8,0,47.6-.02,71.41-.02Z"/></g>';

        html += icon_svg;

        html += '<text x="380" y="100" class="icon_legend">' +others+ '</text>'
        html += '<text x="380" y="380" class="icon_legend">Other</text>'


        html += '<rect x="0" y="500" width="90" height="45" class="icon" onclick="count_descendant_per_crime(99)" />';
        html += '<text x="10" y="525" class="text_inbox" onclick="count_descendant_per_crime(99)">Total</text>';


        html += '<rect x="100" y="500" width="110" height="45" class="icon" onclick="count_descendant_per_crime(0)" />';
        html += '<text x="110" y="525" class="text_inbox" onclick="count_descendant_per_crime(0)">Burglary</text>';

        html += '<rect x="220" y="500" width="80" height="45" class="icon" onclick="count_descendant_per_crime(1)" />';
        html += '<text x="230" y="525" class="text_inbox" onclick="count_descendant_per_crime(1)">Theft</text>';

        html += '<rect x="310" y="500" width="100" height="45" class="icon" onclick="count_descendant_per_crime(2)" />';
        html += '<text x="320" y="525" class="text_inbox" onclick="count_descendant_per_crime(2)">Assault</text>';

        html += '<rect x="0" y="550" width="140" height="45" class="icon" onclick="count_descendant_per_crime(4)" />';
        html += '<text x="10" y="575" class="text_inbox" onclick="count_descendant_per_crime(4)">Sex crimes</text>';


        html += '<text x="0" y="700" class="text"  onclick="main_page()">Back</text>';

        html += this.get_svg_end_tag();

        return html;

    }
}

class SVG{
    constructor(svg_code){
        this.svg_code = svg_code;

        this.viexbox_width = null;
        this.viewboox_height = null;

        this.obtain_viewbox_values();
    }

    get_svg(){
        return this.svg_code;
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

    add_svg_scale(scale_width, scale_height){

        const scale_text = 'transform="scale(' + scale_width + ' '+ scale_height + ')" ';

        const close_viebox = this.viewboox_height + '"';
        const close_viebox_index = this.svg_code.indexOf(close_viebox) + close_viebox.length + 1;

        this.svg_code = add_text_index(this.svg_code, scale_text, close_viebox_index)
    }
}

class Icon extends SVG{
    constructor(svg_code){
        super(svg_code);

        this.viexbox_width = null;
        this.viewboox_height = null;

        this.obtain_viewbox_values();

        this.screen_height = 300;
        this.scale = null;
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

    set_scale(){
        this.scale = this.screen_height / this.viewboox_height;
    }



    add_svg_translate(translate){
        const translate_text = ', translate(' + translate + ' 0)"'

        const close_scale = ')"';
        const close_translate_index = viewBoxSubstring.indexOf(close_viebox) + close_viebox.length + 1;

    }
}

class DotMap extends Graph{
    constructor(id, map, tags, codes, values){
        super(id);
        this.map = map;
        this.tags = tags;
        this.codes = codes;
        this.values = values;
    }

    set_values(values){
        this.values = values;
    }

    update_circles(){
        let list = [];

        for(let i = 0; i < this.values.length; i++){
            list.push(parseInt(this.values[i]))
        }
    
        list.sort();

        const max = list[list.length - 1];

        list = [];

        for(let i = 0; i < this.values.length; i++){
            let radius = this.values[i] * 40 / max;
            let id = 'graph_point_' + this.codes[i];

            document.getElementById(id).setAttribute('r', radius);
        }
    }

    get_html(viewboox_width = 800, viewboox_height=800){
        return this.get_svg_start_tag() + this.map.get_svg() + this.get_svg_end_tag();
    }
}

class Map extends SVG{
    constructor(svg_code){
        super(svg_code);
    }
}

function add_text_index(txt, addition, i){
    return txt.slice(0, i) + addition + txt.slice(i);
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
        return document.getElementById('board');
    }else{
        let board = document.createElement('div');
        board.id = 'board';

        document.getElementsByTagName('body')[0].appendChild(board);

        return board;
    }
}

function getObjectKeys(myObject) {
    const keysArray = [];

    for (const key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            keysArray.push(key);
        }
    }

    return keysArray;
}

function getObjectValues(myObject){
    const valuesArray = [];

    for (const key in myObject) {
        if (myObject.hasOwnProperty(key)) {
            valuesArray.push(myObject[key]);
        }
    }

    return valuesArray;
}