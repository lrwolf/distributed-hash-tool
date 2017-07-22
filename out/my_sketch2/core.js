// Compiled by ClojureScript 1.9.473 {}
goog.provide('my_sketch2.core');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('quil.middleware');
cljs.core.enable_console_print_BANG_.call(null);
my_sketch2.core.alphabet_range = "abcdefghijklmnopqrstuvwxyz";
my_sketch2.core.colors = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(237),(106),(90)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(155),(193),(188)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(54),(201),(198)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(21),(113),(69)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(240),(235),(216)], null)], null);
my_sketch2.core.grays = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(128),(128),(128)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(169),(169),(169)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(211),(211),(211)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(245),(245),(245)], null)], null);
my_sketch2.core.keywordize = (function my_sketch2$core$keywordize(index){
return cljs.core.keyword.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(index)].join(''));
});
my_sketch2.core.initialize_node = (function my_sketch2$core$initialize_node(container,node_index){
return cljs.core.assoc.call(null,container,my_sketch2.core.keywordize.call(null,node_index),cljs.core.List.EMPTY);
});
my_sketch2.core.initialize_nodes = (function my_sketch2$core$initialize_nodes(container,number_of_nodes){
return cljs.core.reduce.call(null,my_sketch2.core.initialize_node,container,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
});
my_sketch2.core.radius = (150);
my_sketch2.core.origin = (function my_sketch2$core$origin(angle_in_degrees){
var angle = quil.core.radians.call(null,(180));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(my_sketch2.core.radius * quil.core.cos.call(null,angle)),new cljs.core.Keyword(null,"y","y",-1757859776),(my_sketch2.core.radius * quil.core.sin.call(null,angle))], null);
});
my_sketch2.core.default_origin = (function my_sketch2$core$default_origin(){
return cljs.core.memoize.call(null,my_sketch2.core.origin.call(null,(180)));
});
my_sketch2.core.draw_origin = (function my_sketch2$core$draw_origin(){
quil.core.fill.call(null,(200),(100),(100));

return quil.core.ellipse.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),(25),(25));
});
my_sketch2.core.setup = (function my_sketch2$core$setup(){
quil.core.frame_rate.call(null,(30));

var number_of_nodes = (3);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"color","color",1011675173),(0),new cljs.core.Keyword(null,"angle","angle",1622094254),(0),new cljs.core.Keyword(null,"word","word",-420123725),"",new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),(3),new cljs.core.Keyword(null,"data","data",-232669377),my_sketch2.core.initialize_nodes.call(null,cljs.core.PersistentArrayMap.EMPTY,number_of_nodes)], null);
});
my_sketch2.core.update_one_step = (function my_sketch2$core$update_one_step(step){
if((step < my_sketch2.core.radius)){
return (step + (1));
} else {
return step;
}
});
my_sketch2.core.update_step = (function my_sketch2$core$update_step(node_list){
return cljs.core.map.call(null,(function (p1__8475_SHARP_){
return cljs.core.update.call(null,p1__8475_SHARP_,new cljs.core.Keyword(null,"step","step",1288888124),my_sketch2.core.update_one_step);
}),node_list);
});
my_sketch2.core.update_state = (function my_sketch2$core$update_state(state){
var data_keys = cljs.core.keys.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var data_vals = cljs.core.vals.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var updated_vals = cljs.core.map.call(null,my_sketch2.core.update_step,data_vals);
var updated_data = cljs.core.zipmap.call(null,data_keys,updated_vals);
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"data","data",-232669377),updated_data);
});
my_sketch2.core.radian_positions = (function my_sketch2$core$radian_positions(number_of_nodes){
var spacer = ((180) / (number_of_nodes + (1)));
var degree_positions = cljs.core.map.call(null,((function (spacer){
return (function (p1__8476_SHARP_){
return (p1__8476_SHARP_ * spacer);
});})(spacer))
,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
var translated_degree_positions = cljs.core.map.call(null,((function (spacer,degree_positions){
return (function (p1__8477_SHARP_){
return cljs.core.mod.call(null,((270) + p1__8477_SHARP_),(360));
});})(spacer,degree_positions))
,degree_positions);
return cljs.core.map.call(null,quil.core.radians,translated_degree_positions);
});
my_sketch2.core.slope = (function my_sketch2$core$slope(x1,y1,x2,y2){
var delta_y = (y2 - y1);
var delta_x = (x2 - x1);
return (delta_y / delta_x);
});
my_sketch2.core.slope_from_origin = (function my_sketch2$core$slope_from_origin(x,y){
return my_sketch2.core.slope.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),x,y);
});
my_sketch2.core.y_intercept_from_origin = (function my_sketch2$core$y_intercept_from_origin(slope){
return (new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)) - (slope * new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null))));
});
my_sketch2.core.distance = (function my_sketch2$core$distance(x1,y1,x2,y2){
var delta_y = (y2 - y1);
var delta_y_squrared = Math.pow(delta_y,(2));
var delta_x = (x2 - x1);
var delta_x_squared = Math.pow(delta_x,(2));
return Math.sqrt((delta_y_squrared + delta_x_squared));
});
my_sketch2.core.distance_from_origin = (function my_sketch2$core$distance_from_origin(x,y){
return my_sketch2.core.distance.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),x,y);
});
my_sketch2.core.draw_data_point = (function my_sketch2$core$draw_data_point(node_x,node_y,data_point){
var slope = my_sketch2.core.slope_from_origin.call(null,node_x,node_y);
var y_intercept = my_sketch2.core.y_intercept_from_origin.call(null,slope);
var updated_x = (new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)) + new cljs.core.Keyword(null,"step","step",1288888124).cljs$core$IFn$_invoke$arity$1(data_point));
var updated_y = ((slope * updated_x) + y_intercept);
var radius = my_sketch2.core.distance_from_origin.call(null,node_x,node_y);
var updated_radius = my_sketch2.core.distance_from_origin.call(null,updated_x,updated_y);
cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,my_sketch2.core.colors,new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(data_point)));

if((updated_radius < radius)){
return quil.core.ellipse.call(null,updated_x,updated_y,(25),(25));
} else {
return null;
}
});
my_sketch2.core.draw_circle = (function my_sketch2$core$draw_circle(coordinates,data,index){
if(!(cljs.core.empty_QMARK_.call(null,coordinates))){
var vec__8482 = cljs.core.first.call(null,coordinates);
var x = cljs.core.nth.call(null,vec__8482,(0),null);
var y = cljs.core.nth.call(null,vec__8482,(1),null);
var node_x = (my_sketch2.core.radius * x);
var node_y = (my_sketch2.core.radius * y);
var node_list = my_sketch2.core.keywordize.call(null,index).call(null,data);
quil.core.line.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(my_sketch2.core.default_origin.call(null)),node_x,node_y);

cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,my_sketch2.core.grays,cljs.core.mod.call(null,index,cljs.core.count.call(null,my_sketch2.core.grays))));

quil.core.ellipse.call(null,node_x,node_y,(50),(50));

cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__8482,x,y,node_x,node_y,node_list){
return (function (p1__8478_SHARP_){
return my_sketch2.core.draw_data_point.call(null,node_x,node_y,p1__8478_SHARP_);
});})(vec__8482,x,y,node_x,node_y,node_list))
,node_list));

return my_sketch2.core.draw_circle.call(null,cljs.core.rest.call(null,coordinates),data,(index + (1)));
} else {
return null;
}
});
my_sketch2.core.draw_circles = (function my_sketch2$core$draw_circles(radian_positions,data){
var coordinates_8486 = cljs.core.map.call(null,(function (p1__8485_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[quil.core.cos.call(null,p1__8485_SHARP_),quil.core.sin.call(null,p1__8485_SHARP_)],null));
}),radian_positions);
my_sketch2.core.draw_circle.call(null,coordinates_8486,data,(1));

return my_sketch2.core.draw_origin.call(null);
});
my_sketch2.core.draw_state = (function my_sketch2$core$draw_state(p__8487){
var map__8490 = p__8487;
var map__8490__$1 = ((((!((map__8490 == null)))?((((map__8490.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8490.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8490):map__8490);
var number_of_nodes = cljs.core.get.call(null,map__8490__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var data = cljs.core.get.call(null,map__8490__$1,new cljs.core.Keyword(null,"data","data",-232669377));
quil.core.background.call(null,(240));

var radian_positions = my_sketch2.core.radian_positions.call(null,number_of_nodes);
var tr__8398__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(quil.core.width.call(null) / (2)),(quil.core.height.call(null) / (2))], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__8398__auto__);

return my_sketch2.core.draw_circles.call(null,radian_positions,data);
}finally {quil.core.pop_matrix.call(null);
}});
my_sketch2.core.simple_hash = (function my_sketch2$core$simple_hash(value){
return my_sketch2.core.alphabet_range.indexOf(value);
});
my_sketch2.core.key_press = (function my_sketch2$core$key_press(state,event){
var key = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(event);
var map__8494 = state;
var map__8494__$1 = ((((!((map__8494 == null)))?((((map__8494.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8494.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8494):map__8494);
var word = cljs.core.get.call(null,map__8494__$1,new cljs.core.Keyword(null,"word","word",-420123725));
var number_of_nodes = cljs.core.get.call(null,map__8494__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var data = cljs.core.get.call(null,map__8494__$1,new cljs.core.Keyword(null,"data","data",-232669377));
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"up","up",-269712113))) && ((number_of_nodes < (20)))){
var new_number_of_nodes = (number_of_nodes + (1));
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),new_number_of_nodes,new cljs.core.Keyword(null,"data","data",-232669377),my_sketch2.core.initialize_node.call(null,data,new_number_of_nodes));
} else {
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"down","down",1565245570))) && ((number_of_nodes > (1)))){
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),(number_of_nodes - (1)),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.dissoc.call(null,data,my_sketch2.core.keywordize.call(null,number_of_nodes)));
} else {
if(clojure.string.includes_QMARK_.call(null,my_sketch2.core.alphabet_range,cljs.core.name.call(null,key))){
var matching_node = my_sketch2.core.keywordize.call(null,(cljs.core.mod.call(null,my_sketch2.core.simple_hash.call(null,cljs.core.name.call(null,key)),number_of_nodes) + (1)));
var updated_node = cljs.core.conj.call(null,matching_node.call(null,data),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.name.call(null,key),new cljs.core.Keyword(null,"step","step",1288888124),0.0,new cljs.core.Keyword(null,"color","color",1011675173),cljs.core.mod.call(null,my_sketch2.core.simple_hash.call(null,cljs.core.name.call(null,key)),cljs.core.count.call(null,my_sketch2.core.colors))], null));
return cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),matching_node], null),updated_node);
} else {
return state;
}
}
}
});
my_sketch2.core.my_sketch2 = (function my_sketch2$core$my_sketch2(){
return quil.sketch.sketch.call(null,new cljs.core.Keyword(null,"host","host",-1558485167),"my-sketch2",new cljs.core.Keyword(null,"update","update",1045576396),((cljs.core.fn_QMARK_.call(null,my_sketch2.core.update_state))?(function() { 
var G__8496__delegate = function (args){
return cljs.core.apply.call(null,my_sketch2.core.update_state,args);
};
var G__8496 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8497__i = 0, G__8497__a = new Array(arguments.length -  0);
while (G__8497__i < G__8497__a.length) {G__8497__a[G__8497__i] = arguments[G__8497__i + 0]; ++G__8497__i;}
  args = new cljs.core.IndexedSeq(G__8497__a,0);
} 
return G__8496__delegate.call(this,args);};
G__8496.cljs$lang$maxFixedArity = 0;
G__8496.cljs$lang$applyTo = (function (arglist__8498){
var args = cljs.core.seq(arglist__8498);
return G__8496__delegate(args);
});
G__8496.cljs$core$IFn$_invoke$arity$variadic = G__8496__delegate;
return G__8496;
})()
:my_sketch2.core.update_state),new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(500),(500)], null),new cljs.core.Keyword(null,"setup","setup",1987730512),((cljs.core.fn_QMARK_.call(null,my_sketch2.core.setup))?(function() { 
var G__8499__delegate = function (args){
return cljs.core.apply.call(null,my_sketch2.core.setup,args);
};
var G__8499 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8500__i = 0, G__8500__a = new Array(arguments.length -  0);
while (G__8500__i < G__8500__a.length) {G__8500__a[G__8500__i] = arguments[G__8500__i + 0]; ++G__8500__i;}
  args = new cljs.core.IndexedSeq(G__8500__a,0);
} 
return G__8499__delegate.call(this,args);};
G__8499.cljs$lang$maxFixedArity = 0;
G__8499.cljs$lang$applyTo = (function (arglist__8501){
var args = cljs.core.seq(arglist__8501);
return G__8499__delegate(args);
});
G__8499.cljs$core$IFn$_invoke$arity$variadic = G__8499__delegate;
return G__8499;
})()
:my_sketch2.core.setup),new cljs.core.Keyword(null,"middleware","middleware",1462115504),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),new cljs.core.Keyword(null,"key-pressed","key-pressed",-757100364),((cljs.core.fn_QMARK_.call(null,my_sketch2.core.key_press))?(function() { 
var G__8502__delegate = function (args){
return cljs.core.apply.call(null,my_sketch2.core.key_press,args);
};
var G__8502 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8503__i = 0, G__8503__a = new Array(arguments.length -  0);
while (G__8503__i < G__8503__a.length) {G__8503__a[G__8503__i] = arguments[G__8503__i + 0]; ++G__8503__i;}
  args = new cljs.core.IndexedSeq(G__8503__a,0);
} 
return G__8502__delegate.call(this,args);};
G__8502.cljs$lang$maxFixedArity = 0;
G__8502.cljs$lang$applyTo = (function (arglist__8504){
var args = cljs.core.seq(arglist__8504);
return G__8502__delegate(args);
});
G__8502.cljs$core$IFn$_invoke$arity$variadic = G__8502__delegate;
return G__8502;
})()
:my_sketch2.core.key_press),new cljs.core.Keyword(null,"draw","draw",1358331674),((cljs.core.fn_QMARK_.call(null,my_sketch2.core.draw_state))?(function() { 
var G__8505__delegate = function (args){
return cljs.core.apply.call(null,my_sketch2.core.draw_state,args);
};
var G__8505 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8506__i = 0, G__8506__a = new Array(arguments.length -  0);
while (G__8506__i < G__8506__a.length) {G__8506__a[G__8506__i] = arguments[G__8506__i + 0]; ++G__8506__i;}
  args = new cljs.core.IndexedSeq(G__8506__a,0);
} 
return G__8505__delegate.call(this,args);};
G__8505.cljs$lang$maxFixedArity = 0;
G__8505.cljs$lang$applyTo = (function (arglist__8507){
var args = cljs.core.seq(arglist__8507);
return G__8505__delegate(args);
});
G__8505.cljs$core$IFn$_invoke$arity$variadic = G__8505__delegate;
return G__8505;
})()
:my_sketch2.core.draw_state));
});
goog.exportSymbol('my_sketch2.core.my_sketch2', my_sketch2.core.my_sketch2);

if(cljs.core.truth_(cljs.core.some.call(null,(function (p1__8011__8012__auto__){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"no-start","no-start",1381488856),p1__8011__8012__auto__);
}),null))){
} else {
quil.sketch.add_sketch_to_init_list.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fn","fn",-1175266204),my_sketch2.core.my_sketch2,new cljs.core.Keyword(null,"host-id","host-id",742376279),"my-sketch2"], null));
}

//# sourceMappingURL=core.js.map