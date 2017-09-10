// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.point');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('distributed_hash_tool.constant');
goog.require('distributed_hash_tool.origin');
distributed_hash_tool.point.draw = (function distributed_hash_tool$point$draw(node_x,node_y,data_point){
var slope = distributed_hash_tool.origin.slope.call(null,node_x,node_y);
var y_intercept = distributed_hash_tool.origin.y_intercept.call(null,slope);
var updated_x = (new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)) + new cljs.core.Keyword(null,"step","step",1288888124).cljs$core$IFn$_invoke$arity$1(data_point));
var updated_y = ((slope * updated_x) + y_intercept);
var radius = distributed_hash_tool.origin.distance.call(null,node_x,node_y);
var updated_radius = distributed_hash_tool.origin.distance.call(null,updated_x,updated_y);
cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,distributed_hash_tool.constant.colors,new cljs.core.Keyword(null,"color","color",1011675173).cljs$core$IFn$_invoke$arity$1(data_point)));

if((updated_radius < radius)){
quil.core.ellipse.call(null,updated_x,updated_y,(25),(25));

quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

return quil.core.text.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(data_point),updated_x,updated_y);
} else {
return null;
}
});
distributed_hash_tool.point.draw_all = (function distributed_hash_tool$point$draw_all(var_args){
var args8503 = [];
var len__7927__auto___8509 = arguments.length;
var i__7928__auto___8510 = (0);
while(true){
if((i__7928__auto___8510 < len__7927__auto___8509)){
args8503.push((arguments[i__7928__auto___8510]));

var G__8511 = (i__7928__auto___8510 + (1));
i__7928__auto___8510 = G__8511;
continue;
} else {
}
break;
}

var G__8505 = args8503.length;
switch (G__8505) {
case 4:
return distributed_hash_tool.point.draw_all.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 3:
return distributed_hash_tool.point.draw_all.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args8503.length)].join('')));

}
});

distributed_hash_tool.point.draw_all.cljs$core$IFn$_invoke$arity$4 = (function (coordinates,put_animation_map,get_animation_map,index){
if(!(cljs.core.empty_QMARK_.call(null,coordinates))){
var vec__8506 = cljs.core.first.call(null,coordinates);
var x = cljs.core.nth.call(null,vec__8506,(0),null);
var y = cljs.core.nth.call(null,vec__8506,(1),null);
var node_x = (distributed_hash_tool.constant.radius * x);
var node_y = (distributed_hash_tool.constant.radius * y);
var put_animation_list = distributed_hash_tool.constant.keywordize.call(null,index).call(null,put_animation_map);
var get_animation_list = distributed_hash_tool.constant.keywordize.call(null,index).call(null,get_animation_map);
quil.core.line.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),node_x,node_y);

cljs.core.apply.call(null,quil.core.fill,cljs.core.get.call(null,distributed_hash_tool.constant.grays,cljs.core.mod.call(null,index,cljs.core.count.call(null,distributed_hash_tool.constant.grays))));

quil.core.ellipse.call(null,node_x,node_y,(50),(50));

quil.core.fill.call(null,(0),(0),(0));

quil.core.text_align.call(null,new cljs.core.Keyword(null,"center","center",-748944368),new cljs.core.Keyword(null,"center","center",-748944368));

quil.core.text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(index)].join(''),node_x,node_y);

cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__8506,x,y,node_x,node_y,put_animation_list,get_animation_list){
return (function (p1__8500_SHARP_){
return distributed_hash_tool.point.draw.call(null,node_x,node_y,p1__8500_SHARP_);
});})(vec__8506,x,y,node_x,node_y,put_animation_list,get_animation_list))
,put_animation_list));

cljs.core.doall.call(null,cljs.core.map.call(null,((function (vec__8506,x,y,node_x,node_y,put_animation_list,get_animation_list){
return (function (p1__8501_SHARP_){
return distributed_hash_tool.point.draw.call(null,node_x,node_y,p1__8501_SHARP_);
});})(vec__8506,x,y,node_x,node_y,put_animation_list,get_animation_list))
,get_animation_list));

return distributed_hash_tool.point.draw_all.call(null,cljs.core.rest.call(null,coordinates),put_animation_map,get_animation_map,(index + (1)));
} else {
return null;
}
});

distributed_hash_tool.point.draw_all.cljs$core$IFn$_invoke$arity$3 = (function (radian_positions,put_animation_map,get_animation_map){
var coordinates = cljs.core.map.call(null,(function (p1__8502_SHARP_){
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[quil.core.cos.call(null,p1__8502_SHARP_),quil.core.sin.call(null,p1__8502_SHARP_)],null));
}),radian_positions);
return distributed_hash_tool.point.draw_all.call(null,coordinates,put_animation_map,get_animation_map,(1));
});

distributed_hash_tool.point.draw_all.cljs$lang$maxFixedArity = 4;


//# sourceMappingURL=point.js.map