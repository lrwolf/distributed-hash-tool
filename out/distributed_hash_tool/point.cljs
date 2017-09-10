(ns distributed-hash-tool.point
  (:require [quil.core :as q :include-macros true]
            [distributed-hash-tool.constant :refer [radius colors grays keywordize]]
            [distributed-hash-tool.origin :as origin]))

;;
;; These functions take care of drawing not only the nodes, but also the keys as they
;; travel from the client (origin) to the nodes.
;;

(defn draw [node-x node-y data-point]
  (let [slope (origin/slope node-x node-y)
        y-intercept (origin/y-intercept slope)
        updated-x (+ (:x (origin/point)) (:step data-point))
        updated-y (+ (* slope updated-x) y-intercept)
        radius (origin/distance node-x node-y)
        updated-radius (origin/distance updated-x updated-y)]
    (apply q/fill (get colors (:color data-point)))
    (if (< updated-radius radius)
      (do
        (q/ellipse updated-x updated-y 25 25)
        ; Add the key label to the data point
        (q/fill 0 0 0)
        (q/text-align :center :center)
        (q/text (:name data-point) updated-x updated-y)))))

(defn draw-all
  ([coordinates put-animation-map get-animation-map index]
   (if (not (empty? coordinates))
     (let [[x y] (first coordinates)
           node-x (* radius x)
           node-y (* radius y)
           put-animation-list ((keywordize index) put-animation-map)
           get-animation-list ((keywordize index) get-animation-map)]
       ; Draw line from client to node
       (q/line (:x (origin/point)) (:y (origin/point)) node-x node-y)
       ; Color and draw node
       (apply q/fill (get grays (mod index (count grays))))
       (q/ellipse node-x node-y 50 50)
       ; Add the index label to the node
       (q/fill 0 0 0)
       (q/text-align :center :center)
       (q/text (str index) node-x node-y)
       ; Draw all data points traveling to/from this node
       (doall (map #(draw node-x node-y %) put-animation-list))
       (doall (map #(draw node-x node-y %) get-animation-list))
       ; Draw the rest of the nodes/data points
       (draw-all (rest coordinates) put-animation-map get-animation-map (inc index)))))
  ([radian-positions put-animation-map get-animation-map]
   (let [coordinates (map #(vector (q/cos %) (q/sin %)) radian-positions)]
     (draw-all coordinates put-animation-map get-animation-map 1))))
