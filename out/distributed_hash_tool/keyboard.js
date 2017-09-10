// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.keyboard');
goog.require('cljs.core');
goog.require('distributed_hash_tool.constant');
goog.require('distributed_hash_tool.operation');
distributed_hash_tool.keyboard.press = (function distributed_hash_tool$keyboard$press(state,event){
var map__7993 = event;
var map__7993__$1 = ((((!((map__7993 == null)))?((((map__7993.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__7993.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7993):map__7993);
var key = cljs.core.get.call(null,map__7993__$1,new cljs.core.Keyword(null,"key","key",-1516042587));
var key_code = cljs.core.get.call(null,map__7993__$1,new cljs.core.Keyword(null,"key-code","key-code",-1732114304));
var map__7994 = state;
var map__7994__$1 = ((((!((map__7994 == null)))?((((map__7994.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__7994.cljs$core$ISeq$)))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__7994):map__7994);
var number_of_nodes = cljs.core.get.call(null,map__7994__$1,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873));
var data = cljs.core.get.call(null,map__7994__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var valid_key = clojure.string.includes_QMARK_.call(null,distributed_hash_tool.constant.alphabet_range,cljs.core.name.call(null,key));
var inc_number_of_nodes = (number_of_nodes + (1));
var dec_number_of_nodes = (number_of_nodes - (1));
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"up","up",-269712113))) && ((number_of_nodes < (20)))){
return cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),inc_number_of_nodes),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),distributed_hash_tool.operation.node_rebalance.call(null,data,inc_number_of_nodes));
} else {
if((cljs.core._EQ_.call(null,key,new cljs.core.Keyword(null,"down","down",1565245570))) && ((number_of_nodes > (1)))){
return cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873),dec_number_of_nodes),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377)], null),distributed_hash_tool.operation.node_rebalance.call(null,data,dec_number_of_nodes));
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
if(cljs.core.truth_((function (){var and__6802__auto__ = valid_key;
if(cljs.core.truth_(and__6802__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"put","put",1299772570));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.operation.node_put.call(null,state,key);
} else {
if(cljs.core.truth_((function (){var and__6802__auto__ = valid_key;
if(cljs.core.truth_(and__6802__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"get","get",1683182755));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.operation.node_get.call(null,state,key);
} else {
if(cljs.core.truth_((function (){var and__6802__auto__ = valid_key;
if(cljs.core.truth_(and__6802__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"mode","mode",654403691).cljs$core$IFn$_invoke$arity$1(state),new cljs.core.Keyword(null,"del","del",574975584));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.operation.node_delete.call(null,state,key);
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

//# sourceMappingURL=keyboard.js.map