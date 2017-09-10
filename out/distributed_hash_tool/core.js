// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.core');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('quil.middleware');
goog.require('distributed_hash_tool.constant');
goog.require('distributed_hash_tool.origin');
goog.require('distributed_hash_tool.mouse');
goog.require('distributed_hash_tool.keyboard');
goog.require('distributed_hash_tool.point');
goog.require('distributed_hash_tool.button');
cljs.core.enable_console_print_BANG_.call(null);
distributed_hash_tool.core.setup = (function distributed_hash_tool$core$setup(){
quil.core.frame_rate.call(null,(30));

var number_of_nodes = (3);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),(3),new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"put","put",1299772570),new cljs.core.Keyword(null,"data","data",-232669377),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217),cljs.core.PersistentArrayMap.EMPTY], null);
});
distributed_hash_tool.core.increase_one_step = (function distributed_hash_tool$core$increase_one_step(step){
if((step < distributed_hash_tool.constant.radius)){
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

return quil.core.text.call(null,"Distributed Hash Tool",(0),((-1) * (distributed_hash_tool.constant.radius + (30))));
});
distributed_hash_tool.core.draw_state = (function distributed_hash_tool$core$draw_state(p__8483){
var map__8486 = p__8483;
var map__8486__$1 = ((((!((map__8486 == null)))?((((map__8486.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__8486.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__8486):map__8486);
var number_of_nodes = cljs.core.get.call(null,map__8486__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var put_animation_map = cljs.core.get.call(null,map__8486__$1,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072));
var get_animation_map = cljs.core.get.call(null,map__8486__$1,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217));
var mode = cljs.core.get.call(null,map__8486__$1,new cljs.core.Keyword(null,"mode","mode",654403691));
var last_key = cljs.core.get.call(null,map__8486__$1,new cljs.core.Keyword(null,"last-key","last-key",1546037142),"");
var success_QMARK_ = cljs.core.get.call(null,map__8486__$1,new cljs.core.Keyword(null,"success?","success?",-122854052),"");
quil.core.background.call(null,(255));

var radian_positions = distributed_hash_tool.core.radian_positions.call(null,number_of_nodes);
distributed_hash_tool.core.draw_text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Mode: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.upper_case.call(null,cljs.core.name.call(null,mode)))].join(''),(380),(420));

distributed_hash_tool.core.draw_text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Key: \""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.name.call(null,last_key)),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join(''),(380),(440));

distributed_hash_tool.core.draw_text.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1("Success: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(success_QMARK_)].join(''),(380),(460));

var tr__8398__auto__ = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(quil.core.width.call(null) / (2)),(quil.core.height.call(null) / (2))], null);
quil.core.push_matrix.call(null);

try{quil.core.translate.call(null,tr__8398__auto__);

quil.core.text_size.call(null,(12));

distributed_hash_tool.point.draw_all.call(null,radian_positions,put_animation_map,get_animation_map);

distributed_hash_tool.origin.draw.call(null);

distributed_hash_tool.button.draw_all.call(null);

return distributed_hash_tool.core.draw_title.call(null);
}finally {quil.core.pop_matrix.call(null);
}});
distributed_hash_tool.core.distributed_hash_tool = (function distributed_hash_tool$core$distributed_hash_tool(){
return quil.sketch.sketch.call(null,new cljs.core.Keyword(null,"host","host",-1558485167),"distributed-hash-tool",new cljs.core.Keyword(null,"mouse-clicked","mouse-clicked",-199339421),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.mouse.click))?(function() { 
var G__8488__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.mouse.click,args);
};
var G__8488 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8489__i = 0, G__8489__a = new Array(arguments.length -  0);
while (G__8489__i < G__8489__a.length) {G__8489__a[G__8489__i] = arguments[G__8489__i + 0]; ++G__8489__i;}
  args = new cljs.core.IndexedSeq(G__8489__a,0);
} 
return G__8488__delegate.call(this,args);};
G__8488.cljs$lang$maxFixedArity = 0;
G__8488.cljs$lang$applyTo = (function (arglist__8490){
var args = cljs.core.seq(arglist__8490);
return G__8488__delegate(args);
});
G__8488.cljs$core$IFn$_invoke$arity$variadic = G__8488__delegate;
return G__8488;
})()
:distributed_hash_tool.mouse.click),new cljs.core.Keyword(null,"update","update",1045576396),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.update_state))?(function() { 
var G__8491__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.update_state,args);
};
var G__8491 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8492__i = 0, G__8492__a = new Array(arguments.length -  0);
while (G__8492__i < G__8492__a.length) {G__8492__a[G__8492__i] = arguments[G__8492__i + 0]; ++G__8492__i;}
  args = new cljs.core.IndexedSeq(G__8492__a,0);
} 
return G__8491__delegate.call(this,args);};
G__8491.cljs$lang$maxFixedArity = 0;
G__8491.cljs$lang$applyTo = (function (arglist__8493){
var args = cljs.core.seq(arglist__8493);
return G__8491__delegate(args);
});
G__8491.cljs$core$IFn$_invoke$arity$variadic = G__8491__delegate;
return G__8491;
})()
:distributed_hash_tool.core.update_state),new cljs.core.Keyword(null,"size","size",1098693007),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(500),(500)], null),new cljs.core.Keyword(null,"setup","setup",1987730512),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.setup))?(function() { 
var G__8494__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.setup,args);
};
var G__8494 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8495__i = 0, G__8495__a = new Array(arguments.length -  0);
while (G__8495__i < G__8495__a.length) {G__8495__a[G__8495__i] = arguments[G__8495__i + 0]; ++G__8495__i;}
  args = new cljs.core.IndexedSeq(G__8495__a,0);
} 
return G__8494__delegate.call(this,args);};
G__8494.cljs$lang$maxFixedArity = 0;
G__8494.cljs$lang$applyTo = (function (arglist__8496){
var args = cljs.core.seq(arglist__8496);
return G__8494__delegate(args);
});
G__8494.cljs$core$IFn$_invoke$arity$variadic = G__8494__delegate;
return G__8494;
})()
:distributed_hash_tool.core.setup),new cljs.core.Keyword(null,"middleware","middleware",1462115504),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [quil.middleware.fun_mode], null),new cljs.core.Keyword(null,"key-pressed","key-pressed",-757100364),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.keyboard.press))?(function() { 
var G__8497__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.keyboard.press,args);
};
var G__8497 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8498__i = 0, G__8498__a = new Array(arguments.length -  0);
while (G__8498__i < G__8498__a.length) {G__8498__a[G__8498__i] = arguments[G__8498__i + 0]; ++G__8498__i;}
  args = new cljs.core.IndexedSeq(G__8498__a,0);
} 
return G__8497__delegate.call(this,args);};
G__8497.cljs$lang$maxFixedArity = 0;
G__8497.cljs$lang$applyTo = (function (arglist__8499){
var args = cljs.core.seq(arglist__8499);
return G__8497__delegate(args);
});
G__8497.cljs$core$IFn$_invoke$arity$variadic = G__8497__delegate;
return G__8497;
})()
:distributed_hash_tool.keyboard.press),new cljs.core.Keyword(null,"draw","draw",1358331674),((cljs.core.fn_QMARK_.call(null,distributed_hash_tool.core.draw_state))?(function() { 
var G__8500__delegate = function (args){
return cljs.core.apply.call(null,distributed_hash_tool.core.draw_state,args);
};
var G__8500 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__8501__i = 0, G__8501__a = new Array(arguments.length -  0);
while (G__8501__i < G__8501__a.length) {G__8501__a[G__8501__i] = arguments[G__8501__i + 0]; ++G__8501__i;}
  args = new cljs.core.IndexedSeq(G__8501__a,0);
} 
return G__8500__delegate.call(this,args);};
G__8500.cljs$lang$maxFixedArity = 0;
G__8500.cljs$lang$applyTo = (function (arglist__8502){
var args = cljs.core.seq(arglist__8502);
return G__8500__delegate(args);
});
G__8500.cljs$core$IFn$_invoke$arity$variadic = G__8500__delegate;
return G__8500;
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