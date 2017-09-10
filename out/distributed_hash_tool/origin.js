// Compiled by ClojureScript 1.9.473 {}
goog.provide('distributed_hash_tool.origin');
goog.require('cljs.core');
goog.require('quil.core');
goog.require('distributed_hash_tool.constant');
distributed_hash_tool.origin.point = (function distributed_hash_tool$origin$point(var_args){
var args8477 = [];
var len__7927__auto___8480 = arguments.length;
var i__7928__auto___8481 = (0);
while(true){
if((i__7928__auto___8481 < len__7927__auto___8480)){
args8477.push((arguments[i__7928__auto___8481]));

var G__8482 = (i__7928__auto___8481 + (1));
i__7928__auto___8481 = G__8482;
continue;
} else {
}
break;
}

var G__8479 = args8477.length;
switch (G__8479) {
case 0:
return distributed_hash_tool.origin.point.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return distributed_hash_tool.origin.point.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args8477.length)].join('')));

}
});

distributed_hash_tool.origin.point.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.memoize.call(null,distributed_hash_tool.origin.point.call(null,(180)));
});

distributed_hash_tool.origin.point.cljs$core$IFn$_invoke$arity$1 = (function (angle_in_degrees){
var angle = quil.core.radians.call(null,angle_in_degrees);
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"x","x",2099068185),(distributed_hash_tool.constant.radius * quil.core.cos.call(null,angle)),new cljs.core.Keyword(null,"y","y",-1757859776),(distributed_hash_tool.constant.radius * quil.core.sin.call(null,angle))], null);
});

distributed_hash_tool.origin.point.cljs$lang$maxFixedArity = 1;

distributed_hash_tool.origin.slope = (function distributed_hash_tool$origin$slope(var_args){
var args8484 = [];
var len__7927__auto___8487 = arguments.length;
var i__7928__auto___8488 = (0);
while(true){
if((i__7928__auto___8488 < len__7927__auto___8487)){
args8484.push((arguments[i__7928__auto___8488]));

var G__8489 = (i__7928__auto___8488 + (1));
i__7928__auto___8488 = G__8489;
continue;
} else {
}
break;
}

var G__8486 = args8484.length;
switch (G__8486) {
case 2:
return distributed_hash_tool.origin.slope.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return distributed_hash_tool.origin.slope.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args8484.length)].join('')));

}
});

distributed_hash_tool.origin.slope.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return distributed_hash_tool.origin.slope.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),x,y);
});

distributed_hash_tool.origin.slope.cljs$core$IFn$_invoke$arity$4 = (function (x1,y1,x2,y2){
var delta_y = (y2 - y1);
var delta_x = (x2 - x1);
return (delta_y / delta_x);
});

distributed_hash_tool.origin.slope.cljs$lang$maxFixedArity = 4;

distributed_hash_tool.origin.y_intercept = (function distributed_hash_tool$origin$y_intercept(slope){
return (new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)) - (slope * new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null))));
});
distributed_hash_tool.origin.distance = (function distributed_hash_tool$origin$distance(var_args){
var args8491 = [];
var len__7927__auto___8494 = arguments.length;
var i__7928__auto___8495 = (0);
while(true){
if((i__7928__auto___8495 < len__7927__auto___8494)){
args8491.push((arguments[i__7928__auto___8495]));

var G__8496 = (i__7928__auto___8495 + (1));
i__7928__auto___8495 = G__8496;
continue;
} else {
}
break;
}

var G__8493 = args8491.length;
switch (G__8493) {
case 2:
return distributed_hash_tool.origin.distance.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return distributed_hash_tool.origin.distance.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str.cljs$core$IFn$_invoke$arity$1("Invalid arity: "),cljs.core.str.cljs$core$IFn$_invoke$arity$1(args8491.length)].join('')));

}
});

distributed_hash_tool.origin.distance.cljs$core$IFn$_invoke$arity$2 = (function (x,y){
return distributed_hash_tool.origin.distance.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),x,y);
});

distributed_hash_tool.origin.distance.cljs$core$IFn$_invoke$arity$4 = (function (x1,y1,x2,y2){
var delta_y = (y2 - y1);
var delta_y_squrared = Math.pow(delta_y,(2));
var delta_x = (x2 - x1);
var delta_x_squared = Math.pow(delta_x,(2));
return Math.sqrt((delta_y_squrared + delta_x_squared));
});

distributed_hash_tool.origin.distance.cljs$lang$maxFixedArity = 4;

distributed_hash_tool.origin.draw = (function distributed_hash_tool$origin$draw(){
quil.core.fill.call(null,(200),(100),(100));

return quil.core.ellipse.call(null,new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(distributed_hash_tool.origin.point.call(null)),(25),(25));
});

//# sourceMappingURL=origin.js.map