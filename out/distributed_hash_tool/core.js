// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.core');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('quil.middleware');
cljs.core.enable_console_print_BANG_.call(null);
distributed_hash_tool.core.alphabet_range = "abcdefghijklmnopqrstuvwxyz";
distributed_hash_tool.core.colors = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(237),(106),(90)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(155),(193),(188)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(54),(201),(198)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(21),(113),(69)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(240),(235),(216)], null)], null);
distributed_hash_tool.core.grays = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(128),(128),(128)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(169),(169),(169)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(211),(211),(211)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(245),(245),(245)], null)], null);
distributed_hash_tool.core.keywordize = (function distributed_hash_tool$core$keywordize(index){
return cljs.core.keyword.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(index)].join(''));
});
distributed_hash_tool.core.initialize_node = (function distributed_hash_tool$core$initialize_node(container,node_index){
return cljs.core.assoc.call(null,container,distributed_hash_tool.core.keywordize.call(null,node_index),cljs.core.List.EMPTY);
});
distributed_hash_tool.core.initialize_nodes = (function distributed_hash_tool$core$initialize_nodes(container,number_of_nodes){
return cljs.core.reduce.call(null,distributed_hash_tool.core.initialize_node,container,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
});
distributed_hash_tool.core.radius = (150);
distributed_hash_tool.core.origin = (function distributed_hash_tool$core$origin(angle_in_degrees){
var angle = quil.core.radians.call(null,(180));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(distributed_hash_tool.core.radius * quil.core.cos.call(null,angle)),new cljs.core.Keyword(null,"y","y",-1757859776),(distributed_hash_tool.core.radius * quil.core.sin.call(null,angle))], null);
});
distributed_hash_tool.core.default_origin = (function distributed_hash_tool$core$default_origin(){
return cljs.core.memoize.call(null,distributed_hash_tool.core.origin.call(null,(180)));
});
distributed_hash_tool.core.draw_origin = (function distributed_hash_tool$core$draw_origin(){
quil.core.fill.call(null,(200),(100),(100));

return quil.core.ellipse.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),(25),(25));
});
distributed_hash_tool.core.setup = (function distributed_hash_tool$core$setup(){
quil.core.frame_rate.call(null,(30));

var number_of_nodes = (3);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"color","color",1011675173),(0),new cljs.core.Keyword(null,"angle","angle",1622094254),(0),new cljs.core.Keyword(null,"word","word",-420123725),"",new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),(3),new cljs.core.Keyword(null,"data","data",-232669377),distributed_hash_tool.core.initialize_nodes.call(null,cljs.core.PersistentArrayMap.EMPTY,number_of_nodes)], null);
});
distributed_hash_tool.core.update_one_step = (function distributed_hash_tool$core$update_one_step(step){
if((step < distributed_hash_tool.core.radius)){
return (step + (1));
} else {
return step;
}
});
distributed_hash_tool.core.update_step = (function distributed_hash_tool$core$update_step(node_list){
return cljs.core.map.call(null,(function (p1__9453_SHARP_){
return cljs.core.update.call(null,p1__9453_SHARP_,new cljs.core.Keyword(null,"step","step",1288888124),distributed_hash_tool.core.update_one_step);
}),node_list);
});
distributed_hash_tool.core.update_state = (function distributed_hash_tool$core$update_state(state){
var data_keys = cljs.core.keys.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var data_vals = cljs.core.vals.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var updated_vals = cljs.core.map.call(null,distributed_hash_tool.core.update_step,data_vals);
var updated_data = cljs.core.zipmap.call(null,data_keys,updated_vals);
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"data","data",-232669377),updated_data);
});
distributed_hash_tool.core.radian_positions = (function distributed_hash_tool$core$radian_positions(number_of_nodes){
var spacer = ((180) / (number_of_nodes + (1)));
var degree_positions = cljs.core.map.call(null,((function (spacer){
return (function (p1__9454_SHARP_){
return (p1__9454_SHARP_ * spacer);
});})(spacer))
,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
var translated_degree_positions = cljs.core.map.call(null,((function (spacer,degree_positions){
return (function (p1__9455_SHARP_){
return cljs.core.mod.call(null,((270) + p1__9455_SHARP_),(360));
});})(spacer,degree_positions))
,degree_positions);
return cljs.core.map.call(null,quil.core.radians,translated_degree_positions);
});
distributed_hash_tool.core.slope = (function distributed_hash_tool$core$slope(x1,y1,x2,y2){
var delta_y = (y2 - y1);
var delta_x = (x2 - x1);
return (delta_y / delta_x);
});
distributed_hash_tool.core.slope_from_origin = (function distributed_hash_tool$core$slope_from_origin(x,y){
return distributed_hash_tool.core.slope.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),x,y);
});
distributed_hash_tool.core.y_intercept_from_origin = (function distributed_hash_tool$core$y_intercept_from_origin(slope){
return (new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)) - (slope * new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null))));
});
distributed_hash_tool.core.distance = (function distributed_hash_tool$core$distance(x1,y1,x2,y2){
var delta_y = (y2 - y1);
var delta_y_squrared = Math.pow(delta_y,(2));
var delta_x = (x2 - x1);
var delta_x_squared = Math.pow(delta_x,(2));
return Math.sqrt((delta_y_squrared + delta_x_squared));
});
distributed_hash_tool.core.distance_from_origin = (function distributed_hash_tool$core$distance_from_origin(x,y){
return distributed_hash_tool.core.distance.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),x,y);
});
distributed_hash_tool.core.draw_data_point = (function distributed_hash_tool$core$draw_data_point(node_x,node_y,data_point){
var slope = distributed_hash_tool.core.slope_from_origin.call(null,node_x,node_y);
var y_intercept = distributed_hash_tool.core.y_intercept_from_origin.call(null,slope);
var updated_x = (new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)) + new cljs.core.Keyword(null,"step","step",1288888124).cljs$core$IFn$_invoke$arity$1(data_point));
var updated_y = ((slope * updated_x) + y_intercept);
var radius = distributed_hash_tool.core.distance_from_origin.call(null,node_x,node_y);
var updated_radius = distributed_hash_tool.core.distance_from_origin.call(null,updated_x,updated_y);
cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,distributed_hash_tool.core.colors,new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(data_point)));

if((updated_radius < radius)){
return quil.core.ellipse.call(null,updated_x,updated_y,(25),(25));
} else {
return null;
}
});
distributed_hash_tool.core.draw_circle = (function distributed_hash_tool$core$draw_circle(coordinates,data,index){
if(!(cljs.core.empty_QMARK_.call(null,coordinates))){
var vec__9460 = cljs.core.first.call(null,coordinates);
var x = cljs.core.nth.call(null,vec__9460,(0),null);
var y = cljs.core.nth.call(null,vec__9460,(1),null);
var node_x = (distributed_hash_tool.core.radius * x);
var node_y = (distributed_hash_tool.core.radius * y);
var node_list = distributed_hash_tool.core.keywordize.call(null,index).call(null,data);
quil.core.line.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),node_x,node_y);

cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,distributed_hash_tool.core.grays,cljs.core.mod.call(null,index,cljs.core.count.call(null,distributed_hash_tool.core.grays))));

quil.core.ellipse.call(null,node_x,node_y,(50),(50));

cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__9460,x,y,node_x,node_y,node_list){
return (function (p1__9456_SHARP_){
return distributed_hash_tool.core.draw_data_point.call(null,node_x,node_y,p1__9456_SHARP_);
});})(vec__9460,x,y,node_x,node_y,node_list))
,node_list));

return distributed_hash_tool.core.draw_circle.call(null,cljs.core.rest.call(null,coordinates),data,(index + (1)));
} else {
return null;
}
});
distributed_hash_tool.core.draw_circles = (function distributed_hash_tool$core$draw_circles(radian_positions,data){
var coordinates_9464 = cljs.core.map.call(null,(function (p1__9463_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[quil.core.cos.call(null,p1__9463_SHARP_),quil.core.sin.call(null,p1__9463_SHARP_)],null));
}),radian_positions);
distributed_hash_tool.core.draw_circle.call(null,coordinates_9464,data,(1));

return distributed_hash_tool.core.draw_origin.call(null);
});
distributed_hash_tool.core.draw_state = (function distributed_hash_tool$core$draw_state(p__9465){
var map__9468 = p__9465;
var map__9468__$1 = ((((!((map__9468 == null)))?((((map__9468.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__9468.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9468):map__9468);
var number_of_nodes = cljs.core.get.call(null,map__9468__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var data = cljs.core.get.call(null,map__9468__$1,new cljs.core.Keyword(null,"data","data",-232669377));
quil.core.background.call(null,(240));

var radian_positions = distributed_hash_tool.core.radian_positions.call(null,number_of_nodes);
var tr__9239__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(quil.core.width.call(null) / (2)),(quil.core.height.call(null) / (2))], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__9239__auto__);

return distributed_hash_tool.core.draw_circles.call(null,radian_positions,data);
}finally {quil.core.pop_matrix.call(null);
}});
distributed_hash_tool.core.simple_hash = (function distributed_hash_tool$core$simple_hash(value){
return distributed_hash_tool.core.alphabet_range.indexOf(value);
});
distributed_hash_tool.core.key_press = (function distributed_hash_tool$core$key_press(state,event){
var key = new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(event);
var map__9472 = state;
var map__9472__$1 = ((((!((map__9472 == null)))?((((map__9472.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__9472.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9472):map__9472);
var word = cljs.core.get.call(null,map__9472__$1,new cljs.core.Keyword(null,"word","word",-420123725));
var number_of_nodes = cljs.core.get.call(null,map__9472__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var data = cljs.core.get.call(null,map__9472__$1,new cljs.core.Keyword(null,"data","data",-232669377));
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"up","up",-269712113))) && ((number_of_nodes < (20)))){
var new_number_of_nodes = (number_of_nodes + (1));
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),new_number_of_nodes,new cljs.core.Keyword(null,"data","data",-232669377),distributed_hash_tool.core.initialize_node.call(null,data,new_number_of_nodes));
} else {
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"down","down",1565245570))) && ((number_of_nodes > (1)))){
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),(number_of_nodes - (1)),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.dissoc.call(null,data,distributed_hash_tool.core.keywordize.call(null,number_of_nodes)));
} else {
if(clojure.string.includes_QMARK_.call(null,distributed_hash_tool.core.alphabet_range,cljs.core.name.call(null,key))){
var matching_node = distributed_hash_tool.core.keywordize.call(null,(cljs.core.mod.call(null,distributed_hash_tool.core.simple_hash.call(null,cljs.core.name.call(null,key)),number_of_nodes) + (1)));
var updated_node = cljs.core.conj.call(null,matching_node.call(null,data),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.name.call(null,key),new cljs.core.Keyword(null,"step","step",1288888124),0.0,new cljs.core.Keyword(null,"color","color",1011675173),cljs.core.mod.call(null,distributed_hash_tool.core.simple_hash.call(null,cljs.core.name.call(null,key)),cljs.core.count.call(null,distributed_hash_tool.core.colors))], null));
return cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),matching_node], null),updated_node);
} else {
return state;
}
}
}
});
distributed_hash_tool.core.distributed_hash_tool = (function distributed_hash_tool$core$distributed_hash_tool(){
return quil.sketch.sketch.call(null,new cljs.core.Keyword(null,"host","host",-1558485167),"distributed-hash-tool",new cljs.core.Keyword(null,"update","update",1045576396),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.update_state))?(function() { 
var G__9474__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.update_state,args);
};
var G__9474 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9475__i = 0, G__9475__a = new Array(arguments.length -  0);
while (G__9475__i < G__9475__a.length) {G__9475__a[G__9475__i] = arguments[G__9475__i + 0]; ++G__9475__i;}
  args = new cljs.core.IndexedSeq(G__9475__a,0);
} 
return G__9474__delegate.call(this,args);};
G__9474.cljs$lang$maxFixedArity = 0;
G__9474.cljs$lang$applyTo = (function (arglist__9476){
var args = cljs.core.seq(arglist__9476);
return G__9474__delegate(args);
});
G__9474.cljs$core$IFn$_invoke$arity$variadic = G__9474__delegate;
return G__9474;
})()
:distributed_hash_tool.core.update_state),new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(500),(500)], null),new cljs.core.Keyword(null,"setup","setup",1987730512),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.setup))?(function() { 
var G__9477__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.setup,args);
};
var G__9477 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9478__i = 0, G__9478__a = new Array(arguments.length -  0);
while (G__9478__i < G__9478__a.length) {G__9478__a[G__9478__i] = arguments[G__9478__i + 0]; ++G__9478__i;}
  args = new cljs.core.IndexedSeq(G__9478__a,0);
} 
return G__9477__delegate.call(this,args);};
G__9477.cljs$lang$maxFixedArity = 0;
G__9477.cljs$lang$applyTo = (function (arglist__9479){
var args = cljs.core.seq(arglist__9479);
return G__9477__delegate(args);
});
G__9477.cljs$core$IFn$_invoke$arity$variadic = G__9477__delegate;
return G__9477;
})()
:distributed_hash_tool.core.setup),new cljs.core.Keyword(null,"middleware","middleware",1462115504),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),new cljs.core.Keyword(null,"key-pressed","key-pressed",-757100364),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.key_press))?(function() { 
var G__9480__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.key_press,args);
};
var G__9480 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9481__i = 0, G__9481__a = new Array(arguments.length -  0);
while (G__9481__i < G__9481__a.length) {G__9481__a[G__9481__i] = arguments[G__9481__i + 0]; ++G__9481__i;}
  args = new cljs.core.IndexedSeq(G__9481__a,0);
} 
return G__9480__delegate.call(this,args);};
G__9480.cljs$lang$maxFixedArity = 0;
G__9480.cljs$lang$applyTo = (function (arglist__9482){
var args = cljs.core.seq(arglist__9482);
return G__9480__delegate(args);
});
G__9480.cljs$core$IFn$_invoke$arity$variadic = G__9480__delegate;
return G__9480;
})()
:distributed_hash_tool.core.key_press),new cljs.core.Keyword(null,"draw","draw",1358331674),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.draw_state))?(function() { 
var G__9483__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.draw_state,args);
};
var G__9483 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9484__i = 0, G__9484__a = new Array(arguments.length -  0);
while (G__9484__i < G__9484__a.length) {G__9484__a[G__9484__i] = arguments[G__9484__i + 0]; ++G__9484__i;}
  args = new cljs.core.IndexedSeq(G__9484__a,0);
} 
return G__9483__delegate.call(this,args);};
G__9483.cljs$lang$maxFixedArity = 0;
G__9483.cljs$lang$applyTo = (function (arglist__9485){
var args = cljs.core.seq(arglist__9485);
return G__9483__delegate(args);
});
G__9483.cljs$core$IFn$_invoke$arity$variadic = G__9483__delegate;
return G__9483;
})()
:distributed_hash_tool.core.draw_state));
});
goog.exportSymbol('distributed_hash_tool.core.distributed_hash_tool', distributed_hash_tool.core.distributed_hash_tool);

if(cljs.core.truth_(cljs.core.some.call(null,(function (p1__8147__8148__auto__){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"no-start","no-start",1381488856),p1__8147__8148__auto__);
}),null))){
} else {
quil.sketch.add_sketch_to_init_list.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fn","fn",-1175266204),distributed_hash_tool.core.distributed_hash_tool,new cljs.core.Keyword(null,"host-id","host-id",742376279),"distributed-hash-tool"], null));
}

//# sourceMappingURL=core.js.map