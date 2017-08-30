// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.core');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('quil.middleware');
cljs.core.enable_console_print_BANG_.call(null);
distributed_hash_tool.core.alphabet_range = "abcdefghijklmnopqrstuvwxyz";
distributed_hash_tool.core.colors = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(237),(106),(90)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(155),(193),(188)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(54),(201),(198)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(21),(113),(69)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(240),(235),(216)], null)], null);
distributed_hash_tool.core.grays = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(128),(128),(128)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(169),(169),(169)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(211),(211),(211)], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(245),(245),(245)], null)], null);
distributed_hash_tool.core.button_labels = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["DEL","PUT","GET"], null);
distributed_hash_tool.core.keywordize = (function distributed_hash_tool$core$keywordize(index){
return cljs.core.keyword.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(index)].join(''));
});
distributed_hash_tool.core.initialize_node = (function distributed_hash_tool$core$initialize_node(container,node_index){
return cljs.core.assoc.call(null,container,distributed_hash_tool.core.keywordize.call(null,node_index),cljs.core.PersistentHashSet.EMPTY);
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
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),(3),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217),cljs.core.PersistentArrayMap.EMPTY], null);
});
distributed_hash_tool.core.increase_one_step = (function distributed_hash_tool$core$increase_one_step(step){
if((step < distributed_hash_tool.core.radius)){
return (step + (1));
} else {
return step;
}
});
distributed_hash_tool.core.decrease_one_step = (function distributed_hash_tool$core$decrease_one_step(step){
if((step > (0))){
return (step - (1));
} else {
return step;
}
});
distributed_hash_tool.core.update_step = (function distributed_hash_tool$core$update_step(step_function,animation_list){
return cljs.core.map.call(null,(function (p1__8475_SHARP_){
return cljs.core.update.call(null,p1__8475_SHARP_,new cljs.core.Keyword(null,"step","step",1288888124),step_function);
}),animation_list);
});
distributed_hash_tool.core.update_animation_map = (function distributed_hash_tool$core$update_animation_map(animation_map,step_function){
var map_keys = cljs.core.keys.call(null,animation_map);
var map_vals = cljs.core.vals.call(null,animation_map);
var updated_vals = cljs.core.map.call(null,((function (map_keys,map_vals){
return (function (p1__8476_SHARP_){
return distributed_hash_tool.core.update_step.call(null,step_function,p1__8476_SHARP_);
});})(map_keys,map_vals))
,map_vals);
var updated_animation_map = cljs.core.zipmap.call(null,map_keys,updated_vals);
return updated_animation_map;
});
distributed_hash_tool.core.filter_step = (function distributed_hash_tool$core$filter_step(step_predicate,animation_list){
return cljs.core.filter.call(null,(function (p1__8477_SHARP_){
return step_predicate.call(null,new cljs.core.Keyword(null,"step","step",1288888124).cljs$core$IFn$_invoke$arity$1(p1__8477_SHARP_));
}),animation_list);
});
distributed_hash_tool.core.filter_animation_map = (function distributed_hash_tool$core$filter_animation_map(animation_map,step_predicate){
var map_keys = cljs.core.keys.call(null,animation_map);
var map_vals = cljs.core.vals.call(null,animation_map);
var filtered_vals = cljs.core.map.call(null,((function (map_keys,map_vals){
return (function (p1__8478_SHARP_){
return distributed_hash_tool.core.filter_step.call(null,step_predicate,p1__8478_SHARP_);
});})(map_keys,map_vals))
,map_vals);
var filtered_animation_map = cljs.core.zipmap.call(null,map_keys,filtered_vals);
return filtered_animation_map;
});
distributed_hash_tool.core.update_state = (function distributed_hash_tool$core$update_state(state){
var filtered_put_animation_map = distributed_hash_tool.core.filter_animation_map.call(null,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072).cljs$core$IFn$_invoke$arity$1(state),(function (p1__8479_SHARP_){
return (p1__8479_SHARP_ <= 125.0);
}));
var updated_put_animation_map = distributed_hash_tool.core.update_animation_map.call(null,filtered_put_animation_map,distributed_hash_tool.core.increase_one_step);
var filtered_get_animation_map = distributed_hash_tool.core.filter_animation_map.call(null,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217).cljs$core$IFn$_invoke$arity$1(state),((function (filtered_put_animation_map,updated_put_animation_map){
return (function (p1__8480_SHARP_){
return (p1__8480_SHARP_ > 0.0);
});})(filtered_put_animation_map,updated_put_animation_map))
);
var updated_get_animation_map = distributed_hash_tool.core.update_animation_map.call(null,filtered_get_animation_map,distributed_hash_tool.core.decrease_one_step);
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072),updated_put_animation_map,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217),updated_get_animation_map);
});
distributed_hash_tool.core.radian_positions = (function distributed_hash_tool$core$radian_positions(number_of_nodes){
var spacer = ((180) / (number_of_nodes + (1)));
var degree_positions = cljs.core.map.call(null,((function (spacer){
return (function (p1__8481_SHARP_){
return (p1__8481_SHARP_ * spacer);
});})(spacer))
,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
var translated_degree_positions = cljs.core.map.call(null,((function (spacer,degree_positions){
return (function (p1__8482_SHARP_){
return cljs.core.mod.call(null,((270) + p1__8482_SHARP_),(360));
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
quil.core.ellipse.call(null,updated_x,updated_y,(25),(25));

quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

return quil.core.text.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data_point),updated_x,updated_y);
} else {
return null;
}
});
distributed_hash_tool.core.draw_circle = (function distributed_hash_tool$core$draw_circle(coordinates,put_animation_map,get_animation_map,index){
if(!(cljs.core.empty_QMARK_.call(null,coordinates))){
var vec__8488 = cljs.core.first.call(null,coordinates);
var x = cljs.core.nth.call(null,vec__8488,(0),null);
var y = cljs.core.nth.call(null,vec__8488,(1),null);
var node_x = (distributed_hash_tool.core.radius * x);
var node_y = (distributed_hash_tool.core.radius * y);
var put_animation_list = distributed_hash_tool.core.keywordize.call(null,index).call(null,put_animation_map);
var get_animation_list = distributed_hash_tool.core.keywordize.call(null,index).call(null,get_animation_map);
quil.core.line.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.core.default_origin.call(null)),node_x,node_y);

cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,distributed_hash_tool.core.grays,cljs.core.mod.call(null,index,cljs.core.count.call(null,distributed_hash_tool.core.grays))));

quil.core.ellipse.call(null,node_x,node_y,(50),(50));

quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

quil.core.text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(index)].join(''),node_x,node_y);

cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__8488,x,y,node_x,node_y,put_animation_list,get_animation_list){
return (function (p1__8483_SHARP_){
return distributed_hash_tool.core.draw_data_point.call(null,node_x,node_y,p1__8483_SHARP_);
});})(vec__8488,x,y,node_x,node_y,put_animation_list,get_animation_list))
,put_animation_list));

cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__8488,x,y,node_x,node_y,put_animation_list,get_animation_list){
return (function (p1__8484_SHARP_){
return distributed_hash_tool.core.draw_data_point.call(null,node_x,node_y,p1__8484_SHARP_);
});})(vec__8488,x,y,node_x,node_y,put_animation_list,get_animation_list))
,get_animation_list));

return distributed_hash_tool.core.draw_circle.call(null,cljs.core.rest.call(null,coordinates),put_animation_map,get_animation_map,(index + (1)));
} else {
return null;
}
});
distributed_hash_tool.core.draw_circles = (function distributed_hash_tool$core$draw_circles(radian_positions,put_animation_map,get_animation_map){
var coordinates = cljs.core.map.call(null,(function (p1__8491_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[quil.core.cos.call(null,p1__8491_SHARP_),quil.core.sin.call(null,p1__8491_SHARP_)],null));
}),radian_positions);
return distributed_hash_tool.core.draw_circle.call(null,coordinates,put_animation_map,get_animation_map,(1));
});
distributed_hash_tool.core.draw_text = (function distributed_hash_tool$core$draw_text(value,x,y){
quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"left","left",-399115937),new cljs.core.Keyword(null,"center","center",-748944368));

quil.core.text_size.call(null,(16));

return quil.core.text.call(null,value,x,y);
});
distributed_hash_tool.core.draw_title = (function distributed_hash_tool$core$draw_title(){
quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

quil.core.text_size.call(null,(16));

return quil.core.text.call(null,"Distributed Hash Tool",(0),((-1) * (distributed_hash_tool.core.radius + (30))));
});
distributed_hash_tool.core.button_positions = (function distributed_hash_tool$core$button_positions(number_of_nodes){
var spacer = ((180) / (number_of_nodes + (1)));
var degree_positions = cljs.core.map.call(null,((function (spacer){
return (function (p1__8492_SHARP_){
return (p1__8492_SHARP_ * spacer);
});})(spacer))
,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
var translated_degree_positions = cljs.core.map.call(null,((function (spacer,degree_positions){
return (function (p1__8493_SHARP_){
return cljs.core.mod.call(null,((90) + p1__8493_SHARP_),(360));
});})(spacer,degree_positions))
,degree_positions);
return cljs.core.map.call(null,quil.core.radians,translated_degree_positions);
});
distributed_hash_tool.core.draw_button = (function distributed_hash_tool$core$draw_button(coordinates,button_labels){
if(!(cljs.core.empty_QMARK_.call(null,coordinates))){
var vec__8497 = cljs.core.first.call(null,coordinates);
var x = cljs.core.nth.call(null,vec__8497,(0),null);
var y = cljs.core.nth.call(null,vec__8497,(1),null);
var node_x = (distributed_hash_tool.core.radius * x);
var node_y = (distributed_hash_tool.core.radius * y);
cljs.core.apply.call(null,quil.core.fill,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(194),(194),(239)], null));

quil.core.ellipse.call(null,node_x,node_y,(75),(40));

quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

quil.core.text.call(null,cljs.core.first.call(null,button_labels),node_x,node_y);

return distributed_hash_tool.core.draw_button.call(null,cljs.core.rest.call(null,coordinates),cljs.core.rest.call(null,button_labels));
} else {
return null;
}
});
distributed_hash_tool.core.draw_buttons = (function distributed_hash_tool$core$draw_buttons(){
var coordinates = cljs.core.map.call(null,(function (p1__8500_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[quil.core.cos.call(null,p1__8500_SHARP_),quil.core.sin.call(null,p1__8500_SHARP_)],null));
}),distributed_hash_tool.core.button_positions.call(null,(3)));
return distributed_hash_tool.core.draw_button.call(null,coordinates,distributed_hash_tool.core.button_labels);
});
distributed_hash_tool.core.draw_state = (function distributed_hash_tool$core$draw_state(p__8501){
var map__8504 = p__8501;
var map__8504__$1 = ((((!((map__8504 == null)))?((((map__8504.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8504.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8504):map__8504);
var number_of_nodes = cljs.core.get.call(null,map__8504__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var put_animation_map = cljs.core.get.call(null,map__8504__$1,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072));
var get_animation_map = cljs.core.get.call(null,map__8504__$1,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217));
var mode = cljs.core.get.call(null,map__8504__$1,new cljs.core.Keyword(null,"mode","mode",654403691));
var last_key = cljs.core.get.call(null,map__8504__$1,new cljs.core.Keyword(null,"last-key","last-key",1546037142),"");
var success_QMARK_ = cljs.core.get.call(null,map__8504__$1,new cljs.core.Keyword(null,"success?","success?",-122854052),"");
quil.core.background.call(null,(255));

var radian_positions = distributed_hash_tool.core.radian_positions.call(null,number_of_nodes);
distributed_hash_tool.core.draw_text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Mode: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case.call(null,cljs.core.name.call(null,mode)))].join(''),(380),(420));

distributed_hash_tool.core.draw_text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Key: \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,last_key)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join(''),(380),(440));

distributed_hash_tool.core.draw_text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Success: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(success_QMARK_)].join(''),(380),(460));

var tr__8398__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(quil.core.width.call(null) / (2)),(quil.core.height.call(null) / (2))], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__8398__auto__);

quil.core.text_size.call(null,(12));

distributed_hash_tool.core.draw_circles.call(null,radian_positions,put_animation_map,get_animation_map);

distributed_hash_tool.core.draw_origin.call(null);

distributed_hash_tool.core.draw_buttons.call(null);

return distributed_hash_tool.core.draw_title.call(null);
}finally {quil.core.pop_matrix.call(null);
}});
distributed_hash_tool.core.simple_hash = (function distributed_hash_tool$core$simple_hash(key){
var key_as_string = cljs.core.name.call(null,key);
return distributed_hash_tool.core.alphabet_range.indexOf(key_as_string);
});
distributed_hash_tool.core.node_equals_QMARK_ = (function distributed_hash_tool$core$node_equals_QMARK_(node_entry,key){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"key","key",-1516042587).cljs$core$IFn$_invoke$arity$1(node_entry),key);
});
distributed_hash_tool.core.node_contains_QMARK_ = (function distributed_hash_tool$core$node_contains_QMARK_(node,key){
var node_equals_map = cljs.core.map.call(null,(function (p1__8506_SHARP_){
return distributed_hash_tool.core.node_equals_QMARK_.call(null,p1__8506_SHARP_,key);
}),node);
var node_contains_QMARK_ = cljs.core.reduce.call(null,((function (node_equals_map){
return (function (p1__8507_SHARP_,p2__8508_SHARP_){
var or__6814__auto__ = p1__8507_SHARP_;
if(cljs.core.truth_(or__6814__auto__)){
return or__6814__auto__;
} else {
return p2__8508_SHARP_;
}
});})(node_equals_map))
,false,node_equals_map);
cljs.core.println.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("node-contains?="),cljs.core.str.cljs$core$IFn$_invoke$arity$1(node_contains_QMARK_)].join(''));

return node_contains_QMARK_;
});
distributed_hash_tool.core.matching_node_index = (function distributed_hash_tool$core$matching_node_index(state,key){
var number_of_nodes = new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873).cljs$core$IFn$_invoke$arity$1(state);
return distributed_hash_tool.core.keywordize.call(null,(cljs.core.mod.call(null,distributed_hash_tool.core.simple_hash.call(null,key),number_of_nodes) + (1)));
});
distributed_hash_tool.core.key_animation_map = (function distributed_hash_tool$core$key_animation_map(key,step){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.name.call(null,key),new cljs.core.Keyword(null,"step","step",1288888124),step,new cljs.core.Keyword(null,"color","color",1011675173),cljs.core.mod.call(null,distributed_hash_tool.core.simple_hash.call(null,key),cljs.core.count.call(null,distributed_hash_tool.core.colors))], null);
});
distributed_hash_tool.core.node_put = (function distributed_hash_tool$core$node_put(state,key){
var matching_node_index = distributed_hash_tool.core.matching_node_index.call(null,state,key);
var possible_put_animation_list = matching_node_index.call(null,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072).cljs$core$IFn$_invoke$arity$1(state));
var put_animation_list = (((possible_put_animation_list == null))?cljs.core.List.EMPTY:possible_put_animation_list);
var updated_put_animation_list = cljs.core.conj.call(null,put_animation_list,distributed_hash_tool.core.key_animation_map.call(null,key,0.0));
var possible_data_set = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var data_set = (((possible_data_set == null))?cljs.core.PersistentHashSet.EMPTY:possible_data_set);
var updated_data_set = cljs.core.conj.call(null,data_set,key);
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072),matching_node_index], null),updated_put_animation_list),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),matching_node_index], null),updated_data_set),new cljs.core.Keyword(null,"last-key","last-key",1546037142),key),new cljs.core.Keyword(null,"success?","success?",-122854052),true);
});
distributed_hash_tool.core.node_get = (function distributed_hash_tool$core$node_get(state,key){
var matching_node_index = distributed_hash_tool.core.matching_node_index.call(null,state,key);
var data_set = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var success_QMARK_ = cljs.core.contains_QMARK_.call(null,data_set,key);
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,((success_QMARK_)?(function (){var possible_get_animation_list = matching_node_index.call(null,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217).cljs$core$IFn$_invoke$arity$1(state));
var get_animation_list = (((possible_get_animation_list == null))?cljs.core.List.EMPTY:possible_get_animation_list);
var updated_get_animation_list = cljs.core.conj.call(null,get_animation_list,distributed_hash_tool.core.key_animation_map.call(null,key,100.0));
return cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217),matching_node_index], null),updated_get_animation_list);
})():state),new cljs.core.Keyword(null,"last-key","last-key",1546037142),key),new cljs.core.Keyword(null,"success?","success?",-122854052),success_QMARK_);
});
distributed_hash_tool.core.node_del = (function distributed_hash_tool$core$node_del(state,key){
var matching_node_index = distributed_hash_tool.core.matching_node_index.call(null,state,key);
var possible_data_set = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var data_set = (((possible_data_set == null))?cljs.core.PersistentHashSet.EMPTY:possible_data_set);
var success_QMARK_ = cljs.core.contains_QMARK_.call(null,data_set,key);
var updated_data_set = cljs.core.disj.call(null,data_set,key);
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),matching_node_index], null),updated_data_set),new cljs.core.Keyword(null,"last-key","last-key",1546037142),key),new cljs.core.Keyword(null,"success?","success?",-122854052),success_QMARK_);
});
distributed_hash_tool.core.rebalance_data = (function distributed_hash_tool$core$rebalance_data(all_data_set,new_number_of_nodes){
return cljs.core.reduce.call(null,(function (p1__8510_SHARP_,p2__8509_SHARP_){
var matching_node_index = distributed_hash_tool.core.keywordize.call(null,(cljs.core.mod.call(null,distributed_hash_tool.core.simple_hash.call(null,p2__8509_SHARP_),new_number_of_nodes) + (1)));
var possible_matching_data_set = matching_node_index.call(null,p1__8510_SHARP_);
var matching_data_set = (((possible_matching_data_set == null))?cljs.core.PersistentHashSet.EMPTY:possible_matching_data_set);
return cljs.core.assoc.call(null,p1__8510_SHARP_,matching_node_index,cljs.core.conj.call(null,matching_data_set,p2__8509_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,all_data_set);
});
distributed_hash_tool.core.rebalance = (function distributed_hash_tool$core$rebalance(data,new_number_of_nodes){
var data_vals = cljs.core.vals.call(null,data);
var all_data_set = cljs.core.reduce.call(null,((function (data_vals){
return (function (p1__8511_SHARP_,p2__8512_SHARP_){
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.concat.call(null,p1__8511_SHARP_,p2__8512_SHARP_));
});})(data_vals))
,cljs.core.PersistentHashSet.EMPTY,data_vals);
var rebalance_all_data = distributed_hash_tool.core.rebalance_data.call(null,all_data_set,new_number_of_nodes);
return rebalance_all_data;
});
distributed_hash_tool.core.key_press = (function distributed_hash_tool$core$key_press(state,event){
var map__8517 = event;
var map__8517__$1 = ((((!((map__8517 == null)))?((((map__8517.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8517.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8517):map__8517);
var key = cljs.core.get.call(null,map__8517__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var key_code = cljs.core.get.call(null,map__8517__$1,new cljs.core.Keyword(null,"key-code","key-code",-1732114304));
var map__8518 = state;
var map__8518__$1 = ((((!((map__8518 == null)))?((((map__8518.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8518.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8518):map__8518);
var number_of_nodes = cljs.core.get.call(null,map__8518__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var data = cljs.core.get.call(null,map__8518__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var valid_key = clojure.string.includes_QMARK_.call(null,distributed_hash_tool.core.alphabet_range,cljs.core.name.call(null,key));
var inc_number_of_nodes = (number_of_nodes + (1));
var dec_number_of_nodes = (number_of_nodes - (1));
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"up","up",-269712113))) && ((number_of_nodes < (20)))){
return cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),inc_number_of_nodes),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),distributed_hash_tool.core.rebalance.call(null,data,inc_number_of_nodes));
} else {
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"down","down",1565245570))) && ((number_of_nodes > (1)))){
return cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),dec_number_of_nodes),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),distributed_hash_tool.core.rebalance.call(null,data,dec_number_of_nodes));
} else {
if(cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"right","right",-452581833))){
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"put","put",1299772570));
} else {
if(cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"left","left",-399115937))){
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"get","get",1683182755));
} else {
if(cljs.core._EQ_.call(null,key_code,(32))){
return cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"del","del",574975584));
} else {
if((valid_key) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"put","put",1299772570)))){
return distributed_hash_tool.core.node_put.call(null,state,key);
} else {
if((valid_key) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"get","get",1683182755)))){
return distributed_hash_tool.core.node_get.call(null,state,key);
} else {
if((valid_key) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"del","del",574975584)))){
return distributed_hash_tool.core.node_del.call(null,state,key);
} else {
return state;

}
}
}
}
}
}
}
}
});
distributed_hash_tool.core.is_between = (function distributed_hash_tool$core$is_between(value,left,right){
return ((value > left)) && ((value < right));
});
distributed_hash_tool.core.mouse_click = (function distributed_hash_tool$core$mouse_click(state,event){
var x = new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(event);
var y = new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(event);
var random_letter = cljs.core.get.call(null,distributed_hash_tool.core.alphabet_range,cljs.core.rand_int.call(null,(6)));
var random_keyword = cljs.core.keyword.call(null,random_letter);
if(cljs.core.truth_((function (){var and__6802__auto__ = distributed_hash_tool.core.is_between.call(null,x,(105),(180));
if(cljs.core.truth_(and__6802__auto__)){
return distributed_hash_tool.core.is_between.call(null,y,(120),(160));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.core.node_get.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"get","get",1683182755)),random_keyword);
} else {
if(cljs.core.truth_((function (){var and__6802__auto__ = distributed_hash_tool.core.is_between.call(null,x,(60),(135));
if(cljs.core.truth_(and__6802__auto__)){
return distributed_hash_tool.core.is_between.call(null,y,(230),(270));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.core.node_put.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"put","put",1299772570)),random_keyword);
} else {
if(cljs.core.truth_((function (){var and__6802__auto__ = distributed_hash_tool.core.is_between.call(null,x,(105),(180));
if(cljs.core.truth_(and__6802__auto__)){
return distributed_hash_tool.core.is_between.call(null,y,(335),(375));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.core.node_del.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"del","del",574975584)),random_keyword);
} else {
return state;

}
}
}
});
distributed_hash_tool.core.distributed_hash_tool = (function distributed_hash_tool$core$distributed_hash_tool(){
return quil.sketch.sketch.call(null,new cljs.core.Keyword(null,"host","host",-1558485167),"distributed-hash-tool",new cljs.core.Keyword(null,"mouse-clicked","mouse-clicked",-199339421),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.mouse_click))?(function() { 
var G__8521__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.mouse_click,args);
};
var G__8521 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8522__i = 0, G__8522__a = new Array(arguments.length -  0);
while (G__8522__i < G__8522__a.length) {G__8522__a[G__8522__i] = arguments[G__8522__i + 0]; ++G__8522__i;}
  args = new cljs.core.IndexedSeq(G__8522__a,0);
} 
return G__8521__delegate.call(this,args);};
G__8521.cljs$lang$maxFixedArity = 0;
G__8521.cljs$lang$applyTo = (function (arglist__8523){
var args = cljs.core.seq(arglist__8523);
return G__8521__delegate(args);
});
G__8521.cljs$core$IFn$_invoke$arity$variadic = G__8521__delegate;
return G__8521;
})()
:distributed_hash_tool.core.mouse_click),new cljs.core.Keyword(null,"update","update",1045576396),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.update_state))?(function() { 
var G__8524__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.update_state,args);
};
var G__8524 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8525__i = 0, G__8525__a = new Array(arguments.length -  0);
while (G__8525__i < G__8525__a.length) {G__8525__a[G__8525__i] = arguments[G__8525__i + 0]; ++G__8525__i;}
  args = new cljs.core.IndexedSeq(G__8525__a,0);
} 
return G__8524__delegate.call(this,args);};
G__8524.cljs$lang$maxFixedArity = 0;
G__8524.cljs$lang$applyTo = (function (arglist__8526){
var args = cljs.core.seq(arglist__8526);
return G__8524__delegate(args);
});
G__8524.cljs$core$IFn$_invoke$arity$variadic = G__8524__delegate;
return G__8524;
})()
:distributed_hash_tool.core.update_state),new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(500),(500)], null),new cljs.core.Keyword(null,"setup","setup",1987730512),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.setup))?(function() { 
var G__8527__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.setup,args);
};
var G__8527 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8528__i = 0, G__8528__a = new Array(arguments.length -  0);
while (G__8528__i < G__8528__a.length) {G__8528__a[G__8528__i] = arguments[G__8528__i + 0]; ++G__8528__i;}
  args = new cljs.core.IndexedSeq(G__8528__a,0);
} 
return G__8527__delegate.call(this,args);};
G__8527.cljs$lang$maxFixedArity = 0;
G__8527.cljs$lang$applyTo = (function (arglist__8529){
var args = cljs.core.seq(arglist__8529);
return G__8527__delegate(args);
});
G__8527.cljs$core$IFn$_invoke$arity$variadic = G__8527__delegate;
return G__8527;
})()
:distributed_hash_tool.core.setup),new cljs.core.Keyword(null,"middleware","middleware",1462115504),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),new cljs.core.Keyword(null,"key-pressed","key-pressed",-757100364),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.key_press))?(function() { 
var G__8530__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.key_press,args);
};
var G__8530 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8531__i = 0, G__8531__a = new Array(arguments.length -  0);
while (G__8531__i < G__8531__a.length) {G__8531__a[G__8531__i] = arguments[G__8531__i + 0]; ++G__8531__i;}
  args = new cljs.core.IndexedSeq(G__8531__a,0);
} 
return G__8530__delegate.call(this,args);};
G__8530.cljs$lang$maxFixedArity = 0;
G__8530.cljs$lang$applyTo = (function (arglist__8532){
var args = cljs.core.seq(arglist__8532);
return G__8530__delegate(args);
});
G__8530.cljs$core$IFn$_invoke$arity$variadic = G__8530__delegate;
return G__8530;
})()
:distributed_hash_tool.core.key_press),new cljs.core.Keyword(null,"draw","draw",1358331674),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.draw_state))?(function() { 
var G__8533__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.draw_state,args);
};
var G__8533 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8534__i = 0, G__8534__a = new Array(arguments.length -  0);
while (G__8534__i < G__8534__a.length) {G__8534__a[G__8534__i] = arguments[G__8534__i + 0]; ++G__8534__i;}
  args = new cljs.core.IndexedSeq(G__8534__a,0);
} 
return G__8533__delegate.call(this,args);};
G__8533.cljs$lang$maxFixedArity = 0;
G__8533.cljs$lang$applyTo = (function (arglist__8535){
var args = cljs.core.seq(arglist__8535);
return G__8533__delegate(args);
});
G__8533.cljs$core$IFn$_invoke$arity$variadic = G__8533__delegate;
return G__8533;
})()
:distributed_hash_tool.core.draw_state));
});
goog.exportSymbol('distributed_hash_tool.core.distributed_hash_tool', distributed_hash_tool.core.distributed_hash_tool);

if(cljs.core.truth_(cljs.core.some.call(null,(function (p1__8011__8012__auto__){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"no-start","no-start",1381488856),p1__8011__8012__auto__);
}),null))){
} else {
quil.sketch.add_sketch_to_init_list.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"fn","fn",-1175266204),distributed_hash_tool.core.distributed_hash_tool,new cljs.core.Keyword(null,"host-id","host-id",742376279),"distributed-hash-tool"], null));
}

//# sourceMappingURL=core.js.map