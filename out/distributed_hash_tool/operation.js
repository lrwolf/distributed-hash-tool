// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.operation');
goog.require('cljs.core');
goog.require('distributed_hash_tool.constant');
distributed_hash_tool.operation.simple_hash = (function distributed_hash_tool$operation$simple_hash(key){
var key_as_string = cljs.core.name.call(null,key);
return distributed_hash_tool.constant.alphabet_range.indexOf(key_as_string);
});
distributed_hash_tool.operation.matching_node_index = (function distributed_hash_tool$operation$matching_node_index(state,key){
var number_of_nodes = new cljs.core.Keyword(null,"number-of-nodes","number-of-nodes",-1529977873).cljs$core$IFn$_invoke$arity$1(state);
return distributed_hash_tool.constant.keywordize.call(null,(cljs.core.mod.call(null,distributed_hash_tool.operation.simple_hash.call(null,key),number_of_nodes) + (1)));
});
distributed_hash_tool.operation.key_animation_map = (function distributed_hash_tool$operation$key_animation_map(key,step){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.name.call(null,key),new cljs.core.Keyword(null,"step","step",1288888124),step,new cljs.core.Keyword(null,"color","color",1011675173),cljs.core.mod.call(null,distributed_hash_tool.operation.simple_hash.call(null,key),cljs.core.count.call(null,distributed_hash_tool.constant.colors))], null);
});
distributed_hash_tool.operation.node_put = (function distributed_hash_tool$operation$node_put(state,key){
var matching_node_index = distributed_hash_tool.operation.matching_node_index.call(null,state,key);
var possible_put_animation_list = matching_node_index.call(null,new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072).cljs$core$IFn$_invoke$arity$1(state));
var put_animation_list = (((possible_put_animation_list == null))?cljs.core.List.EMPTY:possible_put_animation_list);
var updated_put_animation_list = cljs.core.conj.call(null,put_animation_list,distributed_hash_tool.operation.key_animation_map.call(null,key,0.0));
var possible_data_set = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var data_set = (((possible_data_set == null))?cljs.core.PersistentHashSet.EMPTY:possible_data_set);
var updated_data_set = cljs.core.conj.call(null,data_set,key);
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"put-animation-map","put-animation-map",1814380072),matching_node_index], null),updated_put_animation_list),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),matching_node_index], null),updated_data_set),new cljs.core.Keyword(null,"last-key","last-key",1546037142),key),new cljs.core.Keyword(null,"success?","success?",-122854052),true);
});
distributed_hash_tool.operation.node_get = (function distributed_hash_tool$operation$node_get(state,key){
var matching_node_index = distributed_hash_tool.operation.matching_node_index.call(null,state,key);
var data_set = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var success_QMARK_ = cljs.core.contains_QMARK_.call(null,data_set,key);
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,((success_QMARK_)?(function (){var possible_get_animation_list = matching_node_index.call(null,new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217).cljs$core$IFn$_invoke$arity$1(state));
var get_animation_list = (((possible_get_animation_list == null))?cljs.core.List.EMPTY:possible_get_animation_list);
var updated_get_animation_list = cljs.core.conj.call(null,get_animation_list,distributed_hash_tool.operation.key_animation_map.call(null,key,100.0));
return cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"get-animation-map","get-animation-map",1364318217),matching_node_index], null),updated_get_animation_list);
})():state),new cljs.core.Keyword(null,"last-key","last-key",1546037142),key),new cljs.core.Keyword(null,"success?","success?",-122854052),success_QMARK_);
});
distributed_hash_tool.operation.node_delete = (function distributed_hash_tool$operation$node_delete(state,key){
var matching_node_index = distributed_hash_tool.operation.matching_node_index.call(null,state,key);
var possible_data_set = matching_node_index.call(null,new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(state));
var data_set = (((possible_data_set == null))?cljs.core.PersistentHashSet.EMPTY:possible_data_set);
var success_QMARK_ = cljs.core.contains_QMARK_.call(null,data_set,key);
var updated_data_set = cljs.core.disj.call(null,data_set,key);
return cljs.core.assoc.call(null,cljs.core.assoc.call(null,cljs.core.assoc_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),matching_node_index], null),updated_data_set),new cljs.core.Keyword(null,"last-key","last-key",1546037142),key),new cljs.core.Keyword(null,"success?","success?",-122854052),success_QMARK_);
});
distributed_hash_tool.operation.rebalance_data = (function distributed_hash_tool$operation$rebalance_data(all_data_set,new_number_of_nodes){
return cljs.core.reduce.call(null,(function (p1__7982_SHARP_,p2__7981_SHARP_){
var matching_node_index = distributed_hash_tool.constant.keywordize.call(null,(cljs.core.mod.call(null,distributed_hash_tool.operation.simple_hash.call(null,p2__7981_SHARP_),new_number_of_nodes) + (1)));
var possible_matching_data_set = matching_node_index.call(null,p1__7982_SHARP_);
var matching_data_set = (((possible_matching_data_set == null))?cljs.core.PersistentHashSet.EMPTY:possible_matching_data_set);
return cljs.core.assoc.call(null,p1__7982_SHARP_,matching_node_index,cljs.core.conj.call(null,matching_data_set,p2__7981_SHARP_));
}),cljs.core.PersistentArrayMap.EMPTY,all_data_set);
});
distributed_hash_tool.operation.node_rebalance = (function distributed_hash_tool$operation$node_rebalance(data,new_number_of_nodes){
var data_vals = cljs.core.vals.call(null,data);
var all_data_set = cljs.core.reduce.call(null,((function (data_vals){
return (function (p1__7983_SHARP_,p2__7984_SHARP_){
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.concat.call(null,p1__7983_SHARP_,p2__7984_SHARP_));
});})(data_vals))
,cljs.core.PersistentHashSet.EMPTY,data_vals);
var rebalance_all_data = distributed_hash_tool.operation.rebalance_data.call(null,all_data_set,new_number_of_nodes);
return rebalance_all_data;
});

//# sourceMappingURL=operation.js.map