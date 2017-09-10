// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.mouse');
goog.require('cljs.core');
goog.require('distributed_hash_tool.constant');
goog.require('distributed_hash_tool.operation');
distributed_hash_tool.mouse.is_between = (function distributed_hash_tool$mouse$is_between(value,left,right){
return ((value > left)) && ((value < right));
});
distributed_hash_tool.mouse.click = (function distributed_hash_tool$mouse$click(state,event){
var x = new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(event);
var y = new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(event);
var random_letter = cljs.core.get.call(null,distributed_hash_tool.constant.alphabet_range,cljs.core.rand_int.call(null,(6)));
var random_keyword = cljs.core.keyword.call(null,random_letter);
if(cljs.core.truth_((function (){var and__6802__auto__ = distributed_hash_tool.mouse.is_between.call(null,x,(105),(180));
if(cljs.core.truth_(and__6802__auto__)){
return distributed_hash_tool.mouse.is_between.call(null,y,(120),(160));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.operation.node_get.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"get","get",1683182755)),random_keyword);
} else {
if(cljs.core.truth_((function (){var and__6802__auto__ = distributed_hash_tool.mouse.is_between.call(null,x,(60),(135));
if(cljs.core.truth_(and__6802__auto__)){
return distributed_hash_tool.mouse.is_between.call(null,y,(230),(270));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.operation.node_put.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"put","put",1299772570)),random_keyword);
} else {
if(cljs.core.truth_((function (){var and__6802__auto__ = distributed_hash_tool.mouse.is_between.call(null,x,(105),(180));
if(cljs.core.truth_(and__6802__auto__)){
return distributed_hash_tool.mouse.is_between.call(null,y,(335),(375));
} else {
return and__6802__auto__;
}
})())){
return distributed_hash_tool.operation.node_delete.call(null,cljs.core.assoc.call(null,state,new cljs.core.Keyword(null,"mode","mode",654403691),new cljs.core.Keyword(null,"del","del",574975584)),random_keyword);
} else {
return state;

}
}
}
});

//# sourceMappingURL=mouse.js.map