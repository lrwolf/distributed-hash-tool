// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.button');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('distributed_hash_tool.constant');
distributed_hash_tool.button.button_labels = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, ["DEL","PUT","GET"], null);
distributed_hash_tool.button.button_positions = (function distributed_hash_tool$button$button_positions(number_of_nodes){
var spacer = ((180) / (number_of_nodes + (1)));
var degree_positions = cljs.core.map.call(null,((function (spacer){
return (function (p1__8493_SHARP_){
return (p1__8493_SHARP_ * spacer);
});})(spacer))
,cljs.core.range.call(null,(1),(number_of_nodes + (1))));
var translated_degree_positions = cljs.core.map.call(null,((function (spacer,degree_positions){
return (function (p1__8494_SHARP_){
return cljs.core.mod.call(null,((90) + p1__8494_SHARP_),(360));
});})(spacer,degree_positions))
,degree_positions);
return cljs.core.map.call(null,quil.core.radians,translated_degree_positions);
});
distributed_hash_tool.button.draw = (function distributed_hash_tool$button$draw(coordinates,button_labels){
if(!(cljs.core.empty_QMARK_.call(null,coordinates))){
var vec__8498 = cljs.core.first.call(null,coordinates);
var x = cljs.core.nth.call(null,vec__8498,(0),null);
var y = cljs.core.nth.call(null,vec__8498,(1),null);
var node_x = (distributed_hash_tool.constant.radius * x);
var node_y = (distributed_hash_tool.constant.radius * y);
cljs.core.apply.call(null,quil.core.fill,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [(194),(194),(239)], null));

quil.core.ellipse.call(null,node_x,node_y,(75),(40));

quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

quil.core.text.call(null,cljs.core.first.call(null,button_labels),node_x,node_y);

return distributed_hash_tool.button.draw.call(null,cljs.core.rest.call(null,coordinates),cljs.core.rest.call(null,button_labels));
} else {
return null;
}
});
distributed_hash_tool.button.draw_all = (function distributed_hash_tool$button$draw_all(){
var coordinates = cljs.core.map.call(null,(function (p1__8501_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[quil.core.cos.call(null,p1__8501_SHARP_),quil.core.sin.call(null,p1__8501_SHARP_)],null));
}),distributed_hash_tool.button.button_positions.call(null,(3)));
return distributed_hash_tool.button.draw.call(null,coordinates,distributed_hash_tool.button.button_labels);
});

//# sourceMappingURL=button.js.map