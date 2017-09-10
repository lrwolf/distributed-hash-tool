(ns distributed-hash-tool.origin
  (:require [quil.core :as q :include-macros true]
            [distributed-hash-tool.constant :refer [radius]]))

(defn point
  ([] (memoize (point 180)))
  ([angle-in-degrees] (let [angle (q/radians angle-in-degrees)]
                        {:x     (* radius (q/cos angle))
                         :y     (* radius (q/sin angle))})))

(defn slope
  ([x y] (slope (:x (point)) (:y (point)) x y))
  ([x1 y1 x2 y2] (let [delta-y (- y2 y1)
                       delta-x (- x2 x1)]
                   (/ delta-y delta-x))))

(defn y-intercept [slope]
  (- (:y (point)) (* slope (:x (point)))))

(defn distance
  ([x y] (distance (:x (point)) (:y (point)) x y))
  ([x1 y1 x2 y2] (let [delta-y (- y2 y1)
                       delta-y-squrared (Math/pow delta-y 2)
                       delta-x (- x2 x1)
                       delta-x-squared (Math/pow delta-x 2)]
                   (Math/sqrt (+ delta-y-squrared delta-x-squared)))))

(defn draw []
  ; Set the circle color and draw the "client".
  (q/fill 200 100 100)
  (q/ellipse (:x (point)) (:y (point)) 25 25))
