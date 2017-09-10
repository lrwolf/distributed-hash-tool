// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.get');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('quil.middleware');
cljs.core.enable_console_print_BANG_.call(null);
distributed_hash_tool.get.node_get = (function distributed_hash_tool$get$node_get(state,key){
var matching_node_index = distributed_hash_tool.get.matching_node_index.call(null,state,key);
var matching_node = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var node_contains_QMARK_ = distributed_hash_tool.get.node_contains_QMARK_.call(null,matching_node,key);
return state;
});

//# sourceMappingURL=get.js.map